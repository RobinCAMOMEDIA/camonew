import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import {
  kpiValidator,
  contentBlockValidator,
  mediaRefValidator,
} from "./schema";
import { requireAdmin, slugify } from "./lib";

// ---------------------------------------------------------------------------
// Media URL resolution
// On read we turn stored Convex storageIds into servable URLs. External URLs
// (e.g. already-hosted media) pass through untouched. This is the single place
// to change if you migrate storage providers.
// ---------------------------------------------------------------------------
type MediaRef = NonNullable<Doc<"cases">["heroImage"]>;

async function resolveMedia(
  ctx: QueryCtx,
  ref: MediaRef | undefined,
): Promise<(Omit<MediaRef, "url"> & { url: string | null }) | null> {
  if (!ref) return null;
  let url = ref.url ?? null;
  if (ref.storageId) {
    url = await ctx.storage.getUrl(ref.storageId);
  }
  return { ...ref, url };
}

async function resolveCaseMedia(ctx: QueryCtx, doc: Doc<"cases">) {
  const [thumbnailImage, heroImage] = await Promise.all([
    resolveMedia(ctx, doc.thumbnailImage),
    resolveMedia(ctx, doc.heroImage),
  ]);
  const galleryImages = await Promise.all(
    doc.galleryImages.map((m) => resolveMedia(ctx, m)),
  );
  const videos = await Promise.all(doc.videos.map((m) => resolveMedia(ctx, m)));
  return {
    ...doc,
    thumbnailImage,
    heroImage,
    galleryImages: galleryImages.filter(Boolean),
    videos: videos.filter(Boolean),
  };
}

// ===========================================================================
// PUBLIC QUERIES (no auth — only ever return published data)
// ===========================================================================

/** All published cases for the public overview, ordered by sortOrder. */
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db
      .query("cases")
      .withIndex("by_published", (q) => q.eq("published", true))
      .collect();
    docs.sort((a, b) => a.sortOrder - b.sortOrder);
    return Promise.all(docs.map((d) => resolveCaseMedia(ctx, d)));
  },
});

/** A single PUBLISHED case by slug. Returns null for missing/unpublished. */
export const getPublishedBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const doc = await ctx.db
      .query("cases")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (!doc || !doc.published) return null; // never leak drafts
    return resolveCaseMedia(ctx, doc);
  },
});

/** Slugs of published cases, for generateStaticParams / sitemap. */
export const listPublishedSlugs = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db
      .query("cases")
      .withIndex("by_published", (q) => q.eq("published", true))
      .collect();
    return docs.map((d) => ({ slug: d.slug, updatedAt: d.updatedAt }));
  },
});

// ===========================================================================
// ADMIN QUERIES (auth required — may return drafts)
// ===========================================================================

/** All cases (incl. drafts) for the admin list. */
export const listAllAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const docs = await ctx.db.query("cases").withIndex("by_sortOrder").collect();
    docs.sort((a, b) => a.sortOrder - b.sortOrder);
    return Promise.all(docs.map((d) => resolveCaseMedia(ctx, d)));
  },
});

/** A single case by id for the edit form (incl. drafts). */
export const getByIdAdmin = query({
  args: { id: v.id("cases") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    const doc = await ctx.db.get(id);
    if (!doc) return null;
    return resolveCaseMedia(ctx, doc);
  },
});

/** Lightweight stats for the dashboard overview. */
export const adminStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const docs = await ctx.db.query("cases").collect();
    return {
      total: docs.length,
      published: docs.filter((d) => d.published).length,
      drafts: docs.filter((d) => !d.published).length,
      featured: docs.filter((d) => d.featured).length,
    };
  },
});

// ===========================================================================
// MUTATIONS (all admin-only)
// ===========================================================================

// Shared input shape for create/update. Media is passed as plain refs
// (storageId or external url) the client assembled after uploading.
const caseInput = {
  title: v.string(),
  slug: v.optional(v.string()),
  client: v.string(),
  year: v.optional(v.string()),
  category: v.string(),
  tags: v.array(v.string()),
  services: v.array(v.string()),
  disciplines: v.array(v.string()),
  teaser: v.string(),
  introHeadline: v.optional(v.string()),
  description: v.optional(v.string()),
  contentBlocks: v.optional(v.array(contentBlockValidator)),
  thumbnailImage: v.optional(mediaRefValidator),
  heroImage: v.optional(mediaRefValidator),
  galleryImages: v.array(mediaRefValidator),
  videos: v.array(mediaRefValidator),
  externalVideoEmbeds: v.array(v.string()),
  kpis: v.array(kpiValidator),
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),
  featured: v.boolean(),
  published: v.boolean(),
  sortOrder: v.optional(v.number()),
};

// Server-side validation of required fields. Never trust the client.
function validateInput(args: { title: string; client: string; teaser: string }) {
  if (!args.title?.trim()) throw new Error("Title is required.");
  if (!args.client?.trim()) throw new Error("Client is required.");
  if (!args.teaser?.trim()) throw new Error("Teaser is required.");
}

/** Ensure slug uniqueness; append -2, -3, ... on collision. */
async function uniqueSlug(ctx: QueryCtx, base: string, ignoreId?: string) {
  let candidate = base || "case";
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await ctx.db
      .query("cases")
      .withIndex("by_slug", (q) => q.eq("slug", candidate))
      .unique();
    if (!existing || existing._id === ignoreId) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

export const create = mutation({
  args: caseInput,
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    validateInput(args);

    const now = Date.now();
    const baseSlug = slugify(args.slug?.trim() || args.title);
    const slug = await uniqueSlug(ctx, baseSlug);

    // Default new cases to the end of the list.
    let sortOrder = args.sortOrder;
    if (sortOrder === undefined) {
      const all = await ctx.db.query("cases").collect();
      sortOrder = all.reduce((max, c) => Math.max(max, c.sortOrder), 0) + 1;
    }

    const { slug: _omit, sortOrder: _omit2, ...rest } = args;
    return await ctx.db.insert("cases", {
      ...rest,
      slug,
      sortOrder,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: { id: v.id("cases"), ...caseInput },
  handler: async (ctx, { id, ...args }) => {
    await requireAdmin(ctx);
    validateInput(args);

    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Case not found.");

    const baseSlug = slugify(args.slug?.trim() || args.title);
    const slug = await uniqueSlug(ctx, baseSlug, id);

    const { slug: _omit, sortOrder, ...rest } = args;
    await ctx.db.patch(id, {
      ...rest,
      slug,
      sortOrder: sortOrder ?? existing.sortOrder,
      updatedAt: Date.now(),
    });
    return id;
  },
});

/** Toggle published state. */
export const setPublished = mutation({
  args: { id: v.id("cases"), published: v.boolean() },
  handler: async (ctx, { id, published }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, { published, updatedAt: Date.now() });
  },
});

/** Toggle featured state. */
export const setFeatured = mutation({
  args: { id: v.id("cases"), featured: v.boolean() },
  handler: async (ctx, { id, featured }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, { featured, updatedAt: Date.now() });
  },
});

/** Persist a new ordering (array of ids in desired order). */
export const reorder = mutation({
  args: { orderedIds: v.array(v.id("cases")) },
  handler: async (ctx, { orderedIds }) => {
    await requireAdmin(ctx);
    await Promise.all(
      orderedIds.map((id, index) =>
        ctx.db.patch(id, { sortOrder: index, updatedAt: Date.now() }),
      ),
    );
  },
});

/** Delete a case and clean up any owned storage files. */
export const remove = mutation({
  args: { id: v.id("cases") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    const doc = await ctx.db.get(id);
    if (!doc) return;

    const storageIds = [
      doc.thumbnailImage?.storageId,
      doc.heroImage?.storageId,
      ...doc.galleryImages.map((m) => m.storageId),
      ...doc.videos.map((m) => m.storageId),
    ].filter(Boolean) as NonNullable<MediaRef["storageId"]>[];

    await Promise.all(storageIds.map((sid) => ctx.storage.delete(sid)));
    await ctx.db.delete(id);
  },
});
