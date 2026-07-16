import Link from "next/link";
import { CaseForm } from "@/components/admin/CaseForm";

export default function NewCasePage() {
  return (
    <>
      <div className="admin-page-head">
        <div className="admin-page-head__titles">
          <h1>Neuer Case</h1>
          <p>Lege eine neue Case Study an.</p>
        </div>
        <Link href="/admin/cases" className="admin-btn">
          ← Zurück
        </Link>
      </div>
      <CaseForm />
    </>
  );
}
