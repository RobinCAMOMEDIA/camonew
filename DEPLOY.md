# Deployment — CAMO Media Website

Next.js (App Router) + Convex (Backend/DB) + Clerk (Auth). Frontend läuft auf
**Vercel**, Backend/Datenbank auf **Convex**. Domain kann später via DNS bei
Strato auf Vercel zeigen.

---

## 1. Auf Vercel deployen

1. [vercel.com](https://vercel.com) → **Add New… → Project** → GitHub-Repo
   `robincamo/camowebsite` importieren.
2. ⚠️ **Root Directory** auf **`camo-next`** setzen (die App liegt im Unterordner).
3. Framework wird automatisch als **Next.js** erkannt. Build Command / Output
   Directory nicht ändern.
4. **Environment Variables** eintragen — die **Werte** aus `camo-next/.env.local`
   kopieren:

   | Variable | Woher |
   |---|---|
   | `NEXT_PUBLIC_CONVEX_URL` | aus `.env.local` |
   | `NEXT_PUBLIC_CONVEX_SITE_URL` | aus `.env.local` |
   | `CONVEX_DEPLOYMENT` | aus `.env.local` |
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | aus `.env.local` |
   | `CLERK_SECRET_KEY` | aus `.env.local` |
   | `NEXT_PUBLIC_CLERK_FRONTEND_API_URL` | aus `.env.local` |
   | `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
   | `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
   | `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/admin` |
   | `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/admin` |
   | `ADMIN_EMAILS` | eure Admin-E-Mail(s) |
   | `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | optional (Analytics) |

5. **Deploy** klicken → du bekommst eine `…vercel.app`-URL.

> **Clerk-Domain freigeben:** Damit das Admin-Login auf der Vercel-Domain
> funktioniert, im Clerk-Dashboard unter **Domains / Allowed origins** die
> `…vercel.app`-URL (bzw. später die echte Domain) hinzufügen.

---

## 2. Demo vs. echte offizielle Seite

**Für die Demo an den Chef** reicht der aktuelle Stand (Convex-**Dev**-Umgebung +
Clerk-**Test**-Keys). Läuft sofort.

**Für die offizielle Seite** später umstellen:

- **Convex Production:** `npx convex deploy` im `camo-next`-Ordner → eigene
  Prod-Umgebung. Deren URL bei Vercel als `NEXT_PUBLIC_CONVEX_URL` eintragen.
  Anschließend die Server-Secrets in der Prod-Umgebung setzen:
  ```bash
  npx convex env set --prod RESEND_API_KEY "re_…"
  npx convex env set --prod ADMIN_EMAILS "…"
  ```
- **Clerk Production:** im Clerk-Dashboard eine **Production Instance** anlegen
  (eigene `pk_live`/`sk_live`-Keys), die Vercel-/Echt-Domain hinterlegen, und die
  Keys bei Vercel ersetzen.

---

## 3. Eigene Domain (Strato)

Domain bleibt bei Strato, gehostet wird auf Vercel:

1. In Vercel → Project → **Settings → Domains** → eure Domain hinzufügen.
2. Vercel zeigt die nötigen DNS-Einträge (A-Record + CNAME für `www`).
3. Diese im **Strato-DNS-Panel** eintragen. Nach DNS-Propagation ist die Seite
   unter eurer Domain live (SSL macht Vercel automatisch).

---

## 4. Updates deployen

Einfach committen und pushen — Vercel deployt automatisch bei jedem Push auf
`main`:
```bash
git add -A
git commit -m "…"
git push
```

## Noch offen (DSGVO / später)

- Sitemap + 301-Redirects von den alten `.html`-URLs.
- AV-Verträge mit Convex, Resend, Vercel, Google abschließen.
- E-Mail-Adresse vereinheitlichen (`hello@camo.media` vs. `hello@camo-media.de`).
