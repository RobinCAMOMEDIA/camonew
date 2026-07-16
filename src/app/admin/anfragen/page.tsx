import { AdminSubmissionsList } from "@/components/admin/AdminSubmissionsList";
import { NotifySettingsButton } from "@/components/admin/NotifySettingsButton";

export default function AdminInquiriesPage() {
  return (
    <>
      <div className="admin-page-head">
        <div className="admin-page-head__titles">
          <h1>Anfragen</h1>
          <p>
            Kontaktanfragen von der Website — aus dem „Catch Us“-Formular und der
            Records-Seite.
          </p>
        </div>
      </div>

      <AdminSubmissionsList />

      <NotifySettingsButton />
    </>
  );
}
