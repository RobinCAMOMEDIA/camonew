import type { Metadata } from "next";
import { CatchUsButton } from "@/components/site/CatchUsButton";
import { Clip } from "@/components/site/Clip";
import { BRANDS } from "@/lib/brands";
import "./about.css";

export const metadata: Metadata = {
  title: "Agentur | CAMO Media Hamburg",
  description:
    "CAMO steht für Catch Moments. Wer wir sind, woher wir kommen und warum wir alles selbst machen. Culture Marketing Agency aus Hamburg.",
};

// ---------------------------------------------------------------------------
// ABOUT — a plain, readable agency page, no scroll-driven staging:
// photo opener · one sentence with a swapping word · where we come from
// (founder + facts) · everything in-house · what we believe (paper band) ·
// crew · who we work with · orange close.
// Facts come from the owner's own copy (see /records); nothing invented.
// ---------------------------------------------------------------------------

// The word that keeps changing in the statement (CSS cycles through them).
const PLACES = ["in die Szene", "auf die Bühne", "in den Feed", "auf die Straße"];

const FACTS = [
  { value: "2002", text: "Hip-Hop gab den Rhythmus vor, seitdem sind wir dabei." },
  { value: "20+", text: "Jahre Musikindustrie hinter unserem Gründer Ufuk Karatag." },
  { value: "100+", text: "Liveshows, dazu Festivals, Songs und Brand-Kooperationen." },
];

const IN_HOUSE = [
  { step: "Strategie", text: "Zielgruppe, Szene, Idee. Bevor eine Kamera läuft.", video: "/assets/videos/5.mp4" },
  { step: "Dreh", text: "Unsere Leute hinter der Kamera, am Set, auf der Bühne.", video: "/assets/videos/1.mp4" },
  { step: "Schnitt", text: "Formate für jeden Kanal, im eigenen Schnitt.", video: "/assets/videos/6.mp4" },
  { step: "Social", text: "Posten, betreuen, auswerten und weiterdrehen.", video: "/assets/videos/4.mp4" },
];

const BELIEFS = [
  { title: "Echt statt laut", text: "Menschen folgen Szenen, Artists und Creators, nicht Marken. Also reden wir wie die Szene, nicht wie Werbung." },
  { title: "Szene vor Reichweite", text: "Lieber die richtigen tausend Leute als eine Million, denen es egal ist." },
  { title: "Momente statt Masse", text: "Ein Moment, über den man spricht, schlägt zehn Posts, die keiner merkt." },
];

// Crew wall: real behind-the-scenes material until the team photos arrive.
const CREW = [
  { src: "/assets/images/leistungen/content.jpg", shape: "wide", alt: "CAMO am Set beim Dreh mit dem Camo-Auto" },
  { src: "/assets/images/stills/crew-backstage.jpg", shape: "tall", alt: "Crew backstage" },
  { src: "/assets/images/records/still-crew.jpg", shape: "square", alt: "Dreh zum Musikvideo" },
  { src: "/assets/videos/3.mp4", shape: "square", alt: "" },
];

function Dot() {
  return <span className="x-dot" aria-hidden="true" />;
}

export default function AboutPage() {
  return (
    <div className="ab">
      {/* ── Opener: the storefront, the name ──────────────────────── */}
      <header className="ab-open">
        <div className="ab-open__text">
          <h1 className="ab-open__title x-wide">
            Catch <span className="x-nowrap">Moments<Dot /></span>
          </h1>
          <p className="ab-open__lead">
            Dafür steht CAMO. Das ist unser Name und unser Job: die Momente
            einfangen, die eine Szene ausmachen, und Marken zu einem Teil
            davon machen. Aus Hamburg, aus der Szene.
          </p>
        </div>
        <figure className="ab-open__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/about/storefront.jpg"
            alt="Das CAMO-Schild wird über dem Eingang in der Wrangelstraße montiert"
            decoding="async"
          />
        </figure>
      </header>

      {/* ── One sentence, one swapping word ───────────────────────── */}
      <section className="ab-say" aria-label="Was wir tun">
        <p className="ab-say__text x-wide" data-appear="">
          Wir bringen Marken{" "}
          <span className="ab-say__swap" aria-hidden="true">
            {PLACES.map((p, i) => (
              <span key={p} style={{ "--k": i } as React.CSSProperties}>{p}</span>
            ))}
          </span>
          <span className="x-sr">{PLACES.join(", ")}</span>
          <br />
          und nicht nur in die <span className="x-nowrap">Werbepause<Dot /></span>
        </p>
      </section>

      {/* ── Where we come from ────────────────────────────────────── */}
      <section className="ab-root" aria-labelledby="ab-root-title">
        <div className="ab-root__head">
          <h2 className="x-h2" id="ab-root-title" data-appear="">
            Aus der Musik <span className="x-nowrap">gewachsen<Dot /></span>
          </h2>
          <p className="ab-root__lead" data-appear="" style={{ "--d": 120 } as React.CSSProperties}>
            Bei uns gab die Musik den Rhythmus vor und brachte alles andere mit.
            Aus Liveshows wurde ein Label mit eigenem Studio, Catchmoments
            Records, und daraus die Agentur: Strategie, Content und Social aus
            einem Team.
          </p>
        </div>
        <ul className="ab-facts">
          {FACTS.map((f, i) => (
            <li key={f.value} className="ab-fact" data-appear="" style={{ "--d": i * 100 } as React.CSSProperties}>
              <span className="ab-fact__value x-wide">{f.value}</span>
              <span className="ab-fact__text">{f.text}</span>
            </li>
          ))}
        </ul>
        <p className="ab-root__acts" data-appear="">
          Gearbeitet mit Mortel &amp; Sido, Bonez MC, Haftbefehl, Nimo und OG Keemo.
        </p>
      </section>

      {/* ── Everything in-house ───────────────────────────────────── */}
      <section className="ab-house" aria-labelledby="ab-house-title">
        <div className="ab-house__head">
          <h2 className="x-h2" id="ab-house-title" data-appear="">
            Alles aus einem <span className="x-nowrap">Haus<Dot /></span>
          </h2>
          <p className="ab-house__lead" data-appear="" style={{ "--d": 120 } as React.CSSProperties}>
            Kultur verträgt keine Übergabe. Ein Team, ein Gefühl, vom ersten
            Gedanken bis zum Kommentar unter dem Post.
          </p>
        </div>
        <ol className="ab-house__chain">
          {IN_HOUSE.map((s, i) => (
            <li key={s.step} className="ab-link" data-appear="" style={{ "--d": i * 110 } as React.CSSProperties}>
              <div className="ab-link__media">
                <Clip src={s.video} />
              </div>
              <h3 className="ab-link__step x-wide">
                {s.step}
                <Dot />
              </h3>
              <p className="ab-link__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── What we believe: the one paper band ───────────────────── */}
      <section className="ab-believe" data-ground="paper" aria-labelledby="ab-believe-title">
        <h2 className="x-h2" id="ab-believe-title" data-appear="">
          Woran wir <span className="x-nowrap">glauben<Dot /></span>
        </h2>
        <ul className="ab-believe__list">
          {BELIEFS.map((b, i) => (
            <li key={b.title} className="ab-belief" data-appear="" style={{ "--d": i * 100 } as React.CSSProperties}>
              <h3 className="ab-belief__title x-wide">
                {b.title}
                <Dot />
              </h3>
              <p className="ab-belief__text">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── The crew ──────────────────────────────────────────────── */}
      <section className="ab-crew" aria-labelledby="ab-crew-title">
        <div className="ab-crew__head">
          <h2 className="x-h2" id="ab-crew-title" data-appear="">
            Wer wir <span className="x-nowrap">sind<Dot /></span>
          </h2>
          <p className="ab-crew__lead" data-appear="" style={{ "--d": 120 } as React.CSSProperties}>
            Kreative, Fotograf:innen, Videograf:innen und Strateg:innen aus
            Hamburg. Wach, wenn die Stadt schläft. Nicht weil wir müssen,
            sondern weil wir es fühlen.
          </p>
        </div>
        <ul className="ab-crew__wall">
          {CREW.map((c) => (
            <li key={c.src} className={`ab-crew__item ab-crew__item--${c.shape}`} data-appear="">
              {c.src.endsWith(".mp4") ? (
                <Clip src={c.src} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Who we work with ──────────────────────────────────────── */}
      <section className="ab-clients" aria-labelledby="ab-clients-title">
        <h2 className="x-h2" id="ab-clients-title" data-appear="">
          Mit wem wir <span className="x-nowrap">arbeiten<Dot /></span>
        </h2>
        <ul className="ab-clients__grid">
          {BRANDS.map(([file, alt, ar, boost = 1]) => (
            <li key={file} className="ab-clients__item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/assets/images/cases/${file}.png`}
                alt={alt}
                style={{ "--s": (Math.sqrt(ar) * boost).toFixed(3) } as React.CSSProperties}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ── Close ─────────────────────────────────────────────────── */}
      <section className="ab-close" aria-labelledby="ab-close-title" data-ground="orange">
        <h2 className="x-h2" id="ab-close-title">
          Catch the <span className="x-nowrap">moment<Dot /></span>
        </h2>
        <p className="ab-close__lead">Erzähl uns, was ansteht. Wir melden uns.</p>
        <div className="ab-close__row">
          <CatchUsButton />
          <a href="mailto:hello@camo.media" className="ab-close__mail">
            hello@camo.media
          </a>
        </div>
      </section>
    </div>
  );
}
