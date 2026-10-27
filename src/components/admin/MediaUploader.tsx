"use client";

import { useRef, useState } from "react";
import { useConvex, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import {
  uploadFile,
  validateFile,
  type MediaRef,
} from "@/lib/media";

interface Props {
  label: string;
  accept: "image" | "video";
  multiple?: boolean;
  value: MediaRef[];
  onChange: (refs: MediaRef[]) => void;
  hint?: string;
}

const ACCEPT_ATTR = {
  image: "image/jpeg,image/png,image/webp,image/avif",
  video: "video/mp4,video/webm,video/quicktime",
};

// Uploads files to Convex File Storage, resolves a preview URL, and manages the
// resulting MediaRef list (add / remove / reorder). Works for single fields
// (multiple=false: a new upload replaces the previous one) and galleries.
export function MediaUploader({
  label,
  accept,
  multiple = false,
  value,
  onChange,
  hint,
}: Props) {
  const convex = useConvex();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError("");
    setUploading(true);
    try {
      const list = multiple ? Array.from(files) : [files[0]];
      const uploaded: MediaRef[] = [];
      for (const file of list) {
        const validationError = validateFile(file);
        if (validationError) throw new Error(validationError);
        const ref = await uploadFile(file, generateUploadUrl);
        // Resolve a real served URL for preview (and as a cached fallback).
        if (ref.storageId) {
          const url = await convex.query(api.files.getUrl, {
            storageId: ref.storageId as Id<"_storage">,
          });
          if (url) ref.url = url;
        }
        uploaded.push(ref);
      }
      onChange(multiple ? [...value, ...uploaded] : uploaded.slice(0, 1));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload fehlgeschlagen.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="admin-field admin-field--full">
      <span className="admin-label">{label}</span>
      {hint && <span className="admin-hint">{hint}</span>}

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {value.length > 0 && (
        <div className="admin-media-grid">
          {value.map((ref, i) => (
            <div className="admin-media-item" key={ref.storageId ?? ref.url ?? i}>
              {ref.kind === "video" ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={ref.url ?? undefined} muted />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ref.url ?? undefined} alt={ref.alt ?? ""} />
              )}
              <div className="admin-media-item__bar">
                {multiple ? (
                  <span style={{ display: "flex", gap: 4 }}>
                    <button
                      type="button"
                      className="admin-media-btn"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      aria-label="Nach vorne"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="admin-media-btn"
                      onClick={() => move(i, 1)}
                      disabled={i === value.length - 1}
                      aria-label="Nach hinten"
                    >
                      →
                    </button>
                  </span>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  className="admin-media-btn"
                  onClick={() => removeAt(i)}
                  aria-label="Entfernen"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="admin-dropzone"
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        {uploading
          ? "Lade hoch…"
          : multiple
            ? "Dateien auswählen oder hierher ziehen"
            : value.length > 0
              ? "Ersetzen: neue Datei auswählen"
              : "Datei auswählen"}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR[accept]}
        multiple={multiple}
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
