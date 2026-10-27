"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { inviteAdmin } from "@/app/admin/actions";

type Service = {
  name: string;
  role: string;
  desc: string;
  href: string;
};

// The external tools that power the site. Links point at each provider's
// dashboard so an admin can jump straight to billing / settings.
const SERVICES: Service[] = [
  {
    name: "Convex",
    role: "Backend & Datenbank",
    desc: "Speichert Cases, Hero-Inhalte, Kategorien und die hochgeladenen Medien.",
    href: "https://dashboard.convex.dev",
  },
  {
    name: "Clerk",
    role: "Login & Nutzer",
    desc: "Authentifizierung für das Admin-Panel und die Admin-Einladungen.",
    href: "https://dashboard.clerk.com",
  },
  {
    name: "Google Analytics",
    role: "Statistiken",
    desc: "Reichweite und Besucherzahlen (sobald die Mess-ID hinterlegt ist).",
    href: "https://analytics.google.com",
  },
  {
    name: "Resend",
    role: "E-Mail-Versand",
    desc: "Verschickt die Benachrichtigungen, wenn eine neue Kontaktanfrage über die Website reinkommt.",
    href: "https://resend.com/overview",
  },
];

type AdminEntry = { email: string; bootstrap: boolean; addedAt: number | null };

export function AdminServicesButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(
    null,
  );

  const admins = useQuery(api.admins.listAdmins) as AdminEntry[] | undefined;
  const addAdmin = useMutation(api.admins.addAdmin);
  const removeAdmin = useMutation(api.admins.removeAdmin);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setPending(true);
    try {
      // 1) Grant access immediately by storing the email in the admins table.
      await addAdmin({ email });
      // 2) Send the Clerk invitation email so they can create their login.
      const res = await inviteAdmin(email);
      if (res.ok) {
        setResult({
          ok: true,
          message: `${email.trim()} ist jetzt Admin. Einladung verschickt.`,
        });
        setEmail("");
      } else {
        // Access was granted, but the email invite failed (e.g. SMTP/Clerk).
        setResult({
          ok: true,
          message: `${email.trim()} ist jetzt Admin. Einladungs-Mail konnte nicht gesendet werden (${res.message}). Die Person kann sich aber regulär registrieren.`,
        });
        setEmail("");
      }
    } catch (err) {
      setResult({
        ok: false,
        message: err instanceof Error ? err.message : "Hinzufügen fehlgeschlagen.",
      });
    } finally {
      setPending(false);
    }
  }

  async function handleRemove(target: string) {
    setResult(null);
    try {
      await removeAdmin({ email: target });
    } catch (err) {
      setResult({
        ok: false,
        message: err instanceof Error ? err.message : "Entfernen fehlgeschlagen.",
      });
    }
  }

  const modal = (
    <div
          className="admin-modal__overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Dienste und Team"
          onClick={() => setOpen(false)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__head">
              <h2 className="admin-modal__title">Dienste &amp; Team</h2>
              <button
                type="button"
                className="admin-modal__close"
                aria-label="Schließen"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="admin-modal__body">
              <h3 className="admin-modal__subtitle">Genutzte Dienste</h3>
              <div className="admin-services">
                {SERVICES.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="admin-service-card"
                  >
                    <div className="admin-service-card__top">
                      <span className="admin-service-card__name">{s.name}</span>
                      <span className="admin-service-card__role">{s.role}</span>
                    </div>
                    <p className="admin-service-card__desc">{s.desc}</p>
                    <span className="admin-service-card__link">
                      Dashboard öffnen ↗
                    </span>
                  </a>
                ))}
              </div>

              <h3 className="admin-modal__subtitle">Admin einladen</h3>
              <p className="admin-hint" style={{ marginBottom: "0.75rem" }}>
                Die E-Mail wird sofort freigeschaltet und bekommt eine
                Einladungs-Mail zum Registrieren. Danach hat die Person direkt
                Zugriff aufs Panel, ohne weitere Schritte.
              </p>
              <form className="admin-invite" onSubmit={handleInvite}>
                <input
                  type="email"
                  className="admin-input"
                  placeholder="name@beispiel.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="admin-btn admin-btn--primary"
                  disabled={pending}
                >
                  {pending ? "Lade ein…" : "Einladen"}
                </button>
              </form>
              {result && (
                <div
                  className={`admin-alert ${
                    result.ok ? "admin-alert--success" : "admin-alert--error"
                  }`}
                  style={{ marginTop: "0.75rem" }}
                >
                  {result.message}
                </div>
              )}

              {admins && admins.length > 0 && (
                <ul className="admin-list">
                  {admins.map((a) => (
                    <li key={a.email} className="admin-list__row">
                      <span className="admin-list__email">{a.email}</span>
                      {a.bootstrap ? (
                        <span className="admin-list__tag">Fest hinterlegt</span>
                      ) : (
                        <button
                          type="button"
                          className="admin-btn admin-btn--sm admin-btn--danger"
                          onClick={() => handleRemove(a.email)}
                        >
                          Entfernen
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
  );

  return (
    <>
      <button
        type="button"
        className="admin-sidebar__link admin-services-trigger"
        onClick={() => setOpen(true)}
      >
        Dienste &amp; Team ↗
      </button>
      {open && mounted && createPortal(modal, document.body)}
    </>
  );
}
