"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent, CONSENT_CHANGED_EVENT } from "./consent/consent";

// Google Analytics 4 — loaded ONLY after the visitor has granted analytics
// consent via the cookie banner. Reacts live to consent changes.
export function Analytics({ gaId }: { gaId?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(Boolean(readConsent()?.analytics));
    update();
    window.addEventListener(CONSENT_CHANGED_EVENT, update);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, update);
  }, []);

  if (!gaId || !enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
