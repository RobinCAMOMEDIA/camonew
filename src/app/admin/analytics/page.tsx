import { AnalyticsPlaceholder } from "@/components/admin/AnalyticsPlaceholder";

export default function AdminAnalyticsPage() {
  return (
    <>
      <div className="admin-page-head">
        <div className="admin-page-head__titles">
          <h1>Analytics</h1>
          <p>Website-Performance und Reichweite. Platzhalter bis GA4 angebunden ist.</p>
        </div>
      </div>
      <AnalyticsPlaceholder />
    </>
  );
}
