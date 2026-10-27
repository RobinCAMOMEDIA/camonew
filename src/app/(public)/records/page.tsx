import type { Metadata } from "next";
import { RecordsContactForm } from "@/components/records/RecordsContactForm";
import { Arrow } from "@/components/site/Arrow";
import { VerticalClip } from "@/components/records/VerticalClip";
import "./records.css";

export const metadata: Metadata = {
  title: "Records | CAMO Media Hamburg",
  description:
    "Catchmoments Records: Musikproduktion, DJ-Booking, Artist Management und exklusive Brand Soundtracks aus Hamburg.",
};

// Offers from the original Records page, read as a setlist.
// The four Records offers, each with a picture.
const OFFERS = [
  {
    title: "Musikproduktion",
    text: "Bespoke Soundtracks, die exklusiv auf eure Kampagnen-Visuals komponiert und abgestimmt werden.",
    media: { kind: "image", src: "/assets/images/records/still-crew.jpg", focus: "50% 40%" },
  },
  {
    title: "Rechtssicherheit",
    text: "Keine Lizenzblockaden oder DMCA-Warnungen auf Social Media. Der Soundtrack gehört komplett euch.",
    media: { kind: "image", src: "/assets/images/records/still-flags.jpg", focus: "50% 45%" },
  },
  {
    title: "Artist Relations",
    text: "Direkter Draht zu Newcomern und etablierten Acts für Bookings und Kooperationen.",
    media: { kind: "image", src: "/assets/images/chacho2.jpg", focus: "50% 38%" },
  },
  {
    title: "Tonstudio Hamburg",
    text: "Professionelles In-house Studio für Vocals, Podcasts, Mixing & Mastering.",
    media: { kind: "image", src: "/assets/images/musichero.jpg", focus: "45% 50%" },
  },
];

// Photo wall slots: swap any src for new shots, the layout stays.
const WALL = [
  { src: "/assets/images/chacho1.jpg", alt: "Chacho live vor vollem Festival-Publikum", shape: "tall", focus: "50% 30%" },
  { src: "/assets/images/records/still-open.jpg", alt: "Szene aus dem Musikvideo „Sie wären so gerne wie wir“", shape: "wide", focus: "50% 45%" },
  { src: "/assets/images/records/still-chacho.jpg", alt: "Chacho im Musikvideo", shape: "square", focus: "35% 40%" },
  { src: "/assets/images/records/still-floor.jpg", alt: "Tanzfläche beim Videodreh", shape: "square", focus: "50% 40%" },
];

function Dot() {
  return <span className="x-dot" aria-hidden="true" />;
}

export default function RecordsPage() {
  return (
    <div className="rc">
      {/* ── Stage: the page opens mid-concert ──────────────────────────── */}
      <header className="rc-stage">
        <video
          className="rc-stage__photo"
          src="/assets/videos/records/hero.mp4"
          poster="/assets/images/records/still-open.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="rc-stage__scrim" aria-hidden="true" />
        <div className="rc-stage__text">
          <h1 className="rc-stage__title x-wide">
            Sounds of <span className="x-nowrap">Culture<Dot /></span>
          </h1>
          <p className="rc-stage__lead">
            Catchmoments Records ist das Musik-Label von CAMO: Produktion,
            Booking, Artist Management und unser eigenes Studio in Hamburg.
          </p>
          <a href="#booking" className="x-more rc-stage__more">
            <span>Booking anfragen</span>
            <span className="x-more__dot" aria-hidden="true"><Arrow /></span>
          </a>
        </div>
      </header>

      {/* ── Statement on paper ─────────────────────────────────────────── */}
      <section className="rc-paper" aria-labelledby="rc-paper-title">
        <div className="rc-paper__text">
          <h2 className="rc-paper__title x-wide" id="rc-paper-title">
            Lizenzen sind von <span className="x-nowrap">gestern<Dot /></span>{" "}
            Wir machen den Sound <span className="x-nowrap">selbst<Dot /></span>
          </h2>
          <p className="rc-paper__story" data-appear="">
          Bei uns war es die Musik, die den Rhythmus vorgab und alles andere mit
          sich brachte. Unser Gründer Ufuk Karatag ist seit über 20 Jahren in
          der Musikindustrie aktiv, hat mehr als 100 Liveshows auf die Beine
          gestellt, Festivals betreut, Songs geschrieben und Brand-Kooperationen
          eingefädelt. Aus dieser Leidenschaft heraus wurde Catchmoments Records
          geboren. Uns treibt der ungeschliffene Vibe des Hip-Hops an: von den
          Anfängen im Jahr 2002 bis zu wegweisenden Kollaborationen mit Mortel
          &amp; Sido, Bonez MC, Haftbefehl, Nimo und OG Keemo. Durch die direkte
          Synergie mit der Mutteragentur CAMO bieten wir eine echte
          360-Grad-Betreuung: von der ersten Song-Idee in unserem Hamburger
          Studio bis zum fertigen Mastering und reichweitenstarken Kampagnen.
        </p>
        </div>
        <div className="rc-paper__clip" data-appear="">
          <VerticalClip
            src="/assets/videos/records/hero.mp4"
            start={24}
            poster="/assets/images/records/still-crew.jpg"
            focus="62% 50%"
          />
        </div>
      </section>

      {/* ── Offers: four tracks, staggered ─────────────────────────────── */}
      <section className="rc-offers" aria-labelledby="rc-offers-title">
        <h2 className="x-h2" id="rc-offers-title">
          Vom Song bis zur <span className="x-nowrap">Bühne<Dot /></span>
        </h2>
        <ul className="rc-offers__grid">
          {OFFERS.map((o, i) => (
            <li key={o.title} className="rc-offer" data-appear="" style={{ "--d": i * 90 } as React.CSSProperties}>
              <div className="rc-offer__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.media.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: o.media.focus }} />
              </div>
              <h3 className="rc-offer__title x-wide">
                <span className="rc-offer__mark" aria-hidden="true" />
                {o.title}
              </h3>
              <p className="rc-offer__text">{o.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Photo wall ─────────────────────────────────────────────────── */}
      <section className="rc-wall" aria-labelledby="rc-wall-title">
        <h2 className="x-h2" id="rc-wall-title">
          Live &amp; am <span className="x-nowrap">Set<Dot /></span>
        </h2>
        <ul className="rc-wall__grid">
          {WALL.map((w) => (
            <li key={w.src} className={`rc-wall__item rc-wall__item--${w.shape}`} data-appear="">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.src} alt={w.alt} loading="lazy" decoding="async" style={{ objectPosition: w.focus }} />
            </li>
          ))}
        </ul>
      </section>

      {/* ── Booking close ──────────────────────────────────────────────── */}
      <section className="rc-book" id="booking" aria-labelledby="rc-book-title" data-ground="orange">
        <div className="rc-book__aside">
          <h2 className="rc-book__title x-wide" id="rc-book-title">
            Booking &amp; <span className="x-nowrap">Anfragen<Dot /></span>
          </h2>
          <p className="rc-book__lead">
            Schreib uns dein Anliegen oder deine Booking-Anfrage, wir melden
            uns innerhalb von 24 Stunden.
          </p>
          <a href="mailto:hello@camo.media" className="rc-book__mail">
            hello@camo.media
          </a>
        </div>
        <div className="rc-book__form">
          <RecordsContactForm />
        </div>
      </section>
    </div>
  );
}
