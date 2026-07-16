// Convex authentication config.
//
// This tells Convex how to validate the JWTs that Clerk issues. You must create
// a Clerk JWT template named "convex" (Clerk Dashboard -> JWT Templates ->
// "Convex" preset) and set the Convex env var CLERK_FRONTEND_API_URL to your
// Clerk Frontend API URL (the issuer / "Issuer" of that template), e.g.
//   npx convex env set CLERK_FRONTEND_API_URL https://your-app.clerk.accounts.dev
//
// The `applicationID` MUST match the template name ("convex").
export default {
  providers: [
    {
      domain: process.env.CLERK_FRONTEND_API_URL,
      applicationID: "convex",
    },
  ],
};
