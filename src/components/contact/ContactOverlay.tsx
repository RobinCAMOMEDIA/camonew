"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

// ---------------------------------------------------------------------------
// Global "Catch Us" contact overlay.
// A single provider mounted in the public layout exposes open()/close() via
// context, so any trigger (nav CTA, footer, …) on any page can pop the same
// animated overlay. Submissions are stored in Convex (api.contact.submit) and
// optionally emailed via Resend; see convex/contact.ts.
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
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

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
      <ContactOverlay isOpen={isOpen} onClose={close} />
    </Ctx.Provider>
  );
}

function ContactOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = useMutation(api.contact.submit);

  // Reset the "sent" confirmation shortly after the overlay is closed.
  useEffect(() => {
    if (!isOpen && sent) {
      const t = setTimeout(() => setSent(false), 400);
      return () => clearTimeout(t);
    }
  }, [isOpen, sent]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");
    setSending(true);
    setError(null);
    try {
      await submit({ name, email, subject, message, source: "overlay" });
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Da ist etwas schiefgelaufen. Bitte später erneut versuchen.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className={`contact-overlay${isOpen ? " is-open" : ""}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Kontakt"
    >
      <div className="contact-overlay__backdrop" onClick={onClose} />

      <div className="contact-overlay__panel">
        <button
          className="contact-overlay__close"
          onClick={onClose}
          aria-label="Schließen"
        >
          <span />
          <span />
        </button>

        <div className="contact-overlay__grid">
          {/* Left — pitch + direct channels */}
          <div className="contact-overlay__aside">
            <span className="contact-overlay__kicker">Let&apos;s Connect</span>
            <h2 className="contact-overlay__headline">
              Catch<br />Us<span className="contact-overlay__dot" />
            </h2>
            <p className="contact-overlay__lead">
              Erzähl uns von deiner Marke, deinem Projekt oder einfach deiner
              wildesten Idee. Wir antworten schneller, als du „Franzbrötchen“
              sagen kannst.
            </p>
            <div className="contact-overlay__channels">
              <a
                href="mailto:hello@camo.media"
                className="contact-overlay__channel"
              >
                <span className="contact-overlay__channel-label">Mail</span>
                hello@camo.media
              </a>
              <a href="tel:+4940123456" className="contact-overlay__channel">
                <span className="contact-overlay__channel-label">Phone</span>
                +49 40 123 456
              </a>
              <span className="contact-overlay__channel">
                <span className="contact-overlay__channel-label">Studio</span>
                Hamburg, Deutschland
              </span>
            </div>
          </div>

          {/* Right — quick form */}
          {sent ? (
            <div className="contact-overlay__success">
              <div className="contact-overlay__success-mark">✓</div>
              <h3>Nachricht erhalten.</h3>
              <p>
                Danke für deine Anfrage! Wir melden uns innerhalb von 24 Stunden
                bei dir.
              </p>
              <button className="btn btn--ghost" onClick={onClose}>
                Schließen
              </button>
            </div>
          ) : (
            <form className="contact-overlay__form" onSubmit={handleSubmit}>
              <div className="contact-overlay__field" style={{ "--i": 1 } as React.CSSProperties}>
                <label htmlFor="co-name">Name</label>
                <input id="co-name" name="name" type="text" placeholder="Wie heißt du?" required />
              </div>
              <div className="contact-overlay__field" style={{ "--i": 2 } as React.CSSProperties}>
                <label htmlFor="co-email">E-Mail</label>
                <input id="co-email" name="email" type="email" placeholder="dein@brand.de" required />
              </div>
              <div className="contact-overlay__field" style={{ "--i": 3 } as React.CSSProperties}>
                <label htmlFor="co-subject">Betreff</label>
                <input id="co-subject" name="subject" type="text" placeholder="Worum geht's grob?" required />
              </div>
              <div className="contact-overlay__field" style={{ "--i": 4 } as React.CSSProperties}>
                <label htmlFor="co-message">Nachricht</label>
                <textarea id="co-message" name="message" rows={4} placeholder="Erzähl uns mehr …" required />
              </div>
              {error && (
                <p className="contact-overlay__error" role="alert">
                  {error}
                </p>
              )}
              <p
                className="contact-overlay__privacy"
                style={{ "--i": 5 } as React.CSSProperties}
              >
                Mit dem Absenden stimmst du zu, dass wir deine Angaben zur
                Bearbeitung deiner Anfrage verarbeiten. Wir speichern sie nur
                dafür und löschen sie, sobald sie nicht mehr benötigt werden.
                Mehr in der{" "}
                <a href="/datenschutz" target="_blank" rel="noreferrer">
                  Datenschutzerklärung
                </a>
                .
              </p>
              <button
                type="submit"
                className="btn btn--primary contact-overlay__submit"
                style={{ "--i": 6 } as React.CSSProperties}
                disabled={sending}
              >
                {sending ? "Senden…" : "Abschicken"}
                {!sending && <span className="btn__arrow">→</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
