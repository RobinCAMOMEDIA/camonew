# CAMO Media — Next.js Rebuild

The CAMO Media marketing site (German, Hamburg-based Culture Marketing Agency)
rebuilt on **Next.js (App Router) + TypeScript**, with a protected admin CMS for
managing **Cases**. Auth is handled by **Clerk**, data + media by **Convex** and
**Convex File Storage**. The original visual design is preserved verbatim.

---

## Tech stack

| Concern        | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | Next.js 15 (App Router, RSC) + TypeScript          |
| Auth           | Clerk (`@clerk/nextjs`)                            |
| Backend / DB   | Convex (queries, mutations, indexes)               |
| Media storage  | Convex File Storage (storage-agnostic `MediaRef`)  |
| Styling        | Original CSS, preserved as `legacy.css`            |
| Rendering      | ISR (`revalidate = 60`) for public pages           |

---

## Project structure

```
camo-next/
├─ convex/                     # Backend (runs on Convex)
│  ├─ schema.ts                # cases table + reusable validators
│  ├─ cases.ts                 # public + admin queries, all mutations
│  ├─ files.ts                 # File Storage upload/getUrl/delete
│  ├─ seed.ts                  # one-click demo data importer
│  ├─ lib.ts                   # requireAdmin() + slugify()
│  └─ auth.config.ts           # Clerk JWT provider config
├─ src/
│  ├─ middleware.ts            # Clerk middleware, guards /admin
│  ├─ app/
│  │  ├─ layout.tsx            # ClerkProvider + ConvexClientProvider + fonts
│  │  ├─ legacy.css            # original design system (source of truth)
│  │  ├─ page-extras.css       # extracted inline page styles
│  │  ├─ admin.css             # admin-only styling (scoped to .admin-shell)
│  │  ├─ (public)/             # public site (route group, no /public prefix)
│  │  │  ├─ layout.tsx         # Grain + Nav + Footer + SiteInteractions
│  │  │  ├─ page.tsx           # home
│  │  │  ├─ about|leistungen|records/page.tsx
│  │  │  └─ cases/
│  │  │     ├─ page.tsx        # overview (dynamic filter)
│  │  │     └─ [slug]/page.tsx # detail (ISR, generateStaticParams, SEO)
│  │  ├─ admin/                # protected dashboard
│  │  │  ├─ layout.tsx         # server-side email allowlist gate
│  │  │  ├─ page.tsx           # dashboard + analytics placeholder
│  │  │  └─ cases/{,new,[id]/edit}/page.tsx
│  │  └─ sign-in|sign-up/      # Clerk widgets
│  ├─ components/              # shared + admin/* components
│  └─ lib/                     # cases.ts, media.ts, convexServer.ts
└─ .env.example                # copy to .env.local
```

---

## Setup

### 1. Install

```bash
cd camo-next
npm install
```

### 2. Convex

```bash
npx convex dev
```

This provisions a dev deployment, generates `convex/_generated/*` (required for
the app to type-check / build), and prints your `NEXT_PUBLIC_CONVEX_URL`.

### 3. Clerk

1. Create an app at <https://clerk.com>.
2. Copy the **Publishable** and **Secret** keys.
3. Create a **JWT template named `convex`** (Clerk → JWT Templates). Note the
   **Frontend API URL** (issuer).

### 4. Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_CONVEX_URL` | client | Convex deployment URL (from `convex dev`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | client | Clerk publishable key |
| `CLERK_SECRET_KEY` | **server only** | Clerk secret key |
| `NEXT_PUBLIC_CLERK_FRONTEND_API_URL` | client | Clerk issuer (for Convex JWT validation) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `..._SIGN_UP_URL` | client | `/sign-in`, `/sign-up` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | client | `/admin` |
| `ADMIN_EMAILS` | **server + Convex** | comma-separated admin allowlist |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | client | GA4 tag (placeholder, optional) |
| `GA4_PROPERTY_ID`, `GOOGLE_APPLICATION_CREDENTIALS_JSON` | **server only** | GA Data API (placeholder) |

Set the admin allowlist on Convex too (this is the real authorization boundary):

```bash
npx convex env set ADMIN_EMAILS "you@example.com,team@example.com"
npx convex env set CLERK_FRONTEND_API_URL "https://your-app.clerk.accounts.dev"
```

### 5. Run

```bash
npm run dev          # Next.js (terminal 1)
npx convex dev       # Convex sync (terminal 2)
```

Open <http://localhost:3000>. Sign in at `/admin` with an allowlisted email,
then click **“Demo-Cases importieren”** to load the original 8 cases (or run
`npx convex run seed:seedCases`).

---

## Authorization model

Defense in depth — three independent layers:

1. **Middleware** (`src/middleware.ts`) redirects unauthenticated users away
   from `/admin`.
2. **Admin layout** (`src/app/admin/layout.tsx`) verifies the signed-in user's
   email is in `ADMIN_EMAILS`; otherwise renders a “no access” screen.
3. **Convex `requireAdmin()`** runs at the top of **every** create / update /
   publish / reorder / delete / upload mutation. This is the authoritative
   check — the UI is never trusted.

Public queries (`listPublished`, `getPublishedBySlug`, …) never return drafts.

---

## Media

- Uploads go directly to Convex File Storage via a short-lived, admin-only
  upload URL. Client-side validation (`src/lib/media.ts`) restricts type/size
  (images: JPG/PNG/WebP/AVIF ≤ 8 MB; video: MP4/WebM/MOV ≤ 100 MB).
- Cases store a storage-agnostic `MediaRef` (`storageId` preferred). URLs are
  re-minted on read, so a later move to Cloudinary / Vercel Blob only requires
  changing `uploadFile()` + the resolver in `convex/cases.ts`.
- Public images use `next/image` (lazy, responsive). Remote patterns for
  `*.convex.cloud` / `*.convex.site` are configured in `next.config.ts`.

---

## Analytics (placeholder)

`/admin` shows a static Analytics panel (visitors, pageviews, top pages, top
case pages, avg. session, traffic sources, CTA clicks, realtime). To make it
real, wire it to the **GA4 Data API** from a server context only (Convex action
or route handler) using `GA4_PROPERTY_ID` + `GOOGLE_APPLICATION_CREDENTIALS_JSON`
— **never expose those to the browser**. See comments in
`src/components/admin/AnalyticsPlaceholder.tsx` and the `analyticsSnapshots`
table in `convex/schema.ts`.

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint |
| `npx convex dev` | Convex codegen + live sync |
| `npx convex run seed:seedCases` | Import demo cases |
```
