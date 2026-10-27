# CAMO Website (camo-next)

Next.js App Router + Convex + Clerk. German marketing site for CAMO Media.

## Before any UI work
- Read `BRANDGUIDE.md`. Its rules are binding (tokens, type scale, spacing, shapes, content truth).
- Reuse the tokens and components in `src/app/site.css` and `src/components/site/`. Never hard-code colours, font sizes or section spacing.
- After changes, run `npm run brand:check` (must report 0 errors) and `npx tsc --noEmit`.
- Product truth: `PRODUCT.md`. Full design system: `DESIGN.md`.

## Don't
- Don't touch `convex/` unless the task is about the backend. Cases, hero media, categories and contact submissions are CMS data.
- Don't ship `public/assets/videos/showreel.mp4`. It is another agency's placeholder, still referenced as a fallback in `convex/hero.ts` and the home page.
- Don't commit or deploy without asking.
