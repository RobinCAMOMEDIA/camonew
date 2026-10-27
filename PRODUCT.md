# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences decide whether CAMO gets booked (confirmed by the owner, 2026-10-05):

- **Marketing and brand managers at larger brands**, for example labels, fashion, sport, drinks and consumer brands. Clients shown on the site include Apple Music, Warner Music, Universal Music, G-Shock/Casio, Hoka, Zalando, Jägermeister and Land Rover. They need a partner who can make a brand feel native in youth and music culture and on social media, and they compare agencies by work, taste and credibility.
- **Local businesses in Hamburg**, such as restaurants, hotels, event locations and smaller companies, served through the CAMO Local / #LocalHeroes programme. They need affordable, effective social and content work and want to see that it pays off.

Artists and labels (CAMO Records / Catch Moments) and job applicants also visit the site but are secondary audiences.

## Product Purpose

CAMO Media is an owner-led Culture Marketing Agency from Hamburg. The website must make visitors want to work with CAMO and get in touch: it shows the work (cases), explains what CAMO does and who it is, and turns interest into an enquiry. Success means qualified enquiries from both audiences above, sent through the contact forms.

## Positioning

Everything happens **in-house**. Strategy, shoots, editing and ongoing social management come from one team, and nothing is passed on to outside service providers. The site should make that end-to-end ownership tangible rather than just claim it.

The agency's claim and voice: brands become *part of* culture, not advertising inside it ("Wir machen Marken zum Teil der Kultur").

## Operating Context

- The site is German-language (`lang="de"`) and aimed at Hamburg and the German market.
- Visitors arrive via referrals, social media (Instagram, LinkedIn) and search, often on a phone.
- Enquiries come in through the global "Catch us" contact overlay and the Records contact form. They are stored in Convex and appear in the admin under `/admin/anfragen`. Email notifications go out via Resend.
- CAMO staff maintain the content through a custom admin CMS at `/admin`:
  - cases: create, publish, sort and feature
  - case categories
  - the home showreel
  - notification recipients
  - the admin allowlist

## Capabilities and Constraints

- **Stack:** Next.js (App Router, TypeScript), Convex (data and file storage) and Clerk (admin auth), deployed on Vercel. The public pages use ISR, so new CMS content appears without a redeploy.
- **Routes:** `/` home, `/about`, `/leistungen`, `/cases` with `/cases/[slug]`, `/records`, `/jobs`, `/impressum`, `/datenschutz` and `/admin`.
- **Services (terminology):**
  - Social Media
  - Content Creation
  - Film & Photo
  - Digital Concepts
  - Culture Strategy
  - CAMO Local (#LocalHeroes, for local businesses)
- **Legal and privacy (Germany, DSGVO):**
  - consent banner; GA4 loads only after consent
  - self-hosted fonts
  - YouTube embeds use the nocookie domain
  - Impressum and Datenschutz must stay reachable from every page
  - the *.vercel.app domains are noindex
- **Media:** videos must be muted, autoplaying and unable to be downloaded or right-clicked.
- **Contact details (from the Impressum):** CAMO MEDIA, Ufuk Karatag, Wrangelstraße 100, 20253 Eimsbüttel; hello@camo.media; 040 – 22854474.
- **Open (undecided):**
  - The domain name and email are inconsistent: hello@camo.media vs. camo-media.de.
  - The final showreel is pending. The current placeholder video is another agency's work and must never ship.
  - Real case content is pending; the CMS still holds test entries.

## Brand Commitments

These are binding instructions from the owner, not suggestions:

- Name: **CAMO Media** / CAMO. The logo is the CAMO wordmark with its dot (`public/assets/images/camo.svg`, tight crop `camo-mark.svg`).
- Brand accent orange **#FF7D00** on a near-black base.
- **Dots are square, never round.** Wherever the brand typeface uses a period or dot motif, it is an orange square.
- **No serif typefaces.** A serif accent was rejected as "nicht brandkonform".
- The brand typeface in use is **Archivo**, including its expanded width. The owner likes it.
- Small "AI-looking" labels, mono eyebrows like "(01) Section", captions such as "02 Live & Events", and decorative section divider lines are unwanted.
- Voice: German, direct, a bit street, confident; no corporate filler. Words the brand uses: "Catch us", "Kultur", "Szene".

## Evidence on Hand

- **Client logos:** `public/assets/images/cases/*.png`, covering Apple Music, Warner Music, G-Shock, Hoka, Zalando, Faxe, ver.di, KIWI, Casio, CBW, Breuning, Crodo, Jägermeister, Land Rover, Universal and Weiterbildung Hamburg.
- **Case material:** G-Shock "Offstage" (`public/assets/images/cases/gshock-offstage/`) and concert photos (`chacho1.jpg`, `chacho2.jpg`).
- **Video clips:** `public/assets/videos/1.mp4`–`6.mp4`.
- **Cases in the CMS:** these are currently only test data.
- **Numbers and statistics: none confirmed.** The previously used "100+ Unternehmen" and "68 % Umsatzplus" are NOT approved. The owner will supply real figures later; until then the site shows no statistics.
- **Not available, and not to be fabricated:** testimonials, awards, press, team photos/bios and founding year.
- **Behind the scenes:** `public/assets/images/leistungen/content.png` is a real CAMO shoot (camo car, G-Shock set). The owner confirmed it on 2026-10-05: "Ja, echter CAMO-Dreh". It may be shown as genuine BTS.
- **Live-site copy:** camo.media is the source for service details. It also says "CAMO" is short for "catchmoments" and describes a four-step process: We talk / We plan / We create / We ghost. The hiphop.de 2023 award listed there must NOT be used; the owner declined it on 2026-10-05.
- The other images in `public/assets/images/` (`about_editorial_*` and the rest of `leistungen/*`) look AI-generated. Treat them as placeholders, not as evidence.

## Product Principles

1. **Show, don't claim.** Work, footage and clients carry the credibility. Copy stays short and never invents proof.
2. **In-house end to end.** Every page should make it obvious that one team handles strategy, production and social.
3. **Two doors, one agency.** Big brands and local businesses must both find their way in. CAMO Local is a first-class path, not a footnote.
4. **Culture over advertising.** The site itself should feel like part of the scene it talks about, not like a corporate agency template.
5. **Easy to say hello.** The way to an enquiry ("Catch us") is always one step away.

## Accessibility & Inclusion

- Respect `prefers-reduced-motion`. Every scroll or entry animation needs a static fallback.
- Video is decorative: muted, `aria-hidden`, and never the only carrier of information.
- Keep keyboard focus visible and text readable on the dark base; gender-inclusive German (":innen") is already in use.
