import Link from "next/link";
import { AdminCasesList } from "@/components/admin/AdminCasesList";
import { CategoryManager } from "@/components/admin/CategoryManager";

export default function AdminCasesPage() {
  return (
    <>
      <div className="admin-page-head">
        <div className="admin-page-head__titles">
          <h1>Cases</h1>
          <p>Alle Case Studies verwalten — auch unveröffentlichte Entwürfe.</p>
        </div>
        <Link href="/admin/cases/new" className="admin-btn admin-btn--primary">
          + Neuer Case
        </Link>
      </div>

      <details className="admin-section admin-collapsible">
        <summary className="admin-collapsible__summary">
          <span className="admin-section__title" style={{ margin: 0 }}>
            Kategorien verwalten
          </span>
          <span className="admin-hint">
            Bestimmt das Dropdown im Case-Editor und die Filter auf /cases.
          </span>
        </summary>
        <div className="admin-collapsible__body">
          <CategoryManager />
        </div>
      </details>

      <AdminCasesList />
    </>
  );
}
