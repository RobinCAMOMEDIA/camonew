// ---------------------------------------------------------------------------
// Analytics dashboard — PLACEHOLDER.
//
// This is intentionally static. To make it real, wire it to Google Analytics 4
// via the GA Data API (@google-analytics/data) from a SERVER context only:
//   - Tag the public site with the gtag.js snippet using
//     NEXT_PUBLIC_GA4_MEASUREMENT_ID (client-safe).
//   - Create a Convex action (or Next.js route handler) that reads
//     GA4_PROPERTY_ID + GOOGLE_APPLICATION_CREDENTIALS_JSON (server-only secrets)
//     and runs runReport / runRealtimeReport.
//   - Replace the hard-coded "—" values below with the fetched metrics.
// NEVER expose the GA service-account credentials to the browser.
// ---------------------------------------------------------------------------

const METRIC_CARDS: { label: string; hint: string }[] = [
  { label: "Visitors today", hint: "GA4 activeUsers (today)" },
  { label: "Pageviews today", hint: "GA4 screenPageViews (today)" },
  { label: "Avg. session duration", hint: "GA4 averageSessionDuration" },
  { label: "Realtime users", hint: "GA4 runRealtimeReport" },
];

const LIST_CARDS: { title: string; hint: string }[] = [
  { title: "Top pages", hint: "GA4 pagePath by views" },
  { title: "Top case pages", hint: "GA4 pagePath filtered to /cases/*" },
  { title: "Traffic sources", hint: "GA4 sessionDefaultChannelGroup" },
  { title: "CTA clicks", hint: "GA4 custom event: cta_click" },
];

export function AnalyticsPlaceholder() {
  return (
    <section className="admin-section">
      <h2 className="admin-section__title">
        Analytics
        <span className="admin-section__badge">Placeholder · GA4 TODO</span>
      </h2>
      <p className="admin-hint" style={{ marginBottom: "1rem" }}>
        Diese Werte sind Platzhalter. Sie werden später über die Google
        Analytics Data API (serverseitig) befüllt — siehe Code-Kommentare und
        die GA4-Variablen in <code>.env.example</code>.
      </p>

      <div className="admin-stats">
        {METRIC_CARDS.map((m) => (
          <div className="admin-stat" key={m.label} title={m.hint}>
            <div className="admin-stat__value">—</div>
            <div className="admin-stat__label">{m.label}</div>
          </div>
        ))}
      </div>

      <div
        className="admin-stats"
        style={{ marginTop: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
      >
        {LIST_CARDS.map((c) => (
          <div className="admin-stat" key={c.title} title={c.hint}>
            <div className="admin-stat__label" style={{ marginTop: 0 }}>
              {c.title}
            </div>
            <p
              className="admin-hint"
              style={{ marginTop: "0.6rem", fontStyle: "italic" }}
            >
              Keine Daten — {c.hint}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
