"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import type { PublicCase } from "@/lib/cases";
import { slugify, type MediaRef } from "@/lib/media";
import { MediaUploader } from "@/components/admin/MediaUploader";

const FALLBACK_CATEGORY_OPTIONS = [
  { value: "social", label: "Social Media" },
  { value: "content", label: "Content Creation" },
  { value: "digital", label: "Digital Concepts" },
  { value: "strategy", label: "Strategy" },
];

type Kpi = { value: string; label: string; description?: string };

// Drop nulls / extra keys so the ref matches mediaRefValidator exactly.
function cleanRef(ref: MediaRef): MediaRef {
  const out: MediaRef = { kind: ref.kind };
  if (ref.storageId) out.storageId = ref.storageId;
  if (typeof ref.url === "string") out.url = ref.url;
  if (ref.alt) out.alt = ref.alt;
  if (typeof ref.width === "number") out.width = ref.width;
  if (typeof ref.height === "number") out.height = ref.height;
  return out;
}

function listToText(list: string[]) {
  return list.join(", ");
}
function textToList(text: string) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function CaseForm({ initial }: { initial?: PublicCase }) {
  const router = useRouter();
  const create = useMutation(api.cases.create);
  const update = useMutation(api.cases.update);
  const isEdit = Boolean(initial);

  const storedCategories = useQuery(api.categories.getCategories) as
    | { value: string; label: string }[]
    | undefined;
  const categoryOptions = storedCategories ?? FALLBACK_CATEGORY_OPTIONS;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [client, setClient] = useState(initial?.client ?? "");
  const [year, setYear] = useState(initial?.year ?? "");
  const [category, setCategory] = useState(initial?.category ?? "content");
  const [teaser, setTeaser] = useState(initial?.teaser ?? "");
  const [introHeadline, setIntroHeadline] = useState(
    initial?.introHeadline ?? "",
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [tags, setTags] = useState(listToText(initial?.tags ?? []));
  const [services, setServices] = useState(listToText(initial?.services ?? []));
  const [disciplines, setDisciplines] = useState(
    listToText(initial?.disciplines ?? []),
  );
  const [kpis, setKpis] = useState<Kpi[]>(initial?.kpis ?? []);
  const [embeds, setEmbeds] = useState<string[]>(
    initial?.externalVideoEmbeds ?? [],
  );
  const [thumbnail, setThumbnail] = useState<MediaRef[]>(
    initial?.thumbnailImage ? [initial.thumbnailImage as MediaRef] : [],
  );
  const [hero, setHero] = useState<MediaRef[]>(
    initial?.heroImage ? [initial.heroImage as MediaRef] : [],
  );
  const [gallery, setGallery] = useState<MediaRef[]>(
    (initial?.galleryImages as MediaRef[]) ?? [],
  );
  const [videos, setVideos] = useState<MediaRef[]>(
    (initial?.videos as MediaRef[]) ?? [],
  );
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    initial?.seoDescription ?? "",
  );
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [published, setPublished] = useState(initial?.published ?? false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const previewSlug = useMemo(
    () => (slugTouched ? slugify(slug) : slugify(title)),
    [slug, slugTouched, title],
  );

  function updateKpi(i: number, patch: Partial<Kpi>) {
    setKpis((prev) => prev.map((k, idx) => (idx === i ? { ...k, ...patch } : k)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !client.trim() || !teaser.trim()) {
      setError("Titel, Kunde und Teaser sind Pflichtfelder.");
      return;
    }

    const args = {
      title: title.trim(),
      slug: previewSlug || undefined,
      client: client.trim(),
      year: year.trim() || undefined,
      category: category.trim() || "content",
      tags: textToList(tags),
      services: textToList(services),
      disciplines: textToList(disciplines),
      teaser: teaser.trim(),
      introHeadline: introHeadline.trim() || undefined,
      description: description.trim() || undefined,
      thumbnailImage: thumbnail[0] ? cleanRef(thumbnail[0]) : undefined,
      heroImage: hero[0] ? cleanRef(hero[0]) : undefined,
      galleryImages: gallery.map(cleanRef),
      videos: videos.map(cleanRef),
      externalVideoEmbeds: embeds.map((s) => s.trim()).filter(Boolean),
      kpis: kpis
        .filter((k) => k.value.trim() && k.label.trim())
        .map((k) => ({
          value: k.value.trim(),
          label: k.label.trim(),
          description: k.description?.trim() || undefined,
        })),
      seoTitle: seoTitle.trim() || undefined,
      seoDescription: seoDescription.trim() || undefined,
      featured,
      published,
    };

    setSaving(true);
    try {
      if (isEdit && initial) {
        await update({ id: initial._id as Id<"cases">, ...args });
      } else {
        await create(args);
      }
      router.push("/admin/cases");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Speichern fehlgeschlagen.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {/* --- Basics --- */}
      <fieldset className="admin-fieldset">
        <legend className="admin-fieldset__legend">Grunddaten</legend>
        <div className="admin-form-grid">
          <div className="admin-field admin-field--full">
            <label className="admin-label" htmlFor="f-title">
              Titel <span className="admin-label__req">*</span>
            </label>
            <input
              id="f-title"
              className="admin-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="z. B. G-Shock : Off-Stage"
              required
            />
          </div>

          <div className="admin-field admin-field--full">
            <label className="admin-label" htmlFor="f-slug">
              Slug (URL)
            </label>
            <input
              id="f-slug"
              className="admin-input"
              value={slugTouched ? slug : previewSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              placeholder="wird automatisch aus dem Titel erzeugt"
            />
            <span className="admin-hint">
              /cases/<strong>{previewSlug || "…"}</strong> — automatisch aus dem
              Titel, manuell überschreibbar.
            </span>
          </div>

          <div className="admin-field">
            <label className="admin-label" htmlFor="f-client">
              Kunde <span className="admin-label__req">*</span>
            </label>
            <input
              id="f-client"
              className="admin-input"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="z. B. Casio G-Shock"
              required
            />
          </div>

          <div className="admin-field">
            <label className="admin-label" htmlFor="f-year">
              Jahr
            </label>
            <input
              id="f-year"
              className="admin-input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="z. B. 2025"
            />
          </div>

          <div className="admin-field">
            <label className="admin-label" htmlFor="f-category">
              Kategorie
            </label>
            <select
              id="f-category"
              className="admin-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
              {!categoryOptions.some((o) => o.value === category) && (
                <option value={category}>{category}</option>
              )}
            </select>
          </div>

          <div className="admin-field">
            <label className="admin-label" htmlFor="f-tags">
              Tags
            </label>
            <input
              id="f-tags"
              className="admin-input"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Komma-getrennt, z. B. Photography, Social Media"
            />
          </div>

          <div className="admin-field">
            <label className="admin-label" htmlFor="f-services">
              Services
            </label>
            <input
              id="f-services"
              className="admin-input"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="Komma-getrennt"
            />
          </div>

          <div className="admin-field">
            <label className="admin-label" htmlFor="f-disciplines">
              Disziplinen
            </label>
            <input
              id="f-disciplines"
              className="admin-input"
              value={disciplines}
              onChange={(e) => setDisciplines(e.target.value)}
              placeholder="Komma-getrennt"
            />
          </div>

          <div className="admin-field admin-field--full">
            <label className="admin-label" htmlFor="f-teaser">
              Teaser <span className="admin-label__req">*</span>
            </label>
            <textarea
              id="f-teaser"
              className="admin-textarea"
              value={teaser}
              onChange={(e) => setTeaser(e.target.value)}
              placeholder="Kurzbeschreibung für die Card-Ansicht"
              required
            />
          </div>
        </div>
      </fieldset>

      {/* --- Detail content --- */}
      <fieldset className="admin-fieldset">
        <legend className="admin-fieldset__legend">Detailseite</legend>
        <div className="admin-form-grid">
          <div className="admin-field admin-field--full">
            <label className="admin-label" htmlFor="f-intro">
              Intro-Headline
            </label>
            <input
              id="f-intro"
              className="admin-input"
              value={introHeadline}
              onChange={(e) => setIntroHeadline(e.target.value)}
              placeholder="z. B. Die rohe Energie hinter den Kulissen"
            />
          </div>
          <div className="admin-field admin-field--full">
            <label className="admin-label" htmlFor="f-desc">
              Beschreibung
            </label>
            <textarea
              id="f-desc"
              className="admin-textarea"
              style={{ minHeight: 160 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ausführlicher Fließtext der Case Study"
            />
          </div>
        </div>
      </fieldset>

      {/* --- Media --- */}
      <fieldset className="admin-fieldset">
        <legend className="admin-fieldset__legend">Medien</legend>
        <MediaUploader
          label="Thumbnail (Card-Bild)"
          accept="image"
          value={thumbnail}
          onChange={setThumbnail}
          hint="Wird in der Cases-Übersicht angezeigt. JPG, PNG, WebP, AVIF (max 8 MB)."
        />
        <MediaUploader
          label="Hero-Bild (Detailseite)"
          accept="image"
          value={hero}
          onChange={setHero}
          hint="Großes Bild oben auf der Detailseite."
        />
        <MediaUploader
          label="Galerie"
          accept="image"
          multiple
          value={gallery}
          onChange={setGallery}
          hint="Mehrere Bilder. Reihenfolge mit ← → anpassen."
        />
        <MediaUploader
          label="Videos (Upload)"
          accept="video"
          multiple
          value={videos}
          onChange={setVideos}
          hint="MP4, WebM, MOV (max 100 MB)."
        />

        <div className="admin-field admin-field--full">
          <span className="admin-label">Externe Video-Embeds</span>
          <span className="admin-hint">YouTube- oder Vimeo-Links.</span>
          {embeds.map((url, i) => (
            <div className="admin-repeat-row admin-repeat-row--embed" key={i}>
              <input
                className="admin-input"
                value={url}
                onChange={(e) =>
                  setEmbeds((prev) =>
                    prev.map((u, idx) => (idx === i ? e.target.value : u)),
                  )
                }
                placeholder="https://youtube.com/watch?v=…"
              />
              <button
                type="button"
                className="admin-btn admin-btn--sm admin-btn--danger"
                onClick={() =>
                  setEmbeds((prev) => prev.filter((_, idx) => idx !== i))
                }
              >
                Entfernen
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn admin-btn--sm"
            onClick={() => setEmbeds((prev) => [...prev, ""])}
          >
            + Embed hinzufügen
          </button>
        </div>
      </fieldset>

      {/* --- KPIs --- */}
      <fieldset className="admin-fieldset">
        <legend className="admin-fieldset__legend">Ergebnisse / KPIs</legend>
        {kpis.map((kpi, i) => (
          <div className="admin-repeat-row" key={i}>
            <input
              className="admin-input"
              value={kpi.value}
              onChange={(e) => updateKpi(i, { value: e.target.value })}
              placeholder="Wert, z. B. 500k+"
            />
            <input
              className="admin-input"
              value={kpi.label}
              onChange={(e) => updateKpi(i, { label: e.target.value })}
              placeholder="Label, z. B. Impressionen"
            />
            <input
              className="admin-input"
              value={kpi.description ?? ""}
              onChange={(e) => updateKpi(i, { description: e.target.value })}
              placeholder="Beschreibung (optional)"
            />
            <button
              type="button"
              className="admin-btn admin-btn--sm admin-btn--danger"
              onClick={() => setKpis((prev) => prev.filter((_, idx) => idx !== i))}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="admin-btn admin-btn--sm"
          onClick={() =>
            setKpis((prev) => [...prev, { value: "", label: "", description: "" }])
          }
        >
          + KPI hinzufügen
        </button>
      </fieldset>

      {/* --- SEO --- */}
      <fieldset className="admin-fieldset">
        <legend className="admin-fieldset__legend">SEO</legend>
        <div className="admin-form-grid">
          <div className="admin-field admin-field--full">
            <label className="admin-label" htmlFor="f-seo-title">
              SEO-Titel
            </label>
            <input
              id="f-seo-title"
              className="admin-input"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Fällt auf den Case-Titel zurück, wenn leer"
            />
          </div>
          <div className="admin-field admin-field--full">
            <label className="admin-label" htmlFor="f-seo-desc">
              SEO-Beschreibung
            </label>
            <textarea
              id="f-seo-desc"
              className="admin-textarea"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Fällt auf den Teaser zurück, wenn leer"
            />
          </div>
        </div>
      </fieldset>

      {/* --- Flags --- */}
      <fieldset className="admin-fieldset">
        <legend className="admin-fieldset__legend">Status</legend>
        <div className="admin-checkbox-row">
          <input
            id="f-featured"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <label htmlFor="f-featured">Featured (auf der Startseite hervorheben)</label>
        </div>
        <div className="admin-checkbox-row">
          <input
            id="f-published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="f-published">
            Veröffentlicht (öffentlich sichtbar)
          </label>
        </div>
      </fieldset>

      <div className="admin-form-actions">
        <button
          type="submit"
          className="admin-btn admin-btn--primary"
          disabled={saving}
        >
          {saving
            ? "Speichere…"
            : isEdit
              ? "Änderungen speichern"
              : published
                ? "Erstellen & veröffentlichen"
                : "Als Entwurf speichern"}
        </button>
        <button
          type="button"
          className="admin-btn"
          onClick={() => router.push("/admin/cases")}
          disabled={saving}
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
