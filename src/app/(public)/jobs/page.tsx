import type { Metadata } from "next";
import "../legal.css";

export const metadata: Metadata = {
  title: "Jobs & Karriere | CAMO Media Hamburg",
  description:
    "Werde Teil von CAMO, der Kreativagentur aus Hamburg. Offene Stellen, Freelance-Pool und Initiativbewerbungen an talents@camo-media.de.",
};

const APPLY = "mailto:talents@camo-media.de";

export default function JobsPage() {
  return (
    <main className="jobs-page">
      <header className="legal-hero">
        <h1 className="x-h2">
          Catch <span className="x-nowrap">Jobs<span className="x-dot" aria-hidden="true" /></span>
        </h1>
      </header>

      <section className="jobs-intro">
        <div className="jobs-intro__inner">
          <p className="jobs-intro__text">
            Wir sind CAMO, eine Kreativagentur aus Hamburg: inhabergeführt,
            ziemlich cool unterwegs und immer eine Prise Culture mit an Bord. Wir
            suchen immer wieder neue Member für unser Team. Für die Meisterschale
            trainieren wir hart, aber hey, das gehört dazu. Wir machen so ziemlich
            alles im kreativen Bereich, ob für die Musikindustrie, die
            Universität in deiner Stadt oder die nächste Kampagne deiner
            Lieblings-Marke. Wir sind urban, jung, innovativ und immer auf der
            Suche nach Talents mit Herzblut. Falls du Lust auf ein Kennenlernen
            hast, freuen wir uns auf deine Bewerbung! Also, catch us.
          </p>
          <div className="jobs-intro__cta">
            <a href={APPLY} className="jobs-intro__mail">
              talents@camo-media.de
            </a>
            <a href={`${APPLY}?subject=Bewerbung bei CAMO`} className="x-pill x-pill--light">
              <span className="x-pill__fill" aria-hidden="true" />
              <span className="x-pill__label">Jetzt bewerben</span>
            </a>
          </div>
        </div>
      </section>

      <section className="jobs-list-section">
        <div className="jobs-list">
          {/* Social Media Manager */}
          <article className="job-card">
            <h2 className="job-card__title">Social Media Manager*in</h2>
            <p className="job-card__sub">
              Wir entwickeln innovative Lösungen für unsere Kunden. Im Zuge
              unseres Wachstums suchen wir eine*n leidenschaftliche*n und
              talentierte*n Social Media Manager*in, der*die unser Team mit
              Kreativität und Fokus bereichert.
            </p>

            <div className="job-card__group">
              <h3 className="job-card__group-title">Aufgaben</h3>
              <ul className="job-card__points">
                <li>
                  Entwicklung und Umsetzung von Social Media Strategien, die die
                  Marke unserer Kunden stärken und das Engagement steigern
                </li>
                <li>
                  Planung, Erstellung und Veröffentlichung von kreativem und
                  ansprechendem Content auf verschiedenen Social Media
                  Plattformen (z. B. Facebook, Instagram, Twitter, LinkedIn)
                </li>
                <li>
                  Community Management: Betreuung der Social Media Kanäle,
                  Interaktion mit Followern und Beantwortung von Anfragen
                </li>
                <li>
                  Analyse und Auswertung der Social Media Performance,
                  Identifizierung von Trends und Ableitung von
                  Optimierungsmaßnahmen
                </li>
                <li>
                  Enge Zusammenarbeit mit unserem Kreativteam, um innovative und
                  visuell ansprechende Inhalte zu entwickeln
                </li>
                <li>
                  Monitoring von Social Media Trends, Best Practices und neuen
                  Technologien, um die Agentur stets auf dem neuesten Stand zu
                  halten
                </li>
              </ul>
            </div>

            <div className="job-card__group">
              <h3 className="job-card__group-title">Anforderungen</h3>
              <ul className="job-card__points">
                <li>
                  Abgeschlossene Ausbildung oder Studium im Bereich Marketing,
                  Kommunikation, Medien oder ähnlichen relevanten Fachrichtungen
                </li>
                <li>
                  Nachweisbare Erfahrung im Social Media Management, idealerweise
                  in einer Agentur oder einem kreativen Umfeld
                </li>
                <li>
                  Kreativität ist deine Leidenschaft! Du hast ein Auge für
                  außergewöhnliche Ideen und weißt, wie man sie in fesselnde
                  Inhalte verwandelt
                </li>
                <li>
                  Exzellente Kenntnisse verschiedener Social Media Plattformen
                  und ein Gespür für aktuelle Trends
                </li>
                <li>
                  Analytisches Denken: Du verstehst es, Daten zu nutzen, um den
                  Erfolg von Kampagnen zu messen und zu verbessern
                </li>
                <li>
                  Ausgeprägte Kommunikationsfähigkeiten und eine hohe
                  Kundenorientierung
                </li>
                <li>
                  Selbstständige Arbeitsweise, Belastbarkeit und ein hohes Maß an
                  Eigeninitiative
                </li>
                <li>
                  Teamgeist und die Fähigkeit, in einem dynamischen Umfeld zu
                  arbeiten
                </li>
              </ul>
            </div>

            <div className="job-card__group">
              <h3 className="job-card__group-title">Wir bieten</h3>
              <ul className="job-card__points">
                <li>
                  Ein kreatives und inspirierendes Arbeitsumfeld, in dem deine
                  Ideen geschätzt werden
                </li>
                <li>
                  Spannende Projekte für abwechslungsreiche Kunden aus
                  verschiedenen Branchen
                </li>
                <li>
                  Ein dynamisches und engagiertes Team, das gemeinsam an einem
                  Strang zieht
                </li>
                <li>
                  Die Möglichkeit, eigene Fähigkeiten weiterzuentwickeln und
                  Verantwortung zu übernehmen
                </li>
                <li>
                  Flexible Arbeitszeiten und die Möglichkeit zum Homeoffice
                </li>
              </ul>
            </div>

            <p className="job-card__outro">
              Wenn du eine Leidenschaft für Social Media hast und bereit bist,
              unser Team mit deiner Kreativität und deinem Fokus zu unterstützen,
              dann freuen wir uns auf deine Bewerbung! Sende uns bitte deinen
              Lebenslauf, ein aussagekräftiges Anschreiben und Referenzen an{" "}
              <a href={APPLY}>talents@camo-media.de</a>. Wir können es kaum
              erwarten, von dir zu hören und gemeinsam Großartiges zu erreichen!
            </p>

            <a
              href={`${APPLY}?subject=Bewerbung: Social Media Manager*in`}
              className="x-pill x-pill--light job-card__apply"
            >
              <span className="x-pill__fill" aria-hidden="true" />
              <span className="x-pill__label">Jetzt bewerben</span>
            </a>
          </article>

          {/* Freelance Pool */}
          <article className="job-card">
            <h2 className="job-card__title">
              Freelance Pool: Wahre Talente gesucht!
            </h2>
            <p className="job-card__sub">
              Hey du da! Ja, genau du mit der kreativen Ader und dem
              unerschütterlichen Talent! Wir sind CAMO Media, eine frische und
              lebhafte Agentur aus der wunderschönen Hansestadt Hamburg. Und wisst
              ihr was? Wir glauben an wahre Talente, ohne wenn und aber! Egal, ob
              du Content Creator, Fotograf*in, Videograf*in oder digitale*r
              Künstler*in bist, wir wollen dich in unserem Team haben, und das
              als Freelancer!
            </p>
            <p className="job-card__text">
              Bei uns geht es nicht nur um knallharte Fakten und trockene
              Bewerbungen. Nein, nein! Wir suchen nach Kreativen, die das gewisse
              Etwas haben. Du hast das Talent, großartige Inhalte zu zaubern, die
              Leute zum Staunen und Schmunzeln bringen? Perfekt! Du bist ein
              Meister der Kamera und fängst Augenblicke ein, die Geschichten
              erzählen? Genau unser Ding! Du kreierst digitale Kunstwerke, die die
              Grenzen des Vorstellbaren sprengen? Wow, sag Bescheid, wir brauchen
              dich!
            </p>

            <div className="job-card__group">
              <h3 className="job-card__group-title">Was du mitbringen solltest</h3>
              <ul className="job-card__points">
                <li>
                  Einen Spritzer Humor und die Fähigkeit, mit uns und unseren
                  Kunden auf einer Wellenlänge zu sein. Ernsthaftigkeit ist zwar
                  wichtig, aber ein bisschen Spaß am Arbeitsplatz schadet nie!
                </li>
                <li>
                  Natürlich ein beeindruckendes Portfolio, das zeigt, was du
                  drauf hast. Zeig uns, was du kannst, und wir werden in
                  Verzückung geraten!
                </li>
                <li>
                  Flexibilität ist dein zweiter Vorname? Super! Denn wir mögen es,
                  wenn unsere Freelancer genauso agil und wandlungsfähig sind wie
                  unsere Ideen.
                </li>
                <li>
                  Du machst dich mit den neuesten Tools und Technologien vertraut?
                  Top! Wir lieben Leute, die auf der digitalen Überholspur
                  unterwegs sind.
                </li>
                <li>
                  Last but not least: Den Hamburger Spirit! Du liebst diese Stadt
                  genauso wie wir, und gemeinsam werden wir die Agenturwelt
                  aufmischen!
                </li>
              </ul>
            </div>

            <p className="job-card__outro">
              Und jetzt kommt das Beste: Bei uns bist du frei wie ein Vogel! Keine
              Fesseln, keine Festeinstellung, du kannst als Freelancer deinen
              kreativen Geist entfalten, wann und wie es dir passt. Pack deine
              besten Arbeiten ein und schicke uns eine Mail an{" "}
              <a href={APPLY}>talents@camo-media.de</a>. Falls du ein kreatives
              Video oder eine abgefahrene Bildercollage als Bewerbung zaubern
              möchtest, nur zu! Zeig uns, wer du bist und was du drauf hast!
            </p>

            <a
              href={`${APPLY}?subject=Bewerbung: Freelance Pool`}
              className="x-pill x-pill--light job-card__apply"
            >
              <span className="x-pill__fill" aria-hidden="true" />
              <span className="x-pill__label">Jetzt bewerben</span>
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
