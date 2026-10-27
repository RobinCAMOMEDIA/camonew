import type { Metadata } from "next";
import { NameSplit } from "@/components/about/NameSplit";
import { CatchUsButton } from "@/components/site/CatchUsButton";
import { Clip } from "@/components/site/Clip";
import "./about.css";

export const metadata: Metadata = {
  title: "Agentur | CAMO Media Hamburg",
  description:
    "CAMO steht für Catch Moments. Wer wir sind, woher wir kommen und warum wir alles selbst machen. Culture Marketing Agency aus Hamburg.",
};

// What stands behind the agency. Facts from the owner's own copy on /records;
// no invented dates or sequence, no photos that could pass for the founder.
const ROUTE = [
  {
    title: "Hip-Hop seit 2002",
    text: "Bei uns gab die Musik den Rhythmus vor. Alles andere kam mit ihr.",
    image: "/assets/images/records/still-floor.jpg",
    focus: "50% 40%",
  },
  {
    title: "Bühne & Studio",
    text: "Über 100 Liveshows, Festivals, Songs und Brand-Kooperationen. Mit Mortel & Sido, Bonez MC, Haftbefehl, Nimo und OG Keemo.",
    image: "/assets/images/musichero.jpg",
    focus: "45% 50%",
  },
  {
    title: "Catchmoments Records",
    text: "Unser Label mit eigenem Studio in Hamburg, von der Song-Idee bis zum Mastering.",
    image: "/assets/images/catchmomentsrecords.png",
    focus: "50% 50%",
    stamp: true,
  },
  {
    title: "CAMO Media",
    text: "Die Agentur: Strategie, Content und Social aus einem Team, für Brands und für Läden um die Ecke.",
    image: "/assets/images/leistungen/content.jpg",
    focus: "50% 45%",
  },
];

const IN_HOUSE = [
  { step: "Strategie", text: "Zielgruppe, Szene, Idee. Bevor eine Kamera läuft.", video: "/assets/videos/5.mp4" },
  { step: "Dreh", text: "Unsere Leute hinter der Kamera, am Set, auf der Bühne.", video: "/assets/videos/1.mp4" },
  { step: "Schnitt", text: "Formate für jeden Kanal, im eigenen Schnitt.", video: "/assets/videos/6.mp4" },
  { step: "Social", text: "Posten, betreuen, auswerten und weiterdrehen.", video: "/assets/videos/4.mp4" },
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
      {/* ── The name opens up ─────────────────────────────────────── */}
      <NameSplit
        image="/assets/images/about/storefront.jpg"
        imageAlt="Das CAMO-Schild wird über dem Eingang in der Wrangelstraße montiert"
        lead="Das ist unser Name und unser Job: die Momente einfangen, die eine Szene ausmachen, und Marken zu einem Teil davon machen." />

      {/* ── What we believe ───────────────────────────────────────── */}
      <section className="ab-belief" aria-labelledby="ab-belief-title">
        <div className="ab-belief__text">
          <h2 className="x-h2" id="ab-belief-title" data-appear="">
            Kultur kann man nicht <span className="x-nowrap">kaufen<Dot /></span>
          </h2>
          <p className="ab-belief__lead" data-appear="" style={{ "--d": 120 } as React.CSSProperties}>
            Menschen folgen Szenen, Artists und Creators, nicht Marken. Wer da
            mitreden will, muss Teil davon sein, nicht Werbung darin. Genau
            da kommen wir her.
          </p>
        </div>
        <figure className="ab-belief__media" data-appear="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/records/still-open.jpg" alt="Tanzfläche beim Musikvideo-Dreh" loading="lazy" decoding="async" />
        </figure>
      </section>

      {/* ── The founder's way ─────────────────────────────────────── */}
      <section className="ab-route" aria-labelledby="ab-route-title">
        <div className="ab-route__head">
          <h2 className="x-h2" id="ab-route-title" data-appear="">
            Was dahinter <span className="x-nowrap">steckt<Dot /></span>
          </h2>
          <p className="ab-route__by" data-appear="" style={{ "--d": 120 } as React.CSSProperties}>
            <span className="ab-mark" aria-hidden="true" />
            <strong>Ufuk Karatag</strong>, Gründer, seit über 20 Jahren in der
            Musikindustrie. Aus dieser Leidenschaft ist alles Weitere entstanden.
          </p>
        </div>
        <ol className="ab-route__list">
          {ROUTE.map((r, i) => (
            <li key={r.title} className="ab-stop" data-appear="" style={{ "--d": i * 90 } as React.CSSProperties}>
              <h3 className="ab-stop__title x-wide">
                {r.title}
                <Dot />
              </h3>
              <p className="ab-stop__text">{r.text}</p>
              <div className={`ab-stop__media${r.stamp ? " ab-stop__media--stamp" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt="" loading="lazy" decoding="async" style={{ objectPosition: r.focus }} />
              </div>
            </li>
          ))}
        </ol>
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

      {/* ── Convictions: one composed statement on the paper band ───── */}
      <section className="ab-beliefs" data-ground="paper" aria-label="Woran wir glauben">
        <p className="ab-beliefs__say x-wide">
          <span className="ab-beliefs__line" data-appear="">Echt statt <span className="x-nowrap">laut<Dot /></span></span>
          <span className="ab-beliefs__line ab-beliefs__line--in" data-appear="" style={{ "--d": 120 } as React.CSSProperties}>Szene vor <span className="x-nowrap">Reichweite<Dot /></span></span>
          <span className="ab-beliefs__line" data-appear="" style={{ "--d": 240 } as React.CSSProperties}>Momente statt <span className="x-nowrap">Masse<Dot /></span></span>
        </p>
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
