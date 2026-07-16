import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { DisciplinesStrip } from "@/components/DisciplinesStrip";

export const metadata: Metadata = {
  title: "Leistungen – CAMO Media | Hamburg",
  description:
    "Entdecke unsere Full-Service Leistungen im Culture Marketing: Social Media Management, Content Creation, Digital Concepts & Culture Strategy.",
};

export default function LeistungenPage() {
  return (
    <>
      <header className="about-hero leistungen-hero">
        <div className="about-hero__bg-decorations" aria-hidden="true">
          <div className="about-hero__grid" />
          <div className="about-hero__glow" />
        </div>
        <span className="about-hero__subtitle reveal">CAMO Media // Services</span>
        <h1 className="about-hero__title reveal">
          Unsere Leistungen<span className="square-dot" />
        </h1>
      </header>

      <section className="services-intro">
        <div className="container">
          <div className="services-intro-grid">
            <div className="services-intro__col reveal delay-1">
              <h3 className="services-intro__col-title">Social Media</h3>
              <p className="services-intro__col-text">
                Egal, ob dein Unternehmen ein aufstrebender Newcomer oder bereits
                etabliert ist – bei CAMO haben wir das Geheimnis der sozialen
                Netzwerke entschlüsselt. Als kreative Marketingagentur aus
                Hamburg haben wir bereits über 100 Unternehmen mit unserem
                Know-how und unseren Produktionen beflügelt. Denn jedes Projekt
                verdient eine einzigartige Herangehensweise!
              </p>
              <p className="services-intro__col-text">
                Wenn du eine Strategie suchst, um mehr Kunden und Anfragen zu
                generieren, bist du bei uns goldrichtig. Wir planen, produzieren
                und feiern den Erfolg gemeinsam mit dir.
              </p>
              <ul className="services-intro__list">
                {[
                  "Social Media Management",
                  "Content Creation",
                  "Redaktionsplanung",
                  "Facebook & Instagram Ads",
                  "Influencer Productions",
                  "Kampagnenplanung & Produktion",
                  "Ad-Sets & Werbestrecken",
                ].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="services-intro__local">
                <strong>#LocalHeroes</strong> — Mit unserem Programm unterstützen
                wir lokale Unternehmen wie Restaurants, Hotels und Eventlocations
                zu erschwinglichen Preisen. Wir haben bereits zahlreiche
                regionale Unternehmen begleitet und sind stolz auf eine deutliche
                Umsatzsteigerung bei über 68% von ihnen.
              </p>
            </div>

            <div className="services-intro__col reveal delay-2">
              <h3 className="services-intro__col-title">Content</h3>
              <p className="services-intro__col-text">
                „Content“ ist die Sprache, die wir fließend beherrschen. Denn
                ohne sie läuft heute nichts mehr. Doch was nützt es, wenn niemand
                diese Sprache versteht? Diese Frage stellen wir uns bei jeder
                Produktion und übersetzen die Inhalte in die Sprache deiner
                Zielgruppe.
              </p>
              <p className="services-intro__col-text">
                Jeder Kanal hat seine eigene Bildsprache und Formate, daher sind
                unsere Briefings ein entscheidender Erfolgsfaktor. Unsere
                Contentproduktionen passen wie maßgeschneiderte Anzüge.
              </p>
              <ul className="services-intro__list">
                {[
                  "Fotoshootings",
                  "Videoshootings",
                  "Produktfotografie",
                  "Interviews",
                  "Firmenprofile",
                  "Events & Festivals",
                ].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="services-intro__col-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/leistungen/content.png"
                  alt="CAMO Media - Professional video production studio setup"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisciplinesStrip />

      <section className="services-growth">
        <div className="container">
          <div className="services-growth-grid">
            <div className="services-growth__content reveal-left">
              <div className="label">#LocalHeroes Programm</div>
              <h2 className="services-growth__title">
                Support für lokale Macher
                <span className="square-dot" style={{ background: "var(--accent)" }} />
              </h2>
              <p className="services-growth__text">
                Mit unserem <strong>#LocalHeroes</strong> Programm unterstützen
                wir lokale Hamburger Unternehmen wie Restaurants, Hotels und
                Eventlocations zu erschwinglichen Preisen. Wir haben bereits
                zahlreiche regionale Partner bei ihren Marketingaktivitäten
                begleitet und sind stolz darauf, dass wir für eine{" "}
                <strong>deutliche Umsatzsteigerung bei über 68%</strong> von
                ihnen gesorgt haben. Sprich uns einfach unverbindlich an – wir
                beißen nicht, es sei denn, du machst wirklich großartige Burger!
              </p>
            </div>
            <div className="services-growth__images reveal-right">
              <div className="services-growth__img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/leistungen/growth1.png"
                  alt="CAMO Media - Catchmoments Records vinyl and mixer gear"
                  className="services-growth__img"
                />
              </div>
              <div
                className="services-growth__img-wrap"
                style={{ marginTop: "2.5rem" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/leistungen/growth2.png"
                  alt="CAMO Media - Behind-the-scenes video campaign production"
                  className="services-growth__img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA
        tagline="Let's Create"
        headline={
          <>
            Bereit für echten<br />
            <span className="accent">kulturellen Impact</span>?
          </>
        }
      />
    </>
  );
}
