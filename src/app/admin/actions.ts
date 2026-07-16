"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allow.includes(email.toLowerCase());
}

export type InviteResult = { ok: boolean; message: string };

/**
 * Send a Clerk invitation to a new admin. Only callable by a signed-in user
 * whose email is already on the ADMIN_EMAILS allowlist. Note: accepting the
 * invite creates a Clerk account, but the invitee also needs their email on
 * ADMIN_EMAILS to actually reach /admin — we surface that reminder in the UI.
 */
export async function inviteAdmin(email: string): Promise<InviteResult> {
  const { userId } = await auth();
  if (!userId) return { ok: false, message: "Nicht angemeldet." };

  const me = await currentUser();
  if (!isAdminEmail(me?.primaryEmailAddress?.emailAddress)) {
    return { ok: false, message: "Keine Admin-Berechtigung." };
  }

  const target = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(target)) {
    return { ok: false, message: "Bitte eine gültige E-Mail eingeben." };
  }

  try {
    const client = await clerkClient();
    await client.invitations.createInvitation({
      emailAddress: target,
      ignoreExisting: true,
    });
    return {
      ok: true,
      message: `Einladung an ${target} gesendet.`,
    };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Einladung fehlgeschlagen.";
    return { ok: false, message };
  }
}
