"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

type Category = { value: string; label: string };

// Admin editor for the case categories that feed the editor dropdown and the
// public filter bar. Add / rename / remove rows, then Save persists the list.
export function CategoryManager() {
  const stored = useQuery(api.categories.getCategoriesAdmin) as
    | Category[]
    | undefined;
  const update = useMutation(api.categories.updateCategories);

  const [items, setItems] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (stored && !initialized.current) {
      setItems(stored);
      initialized.current = true;
    }
  }, [stored]);

  function patch(i: number, p: Partial<Category>) {
    setSaved(false);
    setItems((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...p } : c)));
  }
  function add() {
    setSaved(false);
    setItems((prev) => [...prev, { value: "", label: "" }]);
  }
  function remove(i: number) {
    setSaved(false);
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setError("");
    if (items.some((c) => !c.label.trim())) {
      setError("Jede Kategorie braucht einen Namen.");
      return;
    }
    setSaving(true);
    try {
      await update({ categories: items });
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Speichern fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  if (stored === undefined) {
    return <div className="admin-empty">Lade Kategorien…</div>;
  }

  return (
    <div className="cat-manager">
      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      <div className="cat-manager__list">
        {items.map((c, i) => (
          <div className="cat-manager__row" key={i}>
            <input
              className="admin-input"
              value={c.label}
              onChange={(e) => patch(i, { label: e.target.value })}
              placeholder="Anzeigename, z. B. Social Media"
            />
            <input
              className="admin-input cat-manager__slug"
              value={c.value}
              onChange={(e) => patch(i, { value: e.target.value })}
              placeholder="slug (optional)"
            />
            <button
              type="button"
              className="admin-btn admin-btn--sm admin-btn--danger"
              onClick={() => remove(i)}
              aria-label="Kategorie entfernen"
            >
              ✕
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="admin-hint">Noch keine Kategorien. Füge eine hinzu.</p>
        )}
      </div>
      <div className="cat-manager__actions">
        <button type="button" className="admin-btn admin-btn--sm" onClick={add}>
          + Kategorie hinzufügen
        </button>
        <button
          type="button"
          className="admin-btn admin-btn--primary admin-btn--sm"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Speichere…" : "Kategorien speichern"}
        </button>
        {saved && <span className="cat-manager__saved">Gespeichert.</span>}
      </div>
      <p className="admin-hint" style={{ marginTop: "0.5rem" }}>
        Der „slug" ist der interne Wert (URL/Filter). Lässt du ihn leer, wird er
        automatisch aus dem Namen erzeugt. Vorhandene Cases behalten ihren alten
        slug, wenn du ihn hier umbenennst.
      </p>
    </div>
  );
}
