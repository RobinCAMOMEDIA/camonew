import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { mediaRefValidator } from "./schema";
import { requireAdmin } from "./lib";

// ---------------------------------------------------------------------------
// Home hero content (CMS-managed singleton).
//
// The hero is a full-bleed video WALL with a fixed headline overlaid. Each
// "slot" is one column of the wall and cross-fades through its list of videos
// (like the previous hero, minus titles/labels). Stored as `heroSlots` on the
// `siteContent` row keyed "hero"; falls back to DEFAULT_HERO_SLOTS otherwise.
// ---------------------------------------------------------------------------

const HERO_KEY = "hero";

type MediaRef = { storageId?: string; url?: string; kind: "image" | "video" };
type Slot = { videos: MediaRef[] };

// 4 columns; a couple cycle through 2 clips so the wall feels alive by default.
const DEFAULT_HERO_SLOTS: Slot[] = [
  { videos: [{ url: "/assets/videos/1.mp4", kind: "video" }, { url: "/assets/videos/5.mp4", kind: "video" }] },
  { videos: [{ url: "/assets/videos/2.mp4", kind: "video" }, { url: "/assets/videos/6.mp4", kind: "video" }] },
  { videos: [{ url: "/assets/videos/3.mp4", kind: "video" }] },
  { videos: [{ url: "/assets/videos/4.mp4", kind: "video" }] },
];

// Placeholder showreel bundled in /public until a real one is uploaded.
const DEFAULT_SHOWREEL: MediaRef = {
  url: "/assets/videos/showreel.mp4",
  kind: "video",
};

async function resolveVideo(ctx: QueryCtx, ref: MediaRef) {
  let url = ref.url ?? null;
  if (ref.storageId) url = await ctx.storage.getUrl(ref.storageId);
  return { ...ref, url };
}

async function resolveHero(ctx: QueryCtx) {
  const doc = await ctx.db
    .query("siteContent")
    .withIndex("by_key", (q) => q.eq("key", HERO_KEY))
    .unique();
  const list =
    doc?.heroSlots && doc.heroSlots.length > 0
      ? (doc.heroSlots as Slot[])
      : DEFAULT_HERO_SLOTS;
  const slots = await Promise.all(
    list.map(async (slot) => ({
      videos: await Promise.all((slot.videos ?? []).map((r) => resolveVideo(ctx, r))),
    })),
  );
  // Current design: one full-bleed showreel. `isDefault` tells the admin editor
  // whether a custom upload exists or the bundled placeholder is in use.
  const custom = doc?.heroShowreel as MediaRef | undefined;
  const showreel = custom
    ? { ...(await resolveVideo(ctx, custom)), isDefault: false }
    : { ...DEFAULT_SHOWREEL, url: DEFAULT_SHOWREEL.url ?? null, isDefault: true };
  return { slots, showreel };
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
    return await resolveHero(ctx);
  },
});

/** Persist the hero slots (admin only). */
export const updateHero = mutation({
  args: {
    heroSlots: v.array(v.object({ videos: v.array(mediaRefValidator) })),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", HERO_KEY))
      .unique();
    const data = {
      key: HERO_KEY,
      heroSlots: args.heroSlots,
      updatedAt: Date.now(),
    };
    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    }
    return await ctx.db.insert("siteContent", data);
  },
});

/** Set (or clear → placeholder) the home hero showreel video (admin only). */
export const updateShowreel = mutation({
  args: { showreel: v.optional(mediaRefValidator) },
  handler: async (ctx, { showreel }) => {
    await requireAdmin(ctx);
    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", HERO_KEY))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, {
        heroShowreel: showreel,
        updatedAt: Date.now(),
      });
      return existing._id;
    }
    return await ctx.db.insert("siteContent", {
      key: HERO_KEY,
      heroShowreel: showreel,
      updatedAt: Date.now(),
    });
  },
});
