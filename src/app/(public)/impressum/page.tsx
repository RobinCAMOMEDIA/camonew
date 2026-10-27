import type { Metadata } from "next";
import "../legal.css";

export const metadata: Metadata = {
  title: "Impressum | CAMO Media Hamburg",
  description:
    "Impressum und rechtliche Hinweise der CAMO MEDIA, Hamburg. Angaben gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <main className="legal-page">
      <header className="legal-hero">
        <h1 className="x-h2">
          <span className="x-nowrap">Impressum<span className="x-dot" aria-hidden="true" /></span>
        </h1>
      </header>

      <section className="legal-body">
        <div className="legal-content">
          <p className="legal-lead">Angaben gemäß § 5 TMG</p>

          <div className="legal-card">
            <p>
              <strong>CAMO MEDIA</strong>
              <br />
              Ufuk Karatag
              <br />
              Wrangelstraße 100
              <br />
              20253 Eimsbüttel
            </p>
            <p>Vertreten durch Ufuk Karatag</p>
            <p>
              E-Mail:{" "}
              <a href="mailto:hello@camo.media">hello@camo.media</a>
              <br />
              Tel: <a href="tel:+494022854474">040 22854474</a>
            </p>
            <p>
              Umsatzsteuer-Identifikationsnummer DE327181689 gemäß § 27 a
              Umsatzsteuergesetz
            </p>
          </div>

          <h2 className="legal-h2">Haftungsausschluss</h2>

          <h3 className="legal-h3">Verantwortlichkeit für den Inhalt</h3>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
            die Inhalte können wir jedoch keine Gewähr übernehmen: für
            Richtigkeit, Vollständigkeit oder Aktualität. Nach den gesetzlichen
            Bestimmungen sind wir ferner verantwortlich für eigene Inhalte auf
            diesen Webseiten. Bitte beachten Sie in diesem Zusammenhang, dass wir
            nicht verpflichtet sind, die übermittelten oder gespeicherten fremden
            Informationen zu überwachen oder nach Umständen zu forschen, die auf
            eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
            Entfernung oder Sperrung der Nutzung von Informationen nach den
            allgemeinen Gesetzen bleiben hiervon unberührt (§§ 8 bis 10 TMG).
          </p>

          <h3 className="legal-h3">Verantwortlichkeit für Links</h3>
          <p>
            Für den Inhalt der verlinkten Seiten sind ausschließlich deren
            Betreiber verantwortlich. Verstöße waren uns zum Zeitpunkt der
            Verlinkung nicht ersichtlich. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Links umgehend entfernen.
          </p>

          <h3 className="legal-h3">Urheberrechte ©</h3>
          <p>
            Unsere Webseiten und deren Inhalte unterliegen dem deutschen
            Urheberrecht. Jede Form der Nutzung, Vervielfältigung oder Bearbeitung
            urheberrechtlich geschützter Werke auf unseren Webseiten bedarf der
            vorherigen Zustimmung des jeweiligen Rechteinhabers, es sei denn, sie
            ist gesetzlich ausdrücklich gestattet. Einzelne Reproduktionen eines
            Werkes sind nur für den privaten Gebrauch gestattet. Die Materialien
            auf diesen Seiten sind urheberrechtlich geschützt und jede nicht
            autorisierte Verwendung kann gegen das Urheberrecht verstoßen.
          </p>
        </div>
      </section>
    </main>
  );
}
