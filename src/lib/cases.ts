import type { ResolvedMediaRef } from "./media";

// Shape of a case as returned by the public Convex queries (media already
// resolved to URLs). Mirrors the Convex document; kept here so server/client
// components can share a type without importing _generated.
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

// Category slug -> label fallback when a category has no CMS label.
export const CATEGORY_LABELS: Record<string, string> = {
  all: "ALL",
  social: "SOCIAL MEDIA",
  content: "CONTENT CREATION",
  digital: "DIGITAL CONCEPTS",
  strategy: "STRATEGY",
};


