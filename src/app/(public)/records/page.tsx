import type { Metadata } from "next";
import { RecordsContactForm } from "@/components/RecordsContactForm";

export const metadata: Metadata = {
  title: "Records – CAMO Media | Hamburg",
  description:
    "Mehr über CAMO Records – Musikproduktion, DJ-Booking, Artist Management und exklusive Brand Soundtracks.",
};

const BENEFITS = [
  {
    title: "Exklusive Musikproduktion",
    desc: "Bespoke Soundtracks, die exklusiv auf eure Kampagnen-Visuals komponiert und abgestimmt werden.",
    icon: (
      <>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </>
    ),
  },
  {
    title: "Rechtssicherheit",
    desc: "Keine Lizenzblockaden oder DMCA-Warnungen auf Social Media. Der Soundtrack gehört komplett euch.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: "Artist Relations",
    desc: "Direkter Draht zu Newcomern und etablierten Acts für Bookings und Kooperationen.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: "Tonstudio Hamburg",
    desc: "Professionelles In-house Studio für Vocals, Podcasts, Mixing & Mastering.",
    icon: (
      <>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </>
    ),
  },
];

export default function RecordsPage() {
  return (
    <>
      <header className="about-hero records-hero">
        <div className="about-hero__bg-decorations" aria-hidden="true">
          <div className="about-hero__grid" />
          <div className="about-hero__glow" />
        </div>
        <span
          className="about-hero__subtitle reveal"
          style={{ color: "var(--accent)" }}
        >
          CATCHMOMENTS RECORDS
        </span>
        <h1 className="about-hero__title reveal">
          SOUNDS OF CULTURE<span className="square-dot" />
        </h1>
      </header>

      <section className="records-about-section">
        <div className="container">
          <div className="records-about-grid reveal">
            <div className="records-about-brand-col">
              <div className="records-brand-stamp">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/catchmomentsrecords.png"
                  alt="Catchmoments Records Logo"
                  className="records-stamp-logo"
                />
              </div>
              <h2 className="records-about-title">
                Lizenzen sind von gestern<span className="square-dot" />
                <br />
                Wir machen den Sound selbst<span className="square-dot" />
              </h2>
            </div>
            <div className="records-about-text-col">
              <p className="records-about-p">
                Bei uns war es die Musik, die den Rhythmus vorgab und alles
                andere mit sich brachte. Unser Gründer Ufuk Karatag ist seit über
                20 Jahren in der Musikindustrie aktiv, hat mehr als 100 Liveshows
                auf die Beine gestellt, Festivals betreut, Songs geschrieben und
                Brand-Kooperationen eingefädelt. Aus dieser Leidenschaft heraus
                wurde Catchmoments Records geboren. Uns treibt der ungeschliffene
                Vibe des Hip-Hops an — von den Anfängen im Jahr 2002 bis zu
                wegweisenden Kollaborationen mit Mortel & Sido, Bonez MC,
                Haftbefehl, Nimo und OG Keemo. Durch die direkte Synergie mit der
                Mutteragentur CAMO bieten wir eine echte 360-Grad-Betreuung: von
                der ersten Song-Idee in unserem Hamburger Studio bis zum fertigen
                Mastering und reichweitenstarken Kampagnen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="records-console-section">
        <div className="container">
          <div className="records-showcase-title-wrap reveal">
            <div className="label" style={{ marginBottom: "var(--space-xs)" }}>
              Camo Records
            </div>
            <h2
              className="about-hero__subtitle"
              style={{
                color: "var(--text-primary)",
                fontSize: "2.2rem",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              Sounds of the Scene<span className="square-dot" />
            </h2>
          </div>

          <div className="records-console-grid">
            <div className="records-showcase__left-photo reveal-left">
              <div className="records-pillar-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/chacho1.jpg"
                  alt="Chacho live on stage - CAMO Records Artist"
                  className="records-pillar-img"
                />
              </div>
            </div>

            <div className="records-showcase__content reveal">
              <div className="records-benefits-stack">
                {BENEFITS.map((b) => (
                  <div className="records-benefit-item" key={b.title}>
                    <div className="records-benefit-icon">
                      <svg
                        className="benefit-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {b.icon}
                      </svg>
                    </div>
                    <div className="records-benefit-content">
                      <h3 className="records-benefit-title">{b.title}</h3>
                      <p className="records-benefit-desc">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="records-showcase__right-photo reveal-right">
              <div className="records-pillar-photo records-pillar-photo--offset">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/chacho2.jpg"
                  alt="Chacho vocal performance - CAMO Records Artist"
                  className="records-pillar-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="records-contact-section" id="contact">
        <div className="container">
          <div className="records-contact-split reveal">
            <div className="records-contact-info">
              <span className="label">Contact Form</span>
              <h2 className="records-contact-title">
                Music Inquiries<span className="square-dot" />
              </h2>
              <p className="records-contact-subtitle">
                Schreib uns dein Anliegen oder deine Booking-Anfrage – wir melden
                uns innerhalb von 24 Stunden.
              </p>
              <div className="records-contact-meta">
                <div className="meta-item">
                  <span className="meta-label">Direktkontakt</span>
                  <a href="mailto:hello@camo.media" className="meta-link">
                    hello@camo.media
                  </a>
                </div>
              </div>
            </div>
            <div className="records-contact-form-wrap">
              <RecordsContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
