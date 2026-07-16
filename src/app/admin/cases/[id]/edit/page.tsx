import Link from "next/link";
import { EditCaseLoader } from "@/components/admin/EditCaseLoader";

export default async function EditCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <div className="admin-page-head">
        <div className="admin-page-head__titles">
          <h1>Case bearbeiten</h1>
          <p>Inhalte, Medien und Status aktualisieren.</p>
        </div>
        <Link href="/admin/cases" className="admin-btn">
          ← Zurück
        </Link>
      </div>
      <EditCaseLoader id={id} />
    </>
  );
}
