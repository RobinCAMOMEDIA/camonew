// Shared consent state helpers (localStorage-backed, no external dependency).
// Categories are extensible — add keys here + a row in ConsentBanner and a
// gate in the corresponding loader (e.g. Analytics.tsx) to support more cookies.

export const CONSENT_KEY = "camo-consent-v1";
export const CONSENT_CHANGED_EVENT = "camo-consent-changed";
export const CONSENT_OPEN_EVENT = "camo-consent-open";

export type ConsentState = {
  analytics: boolean;
};

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return { analytics: Boolean(parsed.analytics) };
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ ...state, ts: Date.now() }),
    );
  } catch {
    /* ignore quota / privacy-mode errors */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

// Re-open the banner (e.g. from a "Cookie-Einstellungen" footer link) so the
// user can withdraw or change a previously given consent.
export function openConsentSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
