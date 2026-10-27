"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

const SOURCE_LABELS: Record<string, string> = {
  overlay: "Catch Us Formular",
  records: "Catch Moments Formular",
  home: "Startseite (Satz-Formular)",
  website: "Website",
};

function formatDate(ms: number): string {
  return new Date(ms).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminSubmissionsList() {
  const submissions = useQuery(api.contact.listAdmin);
  const setRead = useMutation(api.contact.setRead);
  const remove = useMutation(api.contact.remove);

  if (submissions === undefined) {
    return <p className="admin-muted">Lädt …</p>;
  }

  if (submissions.length === 0) {
    return (
      <div className="admin-empty">
        <p>Noch keine Anfragen.</p>
        <span className="admin-hint">
          Neue Nachrichten aus den Kontaktformularen erscheinen hier automatisch.
        </span>
      </div>
    );
  }

  return (
    <div className="inquiry-list">
      {submissions.map((s) => (
        <article
          key={s._id}
          className={`inquiry-card${s.read ? "" : " is-unread"}`}
        >
          <div className="inquiry-card__head">
            <div className="inquiry-card__who">
              {!s.read && <span className="inquiry-card__dot" aria-hidden="true" />}
              <strong className="inquiry-card__name">{s.name}</strong>
              <a className="inquiry-card__email" href={`mailto:${s.email}`}>
                {s.email}
              </a>
            </div>
            <div className="inquiry-card__meta">
              <span className="inquiry-card__source">
                {SOURCE_LABELS[s.source] ?? s.source}
              </span>
              <time className="inquiry-card__time">{formatDate(s.createdAt)}</time>
            </div>
          </div>

          {s.subject && (
            <p className="inquiry-card__subject">Betreff: {s.subject}</p>
          )}
          {s.message && <p className="inquiry-card__message">{s.message}</p>}

          <div className="inquiry-card__actions">
            <a className="admin-btn admin-btn--ghost" href={`mailto:${s.email}`}>
              Antworten
            </a>
            <button
              className="admin-btn admin-btn--ghost"
              onClick={() => setRead({ id: s._id, read: !s.read })}
            >
              {s.read ? "Als ungelesen markieren" : "Als gelesen markieren"}
            </button>
            <button
              className="admin-btn admin-btn--danger"
              onClick={() => {
                if (confirm("Diese Anfrage wirklich löschen?")) {
                  remove({ id: s._id });
                }
              }}
            >
              Löschen
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
