import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Registrieren | CAMO Media Admin",
  robots: { index: false, follow: false },
};

// Sign-up is provided for completeness. Creating an account does NOT grant admin
// access — the email must additionally be present in ADMIN_EMAILS (enforced in
// the /admin layout and in every Convex mutation via requireAdmin()).
export default function SignUpPage() {
  return (
    <div className="admin-auth-wrap">
      <span className="admin-auth-wrap__brand">CAMO Media // Admin</span>
      <SignUp />
    </div>
  );
}
