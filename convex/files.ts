import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib";

// ---------------------------------------------------------------------------
// Convex File Storage helpers
//
// Upload flow (kept simple & migratable):
//   1. Admin client calls `generateUploadUrl` (admin-only) -> short-lived URL.
//   2. Client POSTs the file bytes directly to that URL -> gets a storageId.
//   3. Client stores the storageId on the case document (mediaRef).
//   4. On read we resolve storageId -> public URL via `ctx.storage.getUrl`.
//
// File-type / size VALIDATION happens client-side before upload AND should be
// re-checked here conceptually; because the upload goes straight to storage,
// the authoritative guard is the admin-only upload URL + the client validation
// in `src/lib/media.ts`. If you later proxy uploads through an action you can
// inspect bytes/headers server-side too.
// ---------------------------------------------------------------------------

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

/** Resolve a single storageId to a servable URL (used by the admin preview). */
export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId);
  },
});

/** Delete an orphaned file from storage. Admin only. */
export const deleteFile = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    await requireAdmin(ctx);
    await ctx.storage.delete(storageId);
  },
});
