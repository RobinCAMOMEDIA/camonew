import Link from "next/link";
import { HeroManager } from "@/components/admin/HeroManager";

export default function AdminHeroPage() {
  return (
    <>
      <div className="admin-page-head">
        <div className="admin-page-head__titles">
          <h1>Hero-Bereich</h1>
          <p>
            Die drei Video-Spalten der Startseiten-Hero. Klicke eine Spalte an,
            um ihre Videos sowie deren Titel und Text festzulegen.
          </p>
        </div>
        <Link href="/" className="admin-btn" target="_blank">
          Startseite ansehen ↗
        </Link>
      </div>
      <HeroManager />
    </>
  );
}
