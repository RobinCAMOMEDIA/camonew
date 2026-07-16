import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { heroColumnValidator } from "./schema";
import { requireAdmin } from "./lib";

// ---------------------------------------------------------------------------
// Home hero content (CMS-managed singleton).
//
// The hero is a 3-column video grid; each column cross-fades between its slides.
// A slide = one looping video + a title (brand) + a small line of text (type).
// We store one `siteContent` row keyed "hero". When it doesn't exist yet (fresh
// deployment) we fall back to DEFAULT_HERO, which mirrors the original hardcoded
// grid using the bundled /assets/videos/*.mp4 files.
// ---------------------------------------------------------------------------

const HERO_KEY = "hero";

type HeroSlide = NonNullable<
  Doc<"siteContent">["heroColumns"]
>[number]["slides"][number];

// Default config — mirrors the original HeroVideoGrid. Videos reference the
// static files shipped in /public so the site looks right before any upload.
const DEFAULT_HERO = {
  heroSubtitle: "BASED ON A CULTURE.",
  heroColumns: [
    {
      slides: [
        { video: { url: "/assets/videos/1.mp4", kind: "video" as const }, brand: "Apple Music", type: "Social Media Campaign" },
        { video: { url: "/assets/videos/4.mp4", kind: "video" as const }, brand: "G-Shock", type: "Content Creation" },
      ],
    },
    {
      slides: [
        { video: { url: "/assets/videos/2.mp4", kind: "video" as const }, brand: "About You", type: "Influencer Marketing" },
        { video: { url: "/assets/videos/5.mp4", kind: "video" as const }, brand: "Landrover", type: "Digital Campaign" },
      ],
    },
    {
      slides: [
        { video: { url: "/assets/videos/3.mp4", kind: "video" as const }, brand: "Red Bull", type: "Event Coverage" },
        { video: { url: "/assets/videos/6.mp4", kind: "video" as const }, brand: "Nike", type: "Community Building" },
      ],
    },
  ],
};

// Resolve a slide's stored storageId into a servable URL (external urls pass
// through untouched), matching the media handling used for cases.
async function resolveSlide(ctx: QueryCtx, slide: HeroSlide) {
  let video = slide.video ? { ...slide.video, url: slide.video.url ?? null } : null;
  if (video?.storageId) {
    video = { ...video, url: await ctx.storage.getUrl(video.storageId) };
  }
  return { ...slide, video };
}

async function resolveHero(ctx: QueryCtx) {
  const doc = await ctx.db
    .query("siteContent")
    .withIndex("by_key", (q) => q.eq("key", HERO_KEY))
    .unique();
  const base = doc ?? DEFAULT_HERO;
  const columns = base.heroColumns ?? DEFAULT_HERO.heroColumns;
  const heroColumns = await Promise.all(
    columns.map(async (col) => ({
      slides: await Promise.all(col.slides.map((s) => resolveSlide(ctx, s))),
    })),
  );
  return {
    heroSubtitle: base.heroSubtitle ?? DEFAULT_HERO.heroSubtitle,
    heroColumns,
  };
}

/** Public hero content for the home page (resolved, never leaks storageIds). */
export const getHero = query({
  args: {},
  handler: async (ctx) => resolveHero(ctx),
});

/** Admin hero content for the editor (auth required; keeps refs for re-save). */
export const getHeroAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const data = await resolveHero(ctx);
    // Always expose exactly 3 columns so the editor renders a stable grid.
    const heroColumns = [...data.heroColumns];
    while (heroColumns.length < 3) heroColumns.push({ slides: [] });
    return { ...data, heroColumns: heroColumns.slice(0, 3) };
  },
});

/** Persist the full hero config (admin only). */
export const updateHero = mutation({
  args: {
    heroSubtitle: v.optional(v.string()),
    heroColumns: v.array(heroColumnValidator),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", HERO_KEY))
      .unique();
    const data = {
      key: HERO_KEY,
      heroSubtitle: args.heroSubtitle,
      heroColumns: args.heroColumns,
      updatedAt: Date.now(),
    };
    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    }
    return await ctx.db.insert("siteContent", data);
  },
});
