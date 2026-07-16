"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

const SUBJECT_LABELS: Record<string, string> = {
  booking: "DJ & Artist Booking",
  studio: "Studioanfrage & Soundtrack",
  management: "Artist Management",
  brand: "Kooperation & Brand Deals",
  other: "Sonstiges",
};

// The Records page inquiry form. Submissions are stored in Convex
// (api.contact.submit) and optionally emailed via Resend; see convex/contact.ts.
export function RecordsContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = useMutation(api.contact.submit);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subjectKey = String(data.get("subject") ?? "");
    setSending(true);
    setError(null);
    try {
      await submit({
        name,
        email,
        message,
        subject: SUBJECT_LABELS[subjectKey] ?? (subjectKey || undefined),
        source: "records",
      });
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

  if (sent) {
    return (
      <div className="form-success">
        <div className="form-success__mark">✓</div>
        <h3 className="form-success__title">Nachricht erhalten.</h3>
        <p className="form-success__text">
          Danke für deine Anfrage! Wir melden uns innerhalb von 24 Stunden bei
          dir.
        </p>
      </div>
    );
  }

  return (
    <form className="records-contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="form-name" className="form-label">
            Name *
          </label>
          <input
            type="text"
            id="form-name"
            name="name"
            className="form-input"
            placeholder="Dein Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="form-email" className="form-label">
            E-Mail-Adresse *
          </label>
          <input
            type="email"
            id="form-email"
            name="email"
            className="form-input"
            placeholder="name@firma.de"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="form-subject" className="form-label">
          Betreff *
        </label>
        <div className="select-wrapper">
          <select
            id="form-subject"
            name="subject"
            className="form-select"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Bitte auswählen...
            </option>
            <option value="booking">DJ & Artist Booking</option>
            <option value="studio">Studioanfrage & Soundtrack</option>
            <option value="management">Artist Management</option>
            <option value="brand">Kooperation & Brand Deals</option>
            <option value="other">Sonstiges</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="form-message" className="form-label">
          Deine Nachricht
        </label>
        <textarea
          id="form-message"
          name="message"
          className="form-input form-textarea"
          placeholder="Beschreibe dein Projekt oder deine Booking-Anfrage..."
          rows={4}
        />
      </div>

      <div className="form-checkbox-group">
        <label className="checkbox-container">
          <input type="checkbox" id="form-privacy" name="privacy" required />
          <span className="checkbox-checkmark" />
          <span className="checkbox-text">
            Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> zur Kenntnis
            genommen und willige in die Verarbeitung meiner Daten ein. *
          </span>
        </label>
        <p className="form-privacy-note">
          Wir speichern deine Anfrage ausschließlich zur Bearbeitung und löschen
          sie, sobald sie nicht mehr benötigt wird.
        </p>
      </div>

      {error && (
        <p className="records-contact-form__error" role="alert">
          {error}
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={sending}>
          {sending ? "Senden…" : "Senden"}
          {!sending && <span className="btn__arrow">→</span>}
        </button>
      </div>
    </form>
  );
}
