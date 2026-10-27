import {
  mutation,
  query,
  internalAction,
  internalQuery,
  QueryCtx,
  MutationCtx,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { requireAdmin } from "./lib";

// Who gets emailed on a new submission. Managed from the admin panel
// (/admin/anfragen) and stored in the siteContent singleton key="notifications".
// Falls back to this default so notifications always reach someone.
const NOTIFY_KEY = "notifications";
const DEFAULT_NOTIFY = ["robin@camo-media.de"];

async function readNotifyEmails(
  ctx: QueryCtx | MutationCtx,
): Promise<string[]> {
  const row = await ctx.db
    .query("siteContent")
    .withIndex("by_key", (q) => q.eq("key", NOTIFY_KEY))
    .unique();
  const list = row?.notifyEmails ?? [];
  return list.length > 0 ? list : DEFAULT_NOTIFY;
}

// ---------------------------------------------------------------------------
// Contact form submissions.
//
// Public `submit` stores the message in Convex (so it shows up in the admin
// panel) and schedules an internal action that emails a notification via
// Resend. The email step is optional: if RESEND_API_KEY / CONTACT_NOTIFY_EMAIL
// aren't set, the submission is still saved and the email is simply skipped.
//
// To turn on email notifications, set these Convex env vars:
//   npx convex env set RESEND_API_KEY "re_..."
//   npx convex env set CONTACT_NOTIFY_EMAIL "hello@camo.media"
//   npx convex env set RESEND_FROM_EMAIL "CAMO Website <noreply@deine-domain.de>"  (optional)
// ---------------------------------------------------------------------------

const MAX = { name: 200, email: 320, subject: 160, message: 5000, source: 40 };
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Human-readable labels for where a submission came from.
const SOURCE_LABELS: Record<string, string> = {
  overlay: "Catch Us Formular",
  records: "Catch Moments Formular",
  home: "Startseite (Satz-Formular)",
};
const sourceLabel = (s: string) => SOURCE_LABELS[s] ?? s;

/** Public: store a contact submission and fire an (optional) email notice. */
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.optional(v.string()),
    subject: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim().slice(0, MAX.name);
    const email = args.email.trim().slice(0, MAX.email);
    const message = (args.message ?? "").trim().slice(0, MAX.message);
    const subject = args.subject?.trim().slice(0, MAX.subject) || undefined;
    const source = (args.source ?? "website").trim().slice(0, MAX.source) || "website";

    if (!name || !email) {
      throw new Error("Bitte Name und E-Mail ausfüllen.");
    }
    if (!EMAIL_RE.test(email)) {
      throw new Error("Bitte eine gültige E-Mail-Adresse angeben.");
    }

    const id = await ctx.db.insert("contactSubmissions", {
      name,
      email,
      message,
      subject,
      source,
      read: false,
      createdAt: Date.now(),
    });

    // Fire-and-forget email notification (no-op if Resend isn't configured).
    await ctx.scheduler.runAfter(0, internal.contact.sendNotification, {
      name,
      email,
      message,
      subject,
      source,
    });

    return { ok: true, id };
  },
});

/** Internal: send the notification email via Resend, if configured. */
export const sendNotification = internalAction({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    subject: v.optional(v.string()),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    // Recipients come from the admin-managed list (DB), defaulting to robin@.
    const to = await ctx.runQuery(internal.contact.notifyRecipientsInternal, {});
    // Resend's shared sandbox sender works without verifying a domain first.
    const from = process.env.RESEND_FROM_EMAIL ?? "CAMO Website <onboarding@resend.dev>";

    if (!apiKey || to.length === 0) {
      console.log(
        "[contact] Resend not configured (RESEND_API_KEY missing or no recipients) — submission saved, email skipped.",
      );
      return;
    }

    const esc = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const subjectLine = `Neue Anfrage von ${args.name}${
      args.subject ? ` · ${args.subject}` : ""
    }`;
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
        <h2 style="margin:0 0 4px">Neue Kontaktanfrage</h2>
        <p style="margin:0 0 16px;color:#666">Quelle: ${esc(sourceLabel(args.source))}</p>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#666;width:120px">Name</td><td style="padding:6px 0"><strong>${esc(args.name)}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#666">E-Mail</td><td style="padding:6px 0"><a href="mailto:${esc(args.email)}">${esc(args.email)}</a></td></tr>
          ${args.subject ? `<tr><td style="padding:6px 0;color:#666">Betreff</td><td style="padding:6px 0">${esc(args.subject)}</td></tr>` : ""}
        </table>
        ${
          args.message
            ? `<p style="margin:16px 0 6px;color:#666">Nachricht</p><div style="padding:14px 16px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap">${esc(args.message)}</div>`
            : ""
        }
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: args.email,
        subject: subjectLine,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
    } else {
      console.log("[contact] Resend email sent to", to.join(", "));
    }
  },
});

// --- Notification recipients ----------------------------------------------

/** Internal: recipient list for the email action (no auth — server only). */
export const notifyRecipientsInternal = internalQuery({
  args: {},
  handler: async (ctx) => readNotifyEmails(ctx),
});

/** Admin: read the current notification recipient list. */
export const getNotifyRecipients = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await readNotifyEmails(ctx);
  },
});

/** Admin: replace the notification recipient list (normalised + deduped). */
export const setNotifyRecipients = mutation({
  args: { emails: v.array(v.string()) },
  handler: async (ctx, { emails }) => {
    await requireAdmin(ctx);
    const clean = Array.from(
      new Set(
        emails
          .map((e) => e.trim().toLowerCase())
          .filter((e) => EMAIL_RE.test(e)),
      ),
    );
    const row = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", NOTIFY_KEY))
      .unique();
    if (row) {
      await ctx.db.patch(row._id, { notifyEmails: clean, updatedAt: Date.now() });
    } else {
      await ctx.db.insert("siteContent", {
        key: NOTIFY_KEY,
        notifyEmails: clean,
        updatedAt: Date.now(),
      });
    }
    return { ok: true, count: clean.length };
  },
});

// --- Admin (submissions) --------------------------------------------------

/** Admin: all submissions, newest first. */
export const listAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

/** Admin: number of unread submissions (for a nav badge). */
export const unreadCount = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const unread = await ctx.db
      .query("contactSubmissions")
      .withIndex("by_read", (q) => q.eq("read", false))
      .collect();
    return unread.length;
  },
});

/** Admin: mark a submission read/unread. */
export const setRead = mutation({
  args: { id: v.id("contactSubmissions"), read: v.boolean() },
  handler: async (ctx, { id, read }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, { read });
  },
});

/** Admin: delete a submission. */
export const remove = mutation({
  args: { id: v.id("contactSubmissions") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
  },
});
