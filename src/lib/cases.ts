import type { ResolvedMediaRef } from "./media";

// Shape of a case as returned by the public Convex queries (media already
// resolved to URLs). Mirrors the Convex document; kept here so server/client
// components and the CaseCard can share a type without importing _generated.
export interface PublicCase {
  _id: string;
  title: string;
  slug: string;
  client: string;
  year?: string;
  category: string;
  tags: string[];
  services: string[];
  disciplines: string[];
  teaser: string;
  introHeadline?: string;
  description?: string;
  contentBlocks?: { type: "heading" | "paragraph" | "quote"; text: string }[];
  thumbnailImage: ResolvedMediaRef | null;
  heroImage: ResolvedMediaRef | null;
  galleryImages: ResolvedMediaRef[];
  videos: ResolvedMediaRef[];
  externalVideoEmbeds: string[];
  kpis: { value: string; label: string; description?: string }[];
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: number;
  updatedAt: number;
}

// Category slug -> human label for the filter bar (matches the original page).
export const CATEGORY_LABELS: Record<string, string> = {
  all: "ALL",
  social: "SOCIAL MEDIA",
  content: "CONTENT CREATION",
  digital: "DIGITAL CONCEPTS",
  strategy: "STRATEGY",
};

export const FILTER_ORDER = ["all", "social", "content", "digital", "strategy"];

/** The category/type line shown on a card: prefer first tag, else category. */
export function cardCategoryLabel(c: Pick<PublicCase, "tags" | "category">) {
  if (c.tags.length > 0) return c.tags[0];
  return CATEGORY_LABELS[c.category] ?? c.category;
}
