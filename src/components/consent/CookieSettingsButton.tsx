"use client";

import { openConsentSettings } from "./consent";

// Footer link that re-opens the consent banner so a visitor can change or
// withdraw their cookie choice at any time.
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="footer__legal-link"
      onClick={openConsentSettings}
    >
      Cookie-Einstellungen
    </button>
  );
}
