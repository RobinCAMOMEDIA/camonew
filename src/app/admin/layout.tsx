import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { getConvexClient } from "@/lib/convexServer";
import { AdminNavLinks } from "@/components/admin/AdminNavLinks";
import { AdminServicesButton } from "@/components/admin/AdminServicesButton";

export const metadata = {
  title: "Admin | CAMO Media",
  robots: { index: false, follow: false },
};

// Server-side authorization gate for the whole /admin area.
//   1. Clerk middleware already bounced unauthenticated users to /sign-in.
//   2. Here we additionally verify the signed-in user's email is an approved
//      admin (ADMIN_EMAILS seed OR the Convex `admins` table). This mirrors the
//      Convex `requireAdmin()` check, so UI and backend agree.
// The real security boundary remains every Convex mutation — never trust the UI.
function isSeedAdmin(email: string | undefined | null): boolean {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allow.includes(email.toLowerCase());
}

async function isAdmin(email: string | undefined | null): Promise<boolean> {
  if (!email) return false;
  // Seed admins are always allowed even if Convex is unreachable.
  if (isSeedAdmin(email)) return true;
  try {
    return await getConvexClient().query(api.admins.isEmailAdmin, { email });
  } catch {
    return false;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in?redirect_url=/admin");

  const email = user.primaryEmailAddress?.emailAddress;

  if (!(await isAdmin(email))) {
    return (
      <div className="admin-shell">
        <div className="admin-denied">
          <h1>Kein Zugriff</h1>
          <p>
            Dieses Konto ({email ?? "unbekannt"}) ist nicht als Admin
            freigeschaltet. Bitte melde dich mit einem autorisierten Konto an
            oder bitte einen bestehenden Admin, dich im Panel unter „Dienste
            &amp; Team" hinzuzufügen.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <Link href="/" className="admin-btn">
              Zur Website
            </Link>
            <SignOutButton>
              <button className="admin-btn admin-btn--danger">Abmelden</button>
            </SignOutButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__top">
          <Link href="/admin" className="admin-sidebar__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/camo.svg"
              alt="CAMO Media"
              className="admin-sidebar__logo"
            />
            <span className="admin-sidebar__badge">Admin</span>
          </Link>
          <nav className="admin-sidebar__nav">
            <AdminNavLinks />
          </nav>
        </div>
        <div className="admin-sidebar__bottom">
          <div className="admin-sidebar__bottom-links">
            <Link href="/" className="admin-sidebar__link" target="_blank">
              Website ↗
            </Link>
            <AdminServicesButton />
          </div>
          <div className="admin-sidebar__user">
            <UserButton afterSignOutUrl="/sign-in" />
            <span className="admin-sidebar__email">{email}</span>
          </div>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
