"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import type { MediaRef } from "@/lib/media";
import { MediaUploader } from "@/components/admin/MediaUploader";

// Local editable shapes. A slide keeps its video as a MediaRef[] (0 or 1) so we
// can reuse the single-file MediaUploader directly.
type SlideState = { video: MediaRef[]; brand: string; type: string };
type ColumnState = { slides: SlideState[] };

// Strip nulls / extra keys so a ref matches mediaRefValidator exactly.
function cleanRef(ref: MediaRef): MediaRef {
  const out: MediaRef = { kind: ref.kind };
  if (ref.storageId) out.storageId = ref.storageId;
  if (typeof ref.url === "string") out.url = ref.url;
  if (ref.alt) out.alt = ref.alt;
  if (typeof ref.width === "number") out.width = ref.width;
  if (typeof ref.height === "number") out.height = ref.height;
  return out;
}

// Manage the home hero: three columns side by side, click one to edit its
// videos and labels. Persists the whole config via hero.updateHero.
export function HeroManager() {
  const data = useQuery(api.hero.getHeroAdmin);
  const updateHero = useMutation(api.hero.updateHero);

  const [subtitle, setSubtitle] = useState("");
  const [columns, setColumns] = useState<ColumnState[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const initialized = useRef(false);

  // Seed local state from the server once the query resolves.
  useEffect(() => {
    if (!data || initialized.current) return;
    initialized.current = true;
    setSubtitle(data.heroSubtitle ?? "");
    setColumns(
      data.heroColumns.map((col) => ({
        slides: col.slides.map((s) => ({
          video: s.video ? [s.video as MediaRef] : [],
          brand: s.brand,
          type: s.type,
        })),
      })),
    );
  }, [data]);

  function patchSlide(ci: number, si: number, patch: Partial<SlideState>) {
    setSaved(false);
    setColumns((prev) =>
      prev.map((col, c) =>
        c !== ci
          ? col
          : {
              slides: col.slides.map((s, i) =>
                i !== si ? s : { ...s, ...patch },
              ),
            },
      ),
    );
  }

  function addSlide(ci: number) {
    setSaved(false);
    setColumns((prev) =>
      prev.map((col, c) =>
        c !== ci
          ? col
          : { slides: [...col.slides, { video: [], brand: "", type: "" }] },
      ),
    );
  }

  function removeSlide(ci: number, si: number) {
    setSaved(false);
    setColumns((prev) =>
      prev.map((col, c) =>
        c !== ci ? col : { slides: col.slides.filter((_, i) => i !== si) },
      ),
    );
  }

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      // MediaRef.storageId is a plain string (storage-agnostic); the Convex
      // validator expects the branded Id<"_storage">. Assert at this boundary.
      await updateHero({
        heroSubtitle: subtitle.trim() || undefined,
        heroColumns: columns.map((col) => ({
          slides: col.slides.map((s) => ({
            video: s.video[0] ? cleanRef(s.video[0]) : undefined,
            brand: s.brand.trim(),
            type: s.type.trim(),
          })),
        })),
      } as Parameters<typeof updateHero>[0]);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Speichern fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  if (data === undefined) {
    return <div className="admin-hint">Lade Hero-Inhalte…</div>;
  }

  return (
    <div className="hero-admin">
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <div className="admin-field admin-field--full" style={{ marginBottom: "1.25rem" }}>
        <label className="admin-label" htmlFor="hero-subtitle">
          Subtitle (über dem Video-Grid)
        </label>
        <input
          id="hero-subtitle"
          className="admin-input"
          value={subtitle}
          onChange={(e) => {
            setSaved(false);
            setSubtitle(e.target.value);
          }}
          placeholder="z. B. BASED ON A CULTURE."
        />
      </div>

      {/* Three columns side by side — click one to edit it. */}
      <div className="hero-admin__columns">
        {columns.map((col, ci) => (
          <button
            type="button"
            key={ci}
            className={`hero-admin__col${active === ci ? " is-active" : ""}`}
            onClick={() => setActive(ci)}
          >
            <div className="hero-admin__col-head">
              <span className="hero-admin__col-name">Spalte {ci + 1}</span>
              <span className="hero-admin__col-count">
                {col.slides.length} {col.slides.length === 1 ? "Video" : "Videos"}
              </span>
            </div>
            <div className="hero-admin__col-previews">
              {col.slides.length === 0 && (
                <span className="admin-hint">Keine Videos</span>
              )}
              {col.slides.map((s, si) => (
                <div className="hero-admin__thumb" key={si}>
                  {s.video[0]?.url ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={s.video[0].url} muted />
                  ) : (
                    <div className="hero-admin__thumb-empty" />
                  )}
                  <span className="hero-admin__thumb-label">
                    {s.brand || "— ohne Titel —"}
                  </span>
                </div>
              ))}
            </div>
            <span className="hero-admin__col-edit">
              {active === ci ? "Wird bearbeitet" : "Bearbeiten →"}
            </span>
          </button>
        ))}
      </div>

      {/* Editor for the selected column */}
      {active !== null && columns[active] && (
        <div className="hero-admin__editor">
          <h3 className="hero-admin__editor-title">
            Spalte {active + 1} bearbeiten
          </h3>
          {columns[active].slides.map((slide, si) => (
            <div className="hero-admin__slide" key={si}>
              <div className="hero-admin__slide-head">
                <span className="admin-label">Video {si + 1}</span>
                <button
                  type="button"
                  className="admin-btn admin-btn--sm admin-btn--danger"
                  onClick={() => removeSlide(active, si)}
                >
                  Entfernen
                </button>
              </div>
              <MediaUploader
                label="Video"
                accept="video"
                value={slide.video}
                onChange={(refs) => patchSlide(active, si, { video: refs })}
                hint="MP4, WebM, MOV (max 100 MB)."
              />
              <div className="admin-form-grid">
                <div className="admin-field">
                  <label className="admin-label">Titel</label>
                  <input
                    className="admin-input"
                    value={slide.brand}
                    onChange={(e) =>
                      patchSlide(active, si, { brand: e.target.value })
                    }
                    placeholder="z. B. Apple Music"
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Text</label>
                  <input
                    className="admin-input"
                    value={slide.type}
                    onChange={(e) =>
                      patchSlide(active, si, { type: e.target.value })
                    }
                    placeholder="z. B. Social Media Campaign"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn admin-btn--sm"
            onClick={() => addSlide(active)}
          >
            + Video hinzufügen
          </button>
        </div>
      )}

      <div className="hero-admin__actions">
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Speichere…" : "Hero speichern"}
        </button>
        {saved && (
          <span className="admin-alert admin-alert--success">
            Gespeichert.
          </span>
        )}
      </div>
    </div>
  );
}
