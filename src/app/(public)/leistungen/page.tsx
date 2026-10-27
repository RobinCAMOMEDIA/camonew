import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@convex/_generated/api";
import { getConvexClient } from "@/lib/convexServer";
import type { PublicCase } from "@/lib/cases";
import { ServiceScroll, type Service, type ServiceMedia } from "@/components/leistungen/ServiceScroll";
import { ServiceReel, type ReelItem } from "@/components/leistungen/ServiceReel";
import { ProcessTimeline } from "@/components/leistungen/ProcessTimeline";
import { CatchUsButton } from "@/components/site/CatchUsButton";
import { Arrow } from "@/components/site/Arrow";
import "./leistungen.css";

export const metadata: Metadata = {
  title: "Leistungen | CAMO Media Hamburg",
  description:
    "Social Media, Content, Strategy, Websites & Apps und 3D. Für große Brands genauso wie für Restaurants, Läden und Start-ups. Culture Marketing aus Hamburg.",
};

// Revalidate so newly published cases show up in the work row (ISR).
export const revalidate = 60;

// Copy based on the live camo.media Leistungen/Agentur pages. The Brand and
// Local lines describe typical jobs at each size – scenarios, not client claims.
const SERVICES: Service[] = [
  {
    id: "social",
    title: "Social",
    lead: "Wir planen, produzieren und betreuen deine Kanäle. Mit einem Plan dahinter, nicht nur schönen Posts.",
    offer: [
      "Social Media Management",
      "Redaktionsplanung",
      "Instagram & Facebook Ads",
      "Influencer Productions",
      "Kampagnenplanung & Produktion",
      "Ad-Sets & Werbestrecken",
    ],
    brand: "eine Kampagne über alle Kanäle, mit Creators, Ads und Redaktionsplan aus einer Hand.",
    local: "ein Feed, der Lust macht vorbeizukommen: Posts, Stories und Ads für deine Nachbarschaft.",
    media: { kind: "video", src: "/assets/videos/1.mp4" },
  },
  {
    id: "content",
    title: "Content",
    lead: "Content ist die Sprache, die wir fließend sprechen. Übersetzt in die Bildsprache deiner Zielgruppe und jedes Kanals.",
    offer: ["Videoshootings", "Fotoshootings", "Produktfotografie", "Interviews", "Firmenprofile", "Events & Festivals"],
    brand: "ein Kampagnen-Dreh mit Artists, Set und eigener Crew.",
    local: "ein Drehtag für Speisekarte, Team und Location.",
    media: { kind: "video", src: "/assets/videos/5.mp4" },
  },
  {
    id: "strategy",
    title: "Strategy",
    lead: "Wir analysieren Markt und Zielgruppe und bauen ein Konzept, das festlegt, was wann wo läuft.",
    offer: ["Digital Strategy", "Digital Consulting", "Markt- & Zielgruppenanalyse", "Briefings & Reportings"],
    brand: "wie eure Marke in einer Szene mitredet, statt nur reinzurufen.",
    local: "der Weg von der Idee zur ersten eigenen Community: was, wo und wann.",
    media: { kind: "video", src: "/assets/videos/4.mp4" },
  },
  {
    id: "web",
    title: "Web & Apps",
    lead: "Webseiten und Apps im responsive Design. Schnell geladen, durchdacht und passend zu deinem Content.",
    offer: ["Webseiten", "Onlineshops", "UI/UX Design", "Apps"],
    brand: "eine Kampagnen-Microsite oder ein Shop, der aussieht wie die Kampagne.",
    local: "eine schnelle Website mit Karte, Öffnungszeiten und allem, was Gäste suchen.",
    media: { kind: "screen", src: "/assets/images/leistungen/web-camo-crew.jpg" },
  },
  {
    id: "renderings",
    title: "3D",
    lead: "Wir bringen Ideen mit 3D-Renderings zum Leben, bevor es sie in echt gibt.",
    offer: ["3D-Renderings", "Visualisierungen für Social & Kampagnen"],
    brand: "das Produkt im Rendering, bevor der Prototyp fertig ist.",
    local: "dein neuer Laden als 3D-Ansicht, bevor die erste Wand steht.",
    media: { kind: "cube" },
  },
];

// The opener reel: one tile per service, jumping to its chapter below.
// Content shows the real CAMO set photo; the rest reuse the chapter media.
const REEL_MEDIA: Record<string, ServiceMedia> = {
  social: { kind: "video", src: "/assets/videos/6.mp4" },
  content: { kind: "image", src: "/assets/images/leistungen/content.jpg", focus: "50% 45%" },
  strategy: { kind: "video", src: "/assets/videos/3.mp4" },
};

const REEL: ReelItem[] = SERVICES.map((s) => ({
  id: s.id,
  title: s.title,
  line: s.lead.split(/[.:]/)[0].trim(),
  // Different footage than the chapters below, so the opener never repeats them.
  media: REEL_MEDIA[s.id] ?? s.media,
}));

const SCALES = [
  {
    id: "brands",
    title: "Für Brands",
    image: "/assets/images/chacho1.jpg",
    items: [
      "Kampagnen & Launches über alle Kanäle",
      "Produktionen mit Artists & Creators",
      "Laufende Social-Betreuung mit Reporting",
      "Microsites & Shops zur Kampagne",
    ],
  },
  {
    id: "local",
    title: "Für Local & Start-ups",
    image: "/assets/images/stills/local-store-event.jpg",
    items: [
      "Feed & Stories für Restaurant, Laden oder Location",
      "Ein Drehtag für Karte, Team & Räume",
      "Website mit allem, was Gäste suchen",
      "Launch-Plan für die ersten Monate",
    ],
  },
];

const PROCESS = [
  { step: "We talk", text: "Jedes Projekt beginnt mit einem ausführlichen Gespräch über dich, deine Ziele und deine Leute." },
  { step: "We plan", text: "Unser Team steckt die Köpfe zusammen und plant, was wo läuft, inklusive Briefing für dich." },
  { step: "We create", text: "Time to catch moments: Dreh, Schnitt, Design. Alles mit unserem eigenen Team." },
  { step: "We ghost", text: "Spotlight auf dich. Wir posten, betreuen und optimieren aus dem Off." },
];

type WorkCase = { id: string; slug: string; client: string; title: string; image: string | null };

async function getWork(): Promise<WorkCase[]> {
  try {
    const cases = (await getConvexClient().query(api.cases.listPublished, {})) as PublicCase[];
    return [...cases]
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder)
      .filter((c) => c.thumbnailImage?.url || c.heroImage?.url)
      .slice(0, 8)
      .map((c) => ({
        id: c._id,
        slug: c.slug,
        client: c.client,
        title: c.title,
        image: c.thumbnailImage?.url ?? c.heroImage?.url ?? null,
      }));
  } catch {
    return [];
  }
}

function Dot() {
  return <span className="x-dot" aria-hidden="true" />;
}

export default async function LeistungenPage() {
  const work = await getWork();

  return (
    <div className="le">
      {/* ── Opener: statement + the five services as one reel ────────── */}
      <header className="le-hero">
        <div className="le-hero__head">
          <h1 className="le-hero__title x-wide">
            Was wir <span className="x-nowrap">machen<Dot /></span>
          </h1>
          <p className="le-hero__lead">
            Social, Content, Strategy, Web und 3D: alles aus einem Team in
            Hamburg. Für Weltmarken genauso wie für dein Restaurant oder
            Start-up um die Ecke: gleicher Anspruch, nur die Größe ändert sich.
          </p>
        </div>
        <ServiceReel items={REEL} />
      </header>

      {/* ── Services: sticky scroll ────────────────────────────────── */}
      <section className="le-services" aria-label="Unsere Leistungen">
        <ServiceScroll services={SERVICES} />
      </section>

      {/* ── Same quality, different size ───────────────────────────── */}
      <section className="le-scale" aria-labelledby="le-scale-title" data-ground="paper">
        <h2 className="x-h2" id="le-scale-title">
          Gleicher Anspruch. Andere <span className="x-nowrap">Größe<Dot /></span>
        </h2>
        <div className="le-scale__grid">
          {SCALES.map((c) => (
            <article key={c.id} className={`le-card le-card--${c.id}`} data-appear="">
              <div className="le-card__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" loading="lazy" decoding="async" />
              </div>
              <h3 className="le-card__title x-wide">
                {c.title}
                <Dot />
              </h3>
              <ul className="le-card__list">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── Selected work ──────────────────────────────────────────── */}
      {/* Only once there is real work to show (≥3 cases with images). */}
      {work.length >= 3 && (
        <section className="le-work" aria-labelledby="le-work-title">
          <div className="le-work__head">
            <h2 className="x-h2" id="le-work-title">
              Aus der <span className="x-nowrap">Praxis<Dot /></span>
            </h2>
            <Link href="/cases" className="x-more">
              <span>Alle Cases</span>
              <span className="x-more__dot" aria-hidden="true"><Arrow /></span>
            </Link>
          </div>
          <ul className="le-work__row">
            {work.map((w) => (
              <li key={w.id} className="le-work__item">
                <Link href={`/cases/${w.slug}`} className="le-work__link">
                  <div className="le-work__media">
                    {w.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={w.image} alt="" loading="lazy" decoding="async" />
                    ) : null}
                  </div>
                  <p className="le-work__client x-wide">{w.client}</p>
                  <p className="le-work__title">{w.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Process ────────────────────────────────────────────────── */}
      <section className="le-process" aria-labelledby="le-process-title">
        <div className="le-process__aside">
          <h2 className="x-h2" id="le-process-title">
            So <span className="x-nowrap">läuft&apos;s<Dot /></span>
          </h2>
          <p className="le-process__lead">
            Vom ersten Gespräch bis zum laufenden Kanal: vier Schritte, ein
            Team, keine Übergaben.
          </p>
        </div>
        <ProcessTimeline steps={PROCESS} />
      </section>

      {/* ── Close ──────────────────────────────────────────────────── */}
      <section className="le-close" aria-labelledby="le-close-title" data-ground="orange">
        <h2 className="le-close__q x-wide" id="le-close-title">
          Was brauchst du?
        </h2>
        <p className="le-close__lead">
          Kampagne, Feed oder erster Drehtag? Erzähl uns, was ansteht.
        </p>
        <div className="le-close__row">
          <CatchUsButton />
          <a href="mailto:hello@camo.media" className="le-close__mail">
            hello@camo.media
          </a>
        </div>
      </section>
    </div>
  );
}
