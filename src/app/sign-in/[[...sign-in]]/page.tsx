import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Anmelden | CAMO Media Admin",
  robots: { index: false, follow: false },
};

// Clerk's hosted sign-in widget. Admin authorization (email allowlist) is
// enforced AFTER sign-in by the /admin layout and every Convex mutation —
// signing in here does not by itself grant admin access.
export default function SignInPage() {
  return (
    <div className="admin-auth-wrap">
      <span className="admin-auth-wrap__brand">CAMO Media // Admin</span>
      <SignIn />
    </div>
  );
}
