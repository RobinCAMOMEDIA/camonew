import { ConvexHttpClient } from "convex/browser";

// Server-side Convex client for PUBLIC data fetching inside React Server
// Components (cases overview, case detail, home "Selected Work"). It only ever
// calls public queries that return published data, so no auth token is needed.
//
// Admin reads/writes happen on the client via the authenticated ConvexReactClient
// (see ConvexClientProvider) so the Clerk identity flows through.
export function getConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_CONVEX_URL is not set. Run `npx convex dev` and copy it into .env.local.",
    );
  }
  return new ConvexHttpClient(url);
}
