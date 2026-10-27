"use client";

import { useEffect, useState } from "react";
import {
  readConsent,
  writeConsent,
  CONSENT_OPEN_EVENT,
} from "./consent";

// Compact, bottom-docked cookie consent banner. Necessary cookies are always
// on; analytics (GA4) is opt-in. Hidden once a decision is stored; re-openable
// via the "Cookie-Einstellungen" footer link (CONSENT_OPEN_EVENT).
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    // Only show on first visit (no stored decision yet).
    if (!readConsent()) setVisible(true);

    const onOpen = () => {
      const current = readConsent();
      setAnalytics(Boolean(current?.analytics));
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  function finish() {
    setVisible(false);
    setShowSettings(false);
  }
  function acceptAll() {
    writeConsent({ analytics: true });
    finish();
  }
  function rejectAll() {
    writeConsent({ analytics: false });
    finish();
  }
  function saveSelection() {
    writeConsent({ analytics });
    finish();
  }

  if (!visible) return null;

  return (
    <div
      className="consent"
      role="dialog"
      aria-modal="false"
      aria-label="Cookie-Einstellungen"
    >
      <p className="consent__title">Wir respektieren deine Privatsphäre</p>
      <p className="consent__text">
        Wir nutzen notwendige Cookies für den Betrieb der Seite und, mit deiner
        Einwilligung, Statistik-Cookies (Google Analytics), um die Website zu
        verbessern. Du kannst frei wählen und deine Auswahl jederzeit ändern.
        Mehr in unserer{" "}
        <a href="/datenschutz" target="_blank" rel="noreferrer">
          Datenschutzerklärung
        </a>
        .
      </p>

      {showSettings && (
        <div className="consent__settings">
          <div className="consent__row">
            <div>
              <span className="consent__row-title">Notwendig</span>
              <span className="consent__row-desc">
                Für den technischen Betrieb erforderlich. Immer aktiv.
              </span>
            </div>
            <label className="consent__switch consent__switch--locked">
              <input type="checkbox" checked disabled readOnly />
              <span className="consent__slider" />
            </label>
          </div>

          <div className="consent__row">
            <div>
              <span className="consent__row-title">Statistik / Analyse</span>
              <span className="consent__row-desc">
                Google Analytics 4 hilft uns zu verstehen, wie die Seite
                genutzt wird.
              </span>
            </div>
            <label className="consent__switch">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span className="consent__slider" />
            </label>
          </div>
        </div>
      )}

      <div className="consent__actions">
        <button
          type="button"
          className="consent__btn consent__btn--primary"
          onClick={acceptAll}
        >
          Alle akzeptieren
        </button>
        {showSettings ? (
          <button
            type="button"
            className="consent__btn consent__btn--ghost"
            onClick={saveSelection}
          >
            Auswahl speichern
          </button>
        ) : (
          <button
            type="button"
            className="consent__btn consent__btn--ghost"
            onClick={rejectAll}
          >
            Nur notwendige
          </button>
        )}
        {!showSettings && (
          <button
            type="button"
            className="consent__btn consent__btn--text"
            onClick={() => setShowSettings(true)}
          >
            Einstellungen
          </button>
        )}
      </div>
    </div>
  );
}
