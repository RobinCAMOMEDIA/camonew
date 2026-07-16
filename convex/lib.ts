import { QueryCtx, MutationCtx } from "./_generated/server";

/**
 * Server-side admin authorization. Call this at the top of EVERY mutation/query
 * that creates, updates, deletes, publishes, reorders or uploads. This is the
 * real security boundary — the Clerk middleware and hidden UI are conveniences,
 * not guarantees.
 *
 * Authorization model (email allowlist, two sources):
 *  - The user must be authenticated (a valid Clerk JWT reached Convex).
 *  - Their verified email must be EITHER in the ADMIN_EMAILS Convex env var
 *    (the permanent bootstrap seed, comma-separated) OR in the `admins` table
 *    (managed at runtime from the admin panel). Set the seed with:
 *      npx convex env set ADMIN_EMAILS "you@example.com"
 *
 * To upgrade to role-based auth later, add a Clerk JWT claim (e.g. `role`) to
 * the "convex" template and check `identity.role === "admin"` here instead.
 */

/** True if `email` is a bootstrap (env-seeded) admin. */
export function isBootstrapAdmin(email: string): boolean {
  const allowList = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email) && allowList.includes(email.toLowerCase());
}

/** True if `email` is allowed (bootstrap seed OR in the `admins` table). */
export async function isAdminEmail(
  ctx: QueryCtx | MutationCtx,
  email: string,
): Promise<boolean> {
  const normalized = email.toLowerCase();
  if (!normalized) return false;
  if (isBootstrapAdmin(normalized)) return true;
  const row = await ctx.db
    .query("admins")
    .withIndex("by_email", (q) => q.eq("email", normalized))
    .unique();
  return Boolean(row);
}

export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated.");
  }

  const email = (identity.email ?? "").toLowerCase();
  if (!(await isAdminEmail(ctx, email))) {
    throw new Error("Not authorized: this account is not an approved admin.");
  }

  return identity;
}

/** Basic, dependency-free slugify. Mirrors the client helper for consistency. */
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
