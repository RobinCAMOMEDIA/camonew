"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Arrow } from "@/components/site/Arrow";

// ---------------------------------------------------------------------------
// Global "Catch us" contact sheet.
// A single provider mounted in the public layout exposes open()/close() via
// context, so any trigger (nav, page closes, footer, …) can pop the same sheet.
// The sheet is a full-screen orange field that opens as a square growing out
// of the point that was clicked – the Catch-us seed flooding the screen. The
// form reads as one sentence ("Hi CAMO, ich bin …"). Submissions are stored in
// Convex (api.contact.submit) and optionally emailed; see convex/contact.ts.
// ---------------------------------------------------------------------------

type ContactOverlayCtx = { open: () => void; close: () => void; isOpen: boolean };

const Ctx = createContext<ContactOverlayCtx | null>(null);

export function useContactOverlay(): ContactOverlayCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Safe no-op fallback if used outside the provider (e.g. admin area).
    return { open: () => {}, close: () => {}, isOpen: false };
  }
  return ctx;
}


export function ContactOverlayProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  // Esc to close + lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  return (
    <Ctx.Provider value={{ open, close, isOpen }}>
      {children}
      <ContactSheet isOpen={isOpen} onClose={close} />
    </Ctx.Provider>
  );
}

function ContactSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = useMutation(api.contact.submit);
  const sheetRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Focus the first field once the sheet has grown in; keep Tab inside.
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 420);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !sheetRef.current) return;
      const f = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input, textarea",
        ),
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // Reset the confirmation after the sheet has closed.
  useEffect(() => {
    if (!isOpen && sentTo) {
      const t = setTimeout(() => {
        setSentTo(null);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [isOpen, sentTo]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "");
    const note = String(data.get("message") ?? "").trim();
    const message = [company && `Marke / Firma: ${company}`, note].filter(Boolean).join("\n\n");
    setSending(true);
    setError(null);
    try {
      await submit({
        name,
        email,
        message,
        source: "overlay",
      });
      setSentTo(name.trim().split(/\s+/)[0] || "dir");
      e.currentTarget?.reset?.();
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message.replace(/^.*Uncaught Error:\s*/s, "").split("\n")[0]
          : "Da ist etwas schiefgelaufen. Versuch es nochmal oder schreib an hello@camo.media.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      ref={sheetRef}
      className={`cto${isOpen ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cto-title"
      aria-hidden={!isOpen}
      inert={!isOpen}
      data-ground="orange"
    >
      <button type="button" className="cto__close" onClick={onClose} aria-label="Schließen">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div className="cto__inner">
        <div className="cto__aside">
          <h2 className="cto__title x-wide" id="cto-title">
            {sentTo ? (
              <>
                Gecatcht<span className="x-dot" aria-hidden="true" />
              </>
            ) : (
              <>
                Catch <span className="x-nowrap">us<span className="x-dot" aria-hidden="true" /></span>
              </>
            )}
          </h2>
          <p className="cto__lead">
            {sentTo
              ? `Danke, ${sentTo}. Deine Nachricht ist bei uns, wir melden uns innerhalb von 24 Stunden.`
              : "Erzähl uns kurz, was ansteht: Kampagne, Feed oder erster Drehtag. Wir melden uns."}
          </p>
          <div className="cto__direct" aria-label="Direkter Kontakt">
            <a href="mailto:hello@camo.media" className="cto__link">
              hello@camo.media
              <Arrow diagonal size={14} />
            </a>
            <a href="tel:+494022854474" className="cto__link">
              040 22854474
              <Arrow diagonal size={14} />
            </a>
            <span className="cto__place">Hamburg</span>
          </div>
        </div>

        {sentTo ? (
          <div className="cto__done" role="status">
            <button type="button" className="x-pill" onClick={onClose}>
              <span className="x-pill__fill" aria-hidden="true" />
              <span className="x-pill__label">Schließen</span>
            </button>
          </div>
        ) : (
          <form className="cto__form" onSubmit={handleSubmit}>
            <div className="cto__pair">
              <label className="cto__field">
                <span className="cto__label">Name</span>
                <input
                  ref={firstFieldRef}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Dein Name"
                  required
                />
              </label>
              <label className="cto__field">
                <span className="cto__label">E-Mail</span>
                <input name="email" type="email" autoComplete="email" placeholder="name@mail.de" required />
              </label>
            </div>
            <label className="cto__field">
              <span className="cto__label">Marke / Firma (optional)</span>
              <input name="company" type="text" autoComplete="organization" placeholder="Brand, Laden, Start-up" />
            </label>
            <label className="cto__field">
              <span className="cto__label">Nachricht</span>
              <textarea name="message" rows={4} placeholder="Was steht an? Zeitraum, Idee, Budget: alles hilft." />
            </label>

            {error && (
              <p className="cto__error" role="alert">
                {error}
              </p>
            )}

            <div className="cto__row">
              <button type="submit" className="x-pill" disabled={sending}>
                <span className="x-pill__fill" aria-hidden="true" />
                <span className="x-pill__label">{sending ? "Wird gesendet" : "Abschicken"}</span>
              </button>
              <p className="cto__privacy">
                Wir nutzen deine Angaben nur für deine Anfrage.{" "}
                <a href="/datenschutz" target="_blank" rel="noreferrer">
                  Datenschutz
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
