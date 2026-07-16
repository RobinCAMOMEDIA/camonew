import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Agentur – CAMO Media | Hamburg",
  description:
    "Wir sind CAMO aus Hamburg. Visuell, flexibel und markenorientiert – Culture Marketing, das im Kopf bleibt und Herzen trifft.",
};

export default function AboutPage() {
  return (
    <>
      {/* HERO — photo background like the other subpages */}
      <header className="about-hero about-hero--photo">
        <span className="about-hero__subtitle reveal">
          CAMO Media // Die Agentur
        </span>
        <h1 className="about-hero__title reveal">Wir sind CAMO.</h1>
      </header>

      {/* STORY — sticky scrollytelling: image pins while the text scrolls */}
      <section className="about-story">
        <div className="container">
          {/* Chapter 01 — media right, text left */}
          <article className="story-chapter">
            <div className="story-chapter__media">
              <div className="story-chapter__sticky">
                <span className="story-chapter__num" aria-hidden="true">
                  01
                </span>
                <div className="aboutpage-ph aboutpage-ph--tall">
                  <span className="aboutpage-ph__label">Bild // Team Hamburg</span>
                </div>
              </div>
            </div>
            <div className="story-chapter__text">
              <span className="story-chapter__kicker reveal">
                01 — Wer wir sind
              </span>
              <h2 className="story-chapter__title reveal">
                Wir sind CAMO<br />aus Hamburg.
              </h2>
              <p className="story-chapter__accent reveal">
                Visuell, flexibel und markenorientiert.
              </p>
              <p className="story-chapter__body reveal">
                Egal, ob aufstrebendes Start-Up oder etabliertes Unternehmen –
                wir verwirklichen deine Ziele. Wir entwickeln umfassende
                Kommunikationsstrategien und Content für Instagram, Facebook,
                YouTube und LinkedIn. Mit detaillierten Briefings und
                regelmäßigen Reportings halten wir dich nicht nur auf dem
                Laufenden, sondern machen dich zum aktiven Teil des
                Gestaltungsprozesses.
              </p>
              <p className="story-chapter__body reveal">
                Unsere Mission? Zuschauer in neugierige Interessenten und
                schließlich in treue Markenbotschafter zu verwandeln. Von der
                ersten Idee bis zur strategischen Begleitung garantieren wir dir
                authentische Qualität, die überzeugt.
              </p>
            </div>
          </article>

          {/* Chapter 02 — media left, text right */}
          <article className="story-chapter story-chapter--reverse">
            <div className="story-chapter__media">
              <div className="story-chapter__sticky">
                <span className="story-chapter__num" aria-hidden="true">
                  02
                </span>
                <div className="aboutpage-ph aboutpage-ph--tall">
                  <span className="aboutpage-ph__label">
                    Bild // Behind the Scenes
                  </span>
                </div>
              </div>
            </div>
            <div className="story-chapter__text">
              <span className="story-chapter__kicker reveal">
                02 — Unser Spielprinzip
              </span>
              <h2 className="story-chapter__title reveal">
                Das Runde muss<br />ins Eckige.
              </h2>
              <p className="story-chapter__body reveal">
                Und dafür betreten wir jeden Tag den Platz. Wir analysieren den
                Markt, prüfen die Zielgruppe und entwickeln ein schlüssiges
                Konzept – damit dein Content genau dort landet, wo er wirkt. Am
                Ende geht es um GOALS.
              </p>
              <blockquote className="story-chapter__quote reveal">
                „Papa, Ronaldo hat ein Fallrückziehertor geschossen!“
              </blockquote>
              <p className="story-chapter__body reveal">
                So ungefähr ist unsere Erwartungshaltung, wenn Menschen unseren
                Content sehen. Es geht um den Moment der Performance – um den
                Augenblick, in dem ein Kunde zum Smartphone greift und durch
                Instagram scrollt. Die beste Werbung ist die, bei der man nicht
                sofort merkt, dass es Werbung ist. Wir wollen im Kopf bleiben und
                die Herzen treffen – mit Clips, an die man sich noch in 10 Jahren
                erinnert. Das ist unsere Meisterschale.
              </p>
            </div>
          </article>
        </div>

        {/* Chapter 03 — full-bleed culture finale */}
        <div className="story-culture">
          <span className="story-culture__watermark" aria-hidden="true">
            CULTURE
          </span>
          <div className="container story-culture__inner">
            <span className="story-chapter__kicker reveal">03 — Unsere Crew</span>
            <h2 className="story-culture__title reveal">
              Based on a <span className="accent">Culture.</span>
            </h2>
            <p className="story-culture__lead reveal">
              Wie wir das alles machen? Mit einem großartigen Team aus
              Kreativen, Fotografen, Videografen und Visionären, die nachts wach
              sind, während die Stadt schläft. Nicht, weil wir müssen, sondern
              weil wir es fühlen. Wir sind verliebt in unsere Arbeit – begleitet
              vom Mond, bis die Sonne wieder aufgeht.
            </p>
            <div className="story-culture__media reveal">
              <div className="aboutpage-ph aboutpage-ph--wide">
                <span className="aboutpage-ph__label">Bild // Studio bei Nacht</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA
        headline={
          <>
            Bereit für echte<br />
            <span className="accent">kulturelle Relevanz</span>?
          </>
        }
      />
    </>
  );
}
