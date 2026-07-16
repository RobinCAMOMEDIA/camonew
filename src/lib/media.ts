// ---------------------------------------------------------------------------
// Client-side media helpers + upload validation.
//
// This module is the single place that knows "how do we upload a file and turn
// it into a media reference". Today it targets Convex File Storage. To migrate
// to Cloudinary / Vercel Blob later, only `uploadFile` needs to change — the
// rest of the CMS deals in the storage-agnostic `MediaRef` shape.
// ---------------------------------------------------------------------------

export type MediaKind = "image" | "video";

export interface MediaRef {
  storageId?: string;
  url?: string;
  kind: MediaKind;
  alt?: string;
  width?: number;
  height?: number;
}

// Resolved on read (storageId -> url). Used by the public site & previews.
export interface ResolvedMediaRef extends Omit<MediaRef, "url"> {
  url: string | null;
}

export const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
export const VIDEO_MIME_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024; // 100 MB (kept simple in v1)

export function mediaKindForFile(file: File): MediaKind | null {
  if (IMAGE_MIME_TYPES.includes(file.type)) return "image";
  if (VIDEO_MIME_TYPES.includes(file.type)) return "video";
  return null;
}

/** Returns an error string if invalid, or null if the file is acceptable. */
export function validateFile(file: File): string | null {
  const kind = mediaKindForFile(file);
  if (!kind) {
    return `Nicht unterstütztes Dateiformat: ${file.type || "unbekannt"}. Erlaubt: JPG, PNG, WebP, AVIF, MP4, WebM.`;
  }
  if (kind === "image" && file.size > MAX_IMAGE_BYTES) {
    return `Bild ist zu groß (max ${Math.round(MAX_IMAGE_BYTES / 1024 / 1024)} MB).`;
  }
  if (kind === "video" && file.size > MAX_VIDEO_BYTES) {
    return `Video ist zu groß (max ${Math.round(MAX_VIDEO_BYTES / 1024 / 1024)} MB).`;
  }
  return null;
}

/**
 * Upload a validated file to Convex File Storage and return a MediaRef.
 * @param generateUploadUrl - the convex `files.generateUploadUrl` mutation fn.
 */
export async function uploadFile(
  file: File,
  generateUploadUrl: () => Promise<string>,
): Promise<MediaRef> {
  const validationError = validateFile(file);
  if (validationError) throw new Error(validationError);

  const kind = mediaKindForFile(file)!;
  const postUrl = await generateUploadUrl();
  const res = await fetch(postUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!res.ok) throw new Error(`Upload fehlgeschlagen (${res.status}).`);
  const { storageId } = (await res.json()) as { storageId: string };

  return { storageId, kind, alt: file.name };
}

/** Slugify identical to the Convex server helper, for live preview in forms. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[äàáâ]/g, "a")
    .replace(/[öòóô]/g, "o")
    .replace(/[üùúû]/g, "u")
    .replace(/ß/g, "ss")
    .replace(/&/g, "und")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}
