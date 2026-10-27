"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

const SUBJECTS = [
  "DJ & Artist Booking",
  "Studioanfrage & Soundtrack",
  "Artist Management",
  "Kooperation & Brand Deals",
  "Sonstiges",
];

// The Records page inquiry form, set on the orange booking close. Submissions
// are stored in Convex (api.contact.submit, source "records") and optionally
// emailed via Resend; see convex/contact.ts.
export function RecordsContactForm() {
  const [subject, setSubject] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = useMutation(api.contact.submit);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    if (!subject) {
      setError("Bitte wähl aus, worum es geht.");
      return;
    }
    const data = new FormData(e.currentTarget);
    setSending(true);
    setError(null);
    try {
      await submit({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
        subject,
        source: "records",
      });
      setSent(true);
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

  if (sent) {
    return (
      <div className="rf-done" role="status">
        <p className="rf-done__title x-wide">
          Gecatcht<span className="x-dot" aria-hidden="true" />
        </p>
        <p className="rf-done__text">
          Danke für deine Anfrage! Wir melden uns innerhalb von 24 Stunden bei dir.
        </p>
      </div>
    );
  }

  return (
    <form className="rf" onSubmit={handleSubmit} noValidate={false}>
      <fieldset className="rf-topics">
        <legend className="rf-label">Worum geht&apos;s?</legend>
        <div className="rf-topics__row">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              type="button"
              className="cto__topic"
              aria-pressed={subject === s}
              onClick={() => setSubject(s)}
            >
              <span className="cto__topic-mark" aria-hidden="true" />
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="rf-pair">
        <label className="rf-field">
          <span className="rf-label">Name</span>
          <input type="text" name="name" autoComplete="name" placeholder="Dein Name" required />
        </label>
        <label className="rf-field">
          <span className="rf-label">E-Mail</span>
          <input type="email" name="email" autoComplete="email" placeholder="name@mail.de" required />
        </label>
      </div>

      <label className="rf-field">
        <span className="rf-label">Nachricht</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Beschreib dein Projekt oder deine Booking-Anfrage: Datum, Ort, Act."
        />
      </label>

      <label className="rf-consent">
        <input type="checkbox" name="privacy" required />
        <span className="rf-consent__box" aria-hidden="true" />
        <span>
          Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> zur Kenntnis
          genommen und willige in die Verarbeitung meiner Daten zur Bearbeitung
          der Anfrage ein.
        </span>
      </label>

      {error && (
        <p className="cto__error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="x-pill" disabled={sending}>
        <span className="x-pill__fill" aria-hidden="true" />
        <span className="x-pill__label">{sending ? "Wird gesendet" : "Anfrage senden"}</span>
      </button>
    </form>
  );
}
