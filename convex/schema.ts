import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// ---------------------------------------------------------------------------
// Reusable value validators
// ---------------------------------------------------------------------------

// A KPI / result card shown on a case detail page (e.g. "500k+" / "Impressionen").
export const kpiValidator = v.object({
  value: v.string(), // e.g. "500k+"
  label: v.string(), // e.g. "Impressionen"
  description: v.optional(v.string()),
});

// A flexible content block so case bodies can be composed of ordered sections.
// `type` keeps it extensible; the public renderer falls back gracefully.
export const contentBlockValidator = v.object({
  type: v.union(
    v.literal("heading"),
    v.literal("paragraph"),
    v.literal("quote"),
  ),
  text: v.string(),
});

// A media reference. We store the Convex storage id (preferred) so we can mint
// fresh URLs on read, plus an optional cached url. `kind` lets one field hold
// both images and videos. This indirection is what makes a later migration to
// Cloudinary / Vercel Blob possible without touching the case schema shape.
export const mediaRefValidator = v.object({
  storageId: v.optional(v.id("_storage")),
  url: v.optional(v.string()), // external URL or cached Convex URL
  kind: v.union(v.literal("image"), v.literal("video")),
  alt: v.optional(v.string()),
  width: v.optional(v.number()),
  height: v.optional(v.number()),
});

// One hero clip: the looping video plus its overlaid title (brand) and the
// small line of text beneath it (type). Both labels are plain strings.
export const heroSlideValidator = v.object({
  video: v.optional(mediaRefValidator),
  brand: v.string(), // overlaid title, e.g. "Apple Music"
  type: v.string(), // small text under the title, e.g. "Social Media Campaign"
});

// One column of the home hero grid. Slides cross-fade/cycle within a column.
export const heroColumnValidator = v.object({
  slides: v.array(heroSlideValidator),
});

export default defineSchema({
  cases: defineTable({
    // --- Basic case data ---
    title: v.string(),
    slug: v.string(),
    client: v.string(),
    year: v.optional(v.string()),
    category: v.string(),
    tags: v.array(v.string()),
    services: v.array(v.string()),
    disciplines: v.array(v.string()),
    teaser: v.string(),

    // --- Detail content ---
    introHeadline: v.optional(v.string()),
    description: v.optional(v.string()),
    contentBlocks: v.optional(v.array(contentBlockValidator)),

    // --- Media ---
    thumbnailImage: v.optional(mediaRefValidator),
    heroImage: v.optional(mediaRefValidator),
    galleryImages: v.array(mediaRefValidator),
    videos: v.array(mediaRefValidator),
    externalVideoEmbeds: v.array(v.string()), // YouTube / Vimeo URLs

    // --- KPIs / results ---
    kpis: v.array(kpiValidator),

    // --- SEO ---
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),

    // --- Flags / ordering ---
    featured: v.boolean(),
    published: v.boolean(),
    sortOrder: v.number(),

    // --- Timestamps (ms epoch) ---
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    // Public detail pages look up by slug.
    .index("by_slug", ["slug"])
    // Public overview lists published cases ordered by sortOrder.
    .index("by_published", ["published", "sortOrder"])
    // Admin list ordered by sortOrder.
    .index("by_sortOrder", ["sortOrder"]),

  // Placeholder table for a future analytics integration (Google Analytics 4 /
  // GA Data API). Kept intentionally minimal — the admin Analytics page renders
  // placeholder cards today and can be wired to this table or the GA API later.
  // TODO: populate via a scheduled Convex action that calls the GA4 Data API.
  analyticsSnapshots: defineTable({
    date: v.string(), // YYYY-MM-DD
    visitorsToday: v.optional(v.number()),
    pageviewsToday: v.optional(v.number()),
    avgSessionDuration: v.optional(v.number()),
    realtimeUsers: v.optional(v.number()),
    topPages: v.optional(v.array(v.object({ path: v.string(), views: v.number() }))),
    trafficSources: v.optional(
      v.array(v.object({ source: v.string(), sessions: v.number() })),
    ),
    createdAt: v.number(),
  }).index("by_date", ["date"]),

  // Editable singleton content for the public site. Stored as rows discriminated
  // by `key` ("hero", "categories"), so the admin CMS can manage hero videos and
  // the case categories without a redeploy. Fields are optional because each key
  // only uses the subset relevant to it.
  siteContent: defineTable({
    key: v.string(), // singleton discriminator: "hero" | "categories" | "notifications"
    // Hero (key="hero"): the single full-bleed showreel video at the top of the
    // home page (current design). Falls back to /assets/videos/showreel.mp4.
    heroShowreel: v.optional(mediaRefValidator),
    // Hero (key="hero"): full-bleed video wall. Each "slot" is one column of the
    // wall and cross-fades through its list of videos. Fixed headline in design,
    // so no titles/labels/subtitle.
    heroSlots: v.optional(
      v.array(v.object({ videos: v.array(mediaRefValidator) })),
    ),
    // Legacy hero fields (old grid). Kept optional for back-compat with existing
    // rows; no longer used by the site.
    heroSubtitle: v.optional(v.string()),
    heroColumns: v.optional(v.array(heroColumnValidator)),
    // Case categories shown in the admin dropdown and the public filter bar.
    categories: v.optional(
      v.array(v.object({ value: v.string(), label: v.string() })),
    ),
    // Email addresses notified when a new contact submission arrives (key="notifications").
    notifyEmails: v.optional(v.array(v.string())),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  // Contact form submissions from the public site (the "Catch Us" overlay and
  // the Records inquiry form). Stored here so they show up in the admin panel
  // with a read/unread state; an optional Resend email notification is fired
  // on insert (see convex/contact.ts) when RESEND_API_KEY is configured.
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    subject: v.optional(v.string()), // Records form has a subject dropdown
    source: v.string(), // where it came from: "overlay" | "records"
    read: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_read", ["read"]),

  // Admin allowlist managed at runtime from the admin panel. The ADMIN_EMAILS
  // env var still acts as a permanent bootstrap seed (so you can never lock
  // yourself out); this table holds everyone invited via the UI afterwards.
  admins: defineTable({
    email: v.string(), // always stored lowercased
    addedAt: v.number(),
    addedBy: v.optional(v.string()), // email of the inviting admin
  }).index("by_email", ["email"]),
});
