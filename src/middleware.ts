import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// All /admin routes (and the API used by the dashboard) require authentication.
// NOTE: This is the FIRST line of defense only. Fine-grained "is this user an
// approved admin" authorization is ALSO enforced:
//   1. in the server component `src/app/admin/layout.tsx` (email allowlist), and
//   2. inside every Convex mutation/query via `requireAdmin()`.
// Never rely on hiding pages in the client alone.
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      // Not signed in -> bounce to sign-in and come back to the requested page.
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
