"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

const MailIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="m4 7.5 8 5.5 8-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Admin editor for who gets an email when a new contact submission arrives.
// Backed by convex/contact.ts getNotifyRecipients / setNotifyRecipients.
export function NotifyRecipientsManager() {
  const stored = useQuery(api.contact.getNotifyRecipients) as
    | string[]
    | undefined;
  const update = useMutation(api.contact.setNotifyRecipients);

  const [emails, setEmails] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (stored && !initialized.current) {
      setEmails(stored.length ? stored : [""]);
      initialized.current = true;
    }
  }, [stored]);

  function patch(i: number, value: string) {
    setSaved(false);
    setEmails((prev) => prev.map((e, idx) => (idx === i ? value : e)));
  }
  function add() {
    setSaved(false);
    setEmails((prev) => [...prev, ""]);
  }
  function remove(i: number) {
    setSaved(false);
    setEmails((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setError("");
    const filled = emails.map((e) => e.trim()).filter(Boolean);
    const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (filled.some((e) => !EMAIL_RE.test(e))) {
      setError("Bitte nur gültige E-Mail-Adressen eintragen.");
      return;
    }
    setSaving(true);
    try {
      await update({ emails: filled });
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Speichern fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  if (stored === undefined) {
    return <div className="admin-empty">Lade Empfänger…</div>;
  }

  return (
    <div className="notify-manager">
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <ul className="notify-manager__list">
        {emails.map((email, i) => (
          <li className="notify-row" key={i}>
            <span className="notify-row__icon">{MailIcon}</span>
            <input
              className="notify-row__input"
              type="email"
              value={email}
              onChange={(e) => patch(i, e.target.value)}
              placeholder="name@firma.de"
            />
            <button
              type="button"
              className="notify-row__remove"
              onClick={() => remove(i)}
              aria-label="Empfänger entfernen"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="notify-manager__add" onClick={add}>
        <span className="notify-manager__add-plus">+</span>
        Empfänger hinzufügen
      </button>

      <div className="notify-manager__footer">
        <button
          type="button"
          className="admin-btn admin-btn--primary admin-btn--sm"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Speichere…" : "Speichern"}
        </button>
        {saved && <span className="notify-manager__saved">✓ Gespeichert</span>}
      </div>

      <p className="admin-hint notify-manager__hint">
        Diese Adressen werden bei jeder neuen Anfrage benachrichtigt. Ist die
        Liste leer, geht die Mail automatisch an{" "}
        <strong>robin@camo-media.de</strong>.
      </p>
    </div>
  );
}
