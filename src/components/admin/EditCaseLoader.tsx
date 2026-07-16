"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import type { PublicCase } from "@/lib/cases";
import { CaseForm } from "@/components/admin/CaseForm";

// Loads a single case (incl. drafts) via the admin-protected query, then hands
// it to the shared CaseForm in edit mode.
export function EditCaseLoader({ id }: { id: string }) {
  const result = useQuery(api.cases.getByIdAdmin, {
    id: id as Id<"cases">,
  }) as PublicCase | null | undefined;

  if (result === undefined) {
    return <div className="admin-empty">Lade Case…</div>;
  }

  if (result === null) {
    return (
      <div className="admin-empty">
        Case nicht gefunden.{" "}
        <Link href="/admin/cases" className="admin-topbar__link is-active">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  return <CaseForm initial={result} />;
}
