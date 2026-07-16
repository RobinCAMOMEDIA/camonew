"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NotifyRecipientsManager } from "./NotifyRecipientsManager";

const BellIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path
      d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// A clearly-clickable floating button (bottom-left of the content area) that
// opens a modal with the notification-recipient editor — replaces the easy-to-
// miss collapsible that used to sit at the top of the Anfragen page.
export function NotifySettingsButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const modal = (
    <div
      className="admin-modal__overlay"
      role="dialog"
      aria-modal="true"
      aria-label="E-Mail-Benachrichtigungen"
      onClick={() => setOpen(false)}
    >
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__head">
          <h2 className="admin-modal__title">E-Mail-Benachrichtigungen</h2>
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
          <p className="admin-hint" style={{ marginBottom: "1rem" }}>
            Lege fest, wer eine E-Mail bekommt, sobald eine neue Anfrage über die
            Website reinkommt.
          </p>
          <NotifyRecipientsManager />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="notify-fab"
        onClick={() => setOpen(true)}
      >
        <span className="notify-fab__icon">{BellIcon}</span>
        Benachrichtigungen
      </button>
      {open && mounted && createPortal(modal, document.body)}
    </>
  );
}
