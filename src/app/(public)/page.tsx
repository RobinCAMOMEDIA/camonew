import Link from "next/link";
import { api } from "@convex/_generated/api";
import { getConvexClient } from "@/lib/convexServer";
import { HeroVideoGrid, type HeroColumn } from "@/components/HeroVideoGrid";
import { HeroScroll } from "@/components/HeroScroll";
import { HomeContact } from "@/components/HomeContact";

// Revalidate the home page periodically so newly published cases appear without
// a redeploy (ISR). Public data only.
export const revalidate = 60;

const MARQUEE_BRANDS = [
  ["applemusic", "Apple Music"],
  ["warnermusic", "Warner Music"],
  ["gshock", "G-Shock"],
  ["hoka", "Hoka"],
  ["zalando", "Zalando"],
  ["faxe", "Faxe"],
  ["verdi", "ver.di"],
  ["kiwi", "KIWI"],
  ["casio", "Casio"],
  ["cbw", "CBW"],
  ["breuning", "Breuning"],
  ["crodo", "Crodo"],
  ["jägermeister", "Jägermeister"],
  ["landrover", "Land Rover"],
  ["universal", "Universal Music"],
  ["weiterbildunghamburg", "Weiterbildung Hamburg"],
] as const;

// Fallback hero used when Convex isn't reachable yet — mirrors the defaults in
// convex/hero.ts so the grid always renders.
const FALLBACK_HERO: { heroSubtitle: string; heroColumns: HeroColumn[] } = {
  heroSubtitle: "BASED ON A CULTURE.",
  heroColumns: [
    {
      slides: [
        { videoUrl: "/assets/videos/1.mp4", brand: "Apple Music", type: "Social Media Campaign" },
        { videoUrl: "/assets/videos/4.mp4", brand: "G-Shock", type: "Content Creation" },
      ],
    },
    {
      slides: [
        { videoUrl: "/assets/videos/2.mp4", brand: "About You", type: "Influencer Marketing" },
        { videoUrl: "/assets/videos/5.mp4", brand: "Landrover", type: "Digital Campaign" },
      ],
    },
    {
      slides: [
        { videoUrl: "/assets/videos/3.mp4", brand: "Red Bull", type: "Event Coverage" },
        { videoUrl: "/assets/videos/6.mp4", brand: "Nike", type: "Community Building" },
      ],
    },
  ],
};

async function getHeroContent(): Promise<{
  heroSubtitle: string;
  heroColumns: HeroColumn[];
}> {
  try {
    const hero = await getConvexClient().query(api.hero.getHero, {});
    const heroColumns: HeroColumn[] = hero.heroColumns.map((col) => ({
      slides: col.slides.map((s) => ({
        videoUrl: s.video?.url ?? null,
        brand: s.brand,
        type: s.type,
      })),
    }));
    return { heroSubtitle: hero.heroSubtitle, heroColumns };
  } catch {
    return FALLBACK_HERO;
  }
}

export default async function HomePage() {
  const hero = await getHeroContent();

  return (
    <>
      {/* HERO */}
      <HeroScroll>
      <section className="hero" id="hero">
        <div className="hero__bg-decorations" aria-hidden="true">
          <div className="hero__bg-grid" />
          <div className="hero__glow hero__glow--1" />
          <div className="hero__glow hero__glow--2" />
          <div className="hero__watermark-vertical hero__watermark-vertical--left">
            CULTURE
          </div>
          <div className="hero__watermark-vertical hero__watermark-vertical--right">
            AGENCY
          </div>
        </div>

        <div className="hero__split">
          <div className="hero__split-text">
            <h1 className="hero__title">
              Wir sind eine
              <br />
              <span className="accent">Culture&nbsp;Marketing</span>
              <br />
              Agency<span className="square-dot" aria-hidden="true" />
            </h1>
            <p className="hero__tagline">
              Mehr als schöne Videos: Strategie, Content &amp; Kultur aus Hamburg
              – aus einer Hand.
            </p>
          </div>

          <div className="hero__split-media">
            <HeroVideoGrid columns={hero.heroColumns} />
          </div>
        </div>

        <div className="hero__scroll-indicator" aria-hidden="true">
          <span className="scroll-num">01</span>
          <div className="scroll-track">
            <div className="scroll-bead" />
          </div>
          <span className="scroll-num">02</span>
        </div>
      </section>
      </HeroScroll>

      {/* MARQUEE */}
      <div className="marquee" id="marquee" aria-label="Kunden und Partner">
        <div className="marquee__track" id="marquee-track">
          {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map(([file, alt], i) => (
            <div className="marquee__item" key={`${file}-${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/assets/images/cases/${file}.png`} alt={alt} />
            </div>
          ))}
        </div>
      </div>

      {/* VORSTELLUNG — großes Statement / Zitat */}
      <section className="statement" id="intro">
        <div className="container statement__inner reveal">
          <span className="statement__kicker">
            Culture Marketing Agency — Hamburg
          </span>
          <h2 className="statement__quote">
            Wir machen Marken zu einem{" "}
            <span className="accent">Teil der Kultur</span>. Nicht zu Werbung
            darin.
          </h2>
          <p className="statement__text">
            CAMO Media ist eine inhabergeführte Kreativagentur aus Hamburg. Wir
            denken in Communities statt Zielgruppen – und übersetzen Marken in
            Geschichten, die in Feeds, Clubs und auf der Straße funktionieren.
          </p>
        </div>
      </section>

      {/* ÜBER UNS / ANSATZ — randloses Bild, fließender Übergang */}
      <section className="approach" id="about">
        <div className="approach__grid">
          <div className="approach__text reveal-left">
            <span className="approach__label">Unser Ansatz</span>
            <h2 className="approach__title">
              Kultur zuerst.
              <br />
              Marke zweitens.
            </h2>
            <p className="approach__p">
              Wir starten nicht beim Produkt, sondern bei den Menschen: ihren
              Codes, ihrer Musik, ihren Communities. Erst wenn wir verstehen,
              was Kultur gerade bewegt, bauen wir daraus Kommunikation, die sich
              nicht wie Werbung anfühlt.
            </p>
            <p className="approach__p">
              Das Ergebnis sind Marken, die dazugehören statt zu unterbrechen –
              relevant, glaubwürdig und mittendrin.
            </p>
            <Link href="/about" className="approach__link">
              Mehr über CAMO <span className="btn__arrow">→</span>
            </Link>
          </div>
          <figure className="approach__media reveal-right" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/about_editorial_1.png" alt="" />
          </figure>
        </div>
      </section>

      {/* LEISTUNGEN + CAMO LOCAL */}
      <section className="offer" id="services">
        <div className="container">
          <div className="offer__intro reveal">
            <span className="offer__label">Was wir können</span>
            <h2 className="offer__title">
              Full-Service <span className="accent">Culture Marketing</span> —
              von der Strategie bis zum letzten Frame.
            </h2>
          </div>

          <ol className="ht-disc offer__list reveal">
            {[
              ["Social Media", "Strategie, Content & Community für Kanäle, die in der Kultur mitspielen."],
              ["Content Creation", "Reels, Kampagnen-Shoots & dokumentarische Formate, die hängen bleiben."],
              ["Digital Concepts", "Kreative Konzepte, die Kultur und Marke digital-first zusammenbringen."],
              ["Culture Strategy", "Wir übersetzen die Codes deiner Zielgruppe in echte Kommunikation."],
            ].map(([name, desc], i) => (
              <li className="ht-disc__row" key={name}>
                <span className="ht-disc__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ht-disc__name">{name}</span>
                <span className="ht-disc__desc">{desc}</span>
              </li>
            ))}
          </ol>

          <div className="offer__local reveal">
            <figure className="offer__local-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/leistungen/growth1.png" alt="" />
            </figure>
            <div className="offer__local-body">
              <span className="offer__local-tag">CAMO Local</span>
              <h3 className="offer__local-title">
                Ein Programm für lokale Pioniere.
              </h3>
              <p className="offer__local-text">
                Mit <strong>CAMO Local</strong> begleiten wir Indie-Brands,
                Newcomer und lokale Pioniere mit demselben Herzblut wie globale
                Marktführer – agile Partnerschaften statt starrer Jahresverträge.
              </p>
              <Link
                href="/leistungen"
                className="btn btn--primary offer__local-cta"
              >
                Alle Leistungen
                <span className="btn__arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAKT — Finale */}
      <HomeContact />
    </>
  );
}
