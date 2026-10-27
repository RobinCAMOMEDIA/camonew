"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import type { PublicCase } from "@/lib/cases";
import { CATEGORY_LABELS } from "@/lib/cases";

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function AdminCasesList() {
  const cases = useQuery(api.cases.listAllAdmin) as PublicCase[] | undefined;
  const categories = useQuery(api.categories.getCategories) as
    | { value: string; label: string }[]
    | undefined;
  const setPublished = useMutation(api.cases.setPublished);
  const setFeatured = useMutation(api.cases.setFeatured);
  const remove = useMutation(api.cases.remove);
  const reorder = useMutation(api.cases.reorder);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Local working copy so drag previews update instantly; kept in sync with the
  // server query (which also reflects the persisted order after `reorder`).
  const [items, setItems] = useState<PublicCase[]>([]);
  const dragIndex = useRef<number | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    if (cases) setItems(cases);
  }, [cases]);

  function handleDragStart(e: React.DragEvent, index: number) {
    dragIndex.current = index;
    setDraggingId(items[index]?._id ?? null);
    e.dataTransfer.effectAllowed = "move";
    // Required for drag to initialise in Firefox.
    e.dataTransfer.setData("text/plain", String(index));
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const from = dragIndex.current;
    if (from === null || from === index) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });
    dragIndex.current = index;
  }

  async function handleDrop() {
    const moved = draggingId;
    dragIndex.current = null;
    setDraggingId(null);
    if (!moved) return;
    setError("");
    try {
      await reorder({ orderedIds: items.map((c) => c._id as Id<"cases">) });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reihenfolge speichern fehlgeschlagen.");
    }
  }

  async function withBusy(id: string, fn: () => Promise<unknown>) {
    setBusyId(id);
    setError("");
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Aktion fehlgeschlagen.");
    } finally {
      setBusyId(null);
    }
  }

  function handleDelete(c: PublicCase) {
    const ok = window.confirm(
      `Case „${c.title}" wirklich unwiderruflich löschen? Zugehörige hochgeladene Medien werden ebenfalls entfernt.`,
    );
    if (!ok) return;
    void withBusy(c._id, () => remove({ id: c._id as Id<"cases"> }));
  }

  if (cases === undefined) {
    return <div className="admin-empty">Lade Cases…</div>;
  }

  if (cases.length === 0) {
    return (
      <div className="admin-empty">
        Noch keine Cases vorhanden.{" "}
        <Link href="/admin/cases/new" className="admin-topbar__link is-active">
          Ersten Case anlegen →
        </Link>
      </div>
    );
  }

  return (
    <>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      <p className="admin-hint" style={{ marginBottom: "0.75rem" }}>
        Tipp: Ziehe einen Case am <span aria-hidden="true">⠿</span>-Griff, um die
        Reihenfolge zu ändern. Sie bestimmt, wie die Cases öffentlich
        präsentiert werden.
      </p>
      <div className="admin-table-wrap" style={{ marginTop: error ? "1rem" : 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th aria-label="Reihenfolge" style={{ width: 36 }} />
              <th>Titel</th>
              <th>Kunde</th>
              <th>Kategorie</th>
              <th>Status</th>
              <th>Aktualisiert</th>
              <th style={{ textAlign: "right" }}>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c, index) => {
              const busy = busyId === c._id;
              return (
                <tr
                  key={c._id}
                  className={draggingId === c._id ? "is-dragging" : ""}
                  onDragOver={(e) => handleDragOver(e, index)}
                >
                  <td className="admin-drag-cell">
                    <span
                      className="admin-drag-handle"
                      role="button"
                      tabIndex={0}
                      aria-label="Zum Sortieren ziehen"
                      title="Zum Sortieren ziehen"
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnd={handleDrop}
                    >
                      ⠿
                    </span>
                  </td>
                  <td>
                    <div className="admin-cell-title">{c.title}</div>
                    <div className="admin-cell-sub">/cases/{c.slug}</div>
                  </td>
                  <td>{c.client}</td>
                  <td>
                    {categories?.find((cat) => cat.value === c.category)?.label ??
                      CATEGORY_LABELS[c.category] ??
                      c.category}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span
                        className={`admin-pill ${c.published ? "admin-pill--published" : "admin-pill--draft"}`}
                      >
                        {c.published ? "Live" : "Entwurf"}
                      </span>
                      {c.featured && (
                        <span className="admin-pill admin-pill--featured">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td>{formatDate(c.updatedAt)}</td>
                  <td>
                    <div className="admin-row-actions">
                      <Link
                        href={`/admin/cases/${c._id}/edit`}
                        className="admin-btn admin-btn--sm"
                      >
                        Bearbeiten
                      </Link>
                      <button
                        className="admin-btn admin-btn--sm"
                        disabled={busy}
                        onClick={() =>
                          withBusy(c._id, () =>
                            setPublished({
                              id: c._id as Id<"cases">,
                              published: !c.published,
                            }),
                          )
                        }
                      >
                        {c.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        className="admin-btn admin-btn--sm"
                        disabled={busy}
                        onClick={() =>
                          withBusy(c._id, () =>
                            setFeatured({
                              id: c._id as Id<"cases">,
                              featured: !c.featured,
                            }),
                          )
                        }
                      >
                        {c.featured ? "Unfeature" : "Feature"}
                      </button>
                      <button
                        className="admin-btn admin-btn--sm admin-btn--danger"
                        disabled={busy}
                        onClick={() => handleDelete(c)}
                      >
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
