import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib";

// ---------------------------------------------------------------------------
// Case categories (CMS-managed singleton).
//
// The categories power the dropdown in the case editor and the filter bar on
// the public /cases page. They live in one `siteContent` row keyed "categories".
// When the row doesn't exist yet we fall back to DEFAULT_CATEGORIES, mirroring
// the original hardcoded set so nothing changes until an admin edits them.
// ---------------------------------------------------------------------------

const CATEGORIES_KEY = "categories";

export const DEFAULT_CATEGORIES = [
  { value: "social", label: "Social Media" },
  { value: "content", label: "Content Creation" },
  { value: "digital", label: "Digital Concepts" },
  { value: "strategy", label: "Strategy" },
];

const categoryValidator = v.object({ value: v.string(), label: v.string() });

async function readCategories(ctx: QueryCtx) {
  const doc = await ctx.db
    .query("siteContent")
    .withIndex("by_key", (q) => q.eq("key", CATEGORIES_KEY))
    .unique();
  const cats = doc?.categories;
  return cats && cats.length > 0 ? cats : DEFAULT_CATEGORIES;
}

/** Public list for the case form dropdown and the public filter bar. */
export const getCategories = query({
  args: {},
  handler: async (ctx) => readCategories(ctx),
});

/** Admin list for the manager (auth required). */
export const getCategoriesAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return readCategories(ctx);
  },
});

/** Persist the full category list (admin only). */
export const updateCategories = mutation({
  args: { categories: v.array(categoryValidator) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    // Normalise: trim, drop empties, slugify missing values, dedupe by value.
    const seen = new Set<string>();
    const categories = args.categories
      .map((c) => {
        const label = c.label.trim();
        const value = (c.value.trim() || label)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        return { value, label };
      })
      .filter((c) => c.label && c.value)
      .filter((c) => (seen.has(c.value) ? false : (seen.add(c.value), true)));

    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", CATEGORIES_KEY))
      .unique();
    const data = { key: CATEGORIES_KEY, categories, updatedAt: Date.now() };
    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    }
    return await ctx.db.insert("siteContent", data);
  },
});
