import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { isBootstrapAdmin, isAdminEmail, requireAdmin } from "./lib";

// ---------------------------------------------------------------------------
// Runtime-managed admin allowlist.
//
// The ADMIN_EMAILS env var remains a permanent bootstrap seed (you can never
// lock yourself out). Everyone invited from the admin panel is stored in the
// `admins` table, so adding a colleague no longer needs a redeploy.
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Public boolean check used by the /admin layout gate to decide whether to show
 * the panel. The real security boundary is requireAdmin() on every mutation;
 * this only toggles UI, so a plain email -> bool lookup is acceptable.
 */
export const isEmailAdmin = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => isAdminEmail(ctx, email),
});

/** Full admin list for the management UI (bootstrap seeds + invited rows). */
export const listAdmins = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const seeds = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
      .map((email) => ({ email, bootstrap: true, addedAt: null as number | null }));

    const rows = await ctx.db.query("admins").collect();
    const invited = rows
      // Hide rows that are also bootstrap seeds to avoid duplicates.
      .filter((r) => !isBootstrapAdmin(r.email))
      .map((r) => ({ email: r.email, bootstrap: false, addedAt: r.addedAt }));

    return [...seeds, ...invited];
  },
});

/** Add an email to the runtime allowlist (idempotent). */
export const addAdmin = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const me = await requireAdmin(ctx);
    const normalized = email.trim().toLowerCase();
    if (!EMAIL_RE.test(normalized)) {
      throw new Error("Bitte eine gültige E-Mail eingeben.");
    }
    if (isBootstrapAdmin(normalized)) {
      // Already a permanent seed admin — nothing to store.
      return null;
    }
    const existing = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", normalized))
      .unique();
    if (existing) return existing._id;

    return await ctx.db.insert("admins", {
      email: normalized,
      addedAt: Date.now(),
      addedBy: me.email ?? undefined,
    });
  },
});

/** Remove an invited admin. Bootstrap seeds (env var) cannot be removed here. */
export const removeAdmin = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    await requireAdmin(ctx);
    const normalized = email.trim().toLowerCase();
    if (isBootstrapAdmin(normalized)) {
      throw new Error(
        "Dieser Admin ist über ADMIN_EMAILS fest hinterlegt und kann hier nicht entfernt werden.",
      );
    }
    const row = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", normalized))
      .unique();
    if (row) await ctx.db.delete(row._id);
    return null;
  },
});
