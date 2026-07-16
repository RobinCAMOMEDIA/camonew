import Link from "next/link";
import { AdminStats } from "@/components/admin/AdminStats";
import { AnalyticsPlaceholder } from "@/components/admin/AnalyticsPlaceholder";
import { SeedButton } from "@/components/admin/SeedButton";
import { HeroManager } from "@/components/admin/HeroManager";

export default function AdminDashboardPage() {
  return (
    <>
      <div className="admin-page-head">
        <div className="admin-page-head__titles">
          <h1>Dashboard</h1>
          <p>Überblick über deine Cases und die Website-Performance.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <SeedButton />
          <Link href="/admin/cases/new" className="admin-btn admin-btn--primary">
            + Neuer Case
          </Link>
        </div>
      </div>

      <AdminStats />

      <section className="admin-section">
        <h2 className="admin-section__title">
          Hero-Bereich (Startseite)
          <span className="admin-section__badge">Live</span>
        </h2>
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>
          Die drei Video-Spalten der Startseiten-Hero. Klicke eine Spalte an, um
          ihre Videos sowie deren Titel und Text festzulegen.{" "}
          <Link href="/admin/hero">Auf eigener Seite öffnen →</Link>
        </p>
        <HeroManager />
      </section>

      <section className="admin-section">
        <h2 className="admin-section__title">
          Cases verwalten
        </h2>
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>
          Erstelle, bearbeite, veröffentliche und sortiere deine Case Studies.
        </p>
        <Link href="/admin/cases" className="admin-btn">
          Zu allen Cases →
        </Link>
      </section>

      <AnalyticsPlaceholder />
      <p className="admin-hint" style={{ marginTop: "1rem" }}>
        <Link href="/admin/analytics">Analytics auf eigener Seite öffnen →</Link>
      </p>
    </>
  );
}
