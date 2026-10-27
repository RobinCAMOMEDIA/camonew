"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import type { MediaRef } from "@/lib/media";
import { MediaUploader } from "@/components/admin/MediaUploader";

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

// Manage the home hero: ONE full-bleed showreel video. The headline/claim is
// part of the design, so there are no text fields here.
export function HeroManager() {
  const data = useQuery(api.hero.getHeroAdmin);
  const updateShowreel = useMutation(api.hero.updateShowreel);

  const [video, setVideo] = useState<MediaRef[]>([]);
  const [isDefault, setIsDefault] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!data || initialized.current) return;
    initialized.current = true;
    setIsDefault(data.showreel.isDefault);
    // Only preload the uploader with a real upload, not the bundled placeholder.
    setVideo(data.showreel.isDefault ? [] : [data.showreel as MediaRef]);
  }, [data]);

  async function save(next: MediaRef[]) {
    setError("");
    setSaving(true);
    try {
      // MediaRef.storageId is a plain string (storage-agnostic); the Convex
      // validator expects the branded Id<"_storage">. Assert at this boundary.
      await updateShowreel({
        showreel: next[0] ? cleanRef(next[0]) : undefined,
      } as Parameters<typeof updateShowreel>[0]);
      setIsDefault(!next[0]);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Speichern fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  if (data === undefined) {
    return <div className="admin-hint">Lade Showreel…</div>;
  }

  return (
    <div className="hero-admin">
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <p className="admin-hint" style={{ marginBottom: "1rem" }}>
        Das Showreel läuft stumm in Vollbild ganz oben auf der Startseite und
        öffnet sich mit Ton über „Showreel ansehen". Querformat (16:9) sieht am
        besten aus. Für schnelle Ladezeiten das Video vorher komprimieren
        (ideal: unter ~20&nbsp;MB).
      </p>

      {isDefault && (
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>
          Aktuell läuft noch das <strong>Platzhalter-Video</strong>. Lade euer
          eigenes Showreel hoch, um es zu ersetzen.
        </p>
      )}

      <MediaUploader
        label="Showreel-Video"
        accept="video"
        value={video}
        onChange={(refs) => {
          setSaved(false);
          setVideo(refs);
        }}
        hint="MP4, WebM, MOV (max 100 MB)."
      />

      <div className="hero-admin__actions" style={{ marginTop: "1.25rem" }}>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={() => save(video)}
          disabled={saving}
        >
          {saving ? "Speichere…" : "Showreel speichern"}
        </button>
        {!isDefault && (
          <button
            type="button"
            className="admin-btn admin-btn--sm"
            onClick={() => {
              setVideo([]);
              save([]);
            }}
            disabled={saving}
          >
            Auf Platzhalter zurücksetzen
          </button>
        )}
        {saved && (
          <span className="admin-alert admin-alert--success">Gespeichert.</span>
        )}
      </div>
    </div>
  );
}
