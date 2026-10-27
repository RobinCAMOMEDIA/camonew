import type { Metadata } from "next";
import "../legal.css";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | CAMO Media Hamburg",
  description:
    "Datenschutzerklärung der CAMO Media: Welche Daten wir erheben, wie wir sie verwenden und welche Rechte Sie haben.",
};

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <header className="legal-hero">
        <h1 className="x-h2">
          <span className="x-nowrap">Datenschutz<span className="x-dot" aria-hidden="true" /></span>
        </h1>
      </header>

      <section className="legal-body">
        <div className="legal-content">
          {/* 1 */}
          <h2 className="legal-h2">1. Datenschutz auf einen Blick</h2>

          <h3 className="legal-h3">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können. Ausführliche Informationen
            zum Thema Datenschutz entnehmen Sie unserer unter diesem Text
            aufgeführten Datenschutzerklärung.
          </p>

          <h3 className="legal-h3">Datenerfassung auf dieser Website</h3>
          <p>
            <strong>
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </strong>
            <br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den
            Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt
            „Hinweis zur verantwortlichen Stelle“ in dieser Datenschutzerklärung
            entnehmen.
          </p>
          <p>
            <strong>Wie erfassen wir Ihre Daten?</strong>
            <br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
            mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in
            ein Kontaktformular eingeben. Andere Daten werden automatisch oder
            nach Ihrer Einwilligung beim Besuch der Website durch unsere
            IT-Systeme erfasst. Das sind vor allem technische Daten (z. B.
            Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die
            Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website
            betreten.
          </p>
          <p>
            <strong>Wofür nutzen wir Ihre Daten?</strong>
            <br />
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung
            der Website zu gewährleisten. Andere Daten können zur Analyse Ihres
            Nutzerverhaltens verwendet werden.
          </p>
          <p>
            <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
            <br />
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
            Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
            erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung
            dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
            Datenverarbeitung erteilt haben, können Sie diese Einwilligung
            jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht,
            unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
            Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie
            zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an
            uns wenden.
          </p>

          {/* 2 */}
          <h2 className="legal-h2">2. Hosting</h2>
          <p>
            Wir hosten die Inhalte unserer Website bei den folgenden Anbietern.
          </p>

          <h3 className="legal-h3">Vercel</h3>
          <p>
            Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
            91789, USA (nachfolgend „Vercel“). Wenn Sie unsere Website besuchen,
            verarbeitet Vercel verschiedene Logfiles inklusive Ihrer IP-Adresse,
            um die Website auszuliefern und ihre technische Sicherheit zu
            gewährleisten. Die Verwendung von Vercel erfolgt auf Grundlage von
            Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an
            einer möglichst zuverlässigen Darstellung unserer Website. Die
            Datenübertragung in die USA wird auf die Standardvertragsklauseln der
            EU-Kommission gestützt. Weitere Informationen finden Sie in der
            Datenschutzerklärung von Vercel:{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
              https://vercel.com/legal/privacy-policy
            </a>
            .
          </p>

          <h3 className="legal-h3">Strato (Domain)</h3>
          <p>
            Unsere Domain wird über die Strato AG, Otto-Ostrowski-Straße 7, 10249
            Berlin (nachfolgend „Strato“) verwaltet. Weitere Informationen
            entnehmen Sie der Datenschutzerklärung von Strato:{" "}
            <a href="https://www.strato.de/datenschutz/" target="_blank" rel="noreferrer">
              https://www.strato.de/datenschutz/
            </a>
            .
          </p>

          <h3 className="legal-h3">Auftragsverarbeitung</h3>
          <p>
            Wir haben mit den oben genannten Anbietern Verträge über
            Auftragsverarbeitung (AVV) geschlossen bzw. schließen diese ab.
            Hierbei handelt es sich um datenschutzrechtlich vorgeschriebene
            Verträge, die gewährleisten, dass diese die personenbezogenen Daten
            unserer Websitebesucher nur nach unseren Weisungen und unter
            Einhaltung der DSGVO verarbeiten.
          </p>

          {/* 3 */}
          <h2 className="legal-h2">
            3. Allgemeine Hinweise und Pflichtinformationen
          </h2>

          <h3 className="legal-h3">Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
            Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
            vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften
            sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen,
            werden verschiedene personenbezogene Daten erhoben. Die vorliegende
            Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir
            sie nutzen. Wir weisen darauf hin, dass die Datenübertragung im
            Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken
            aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
            Dritte ist nicht möglich.
          </p>

          <h3 className="legal-h3">Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser
            Website ist:
          </p>
          <p>
            <strong>CAMO Media</strong>
            <br />
            Inhaber: Ufuk Karatag
            <br />
            Wrangelstraße 100
            <br />
            20253 Eimsbüttel
          </p>
          <p>
            Telefon: <a href="tel:+494022854474">+49 (0) 40 22854474</a>
            <br />
            E-Mail: <a href="mailto:hello@camo-media.de">hello@camo-media.de</a>
          </p>
          <p>
            Verantwortliche Stelle ist die natürliche oder juristische Person,
            die allein oder gemeinsam mit anderen über die Zwecke und Mittel der
            Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen
            o. Ä.) entscheidet.
          </p>

          <h3 className="legal-h3">Speicherdauer</h3>
          <p>
            Soweit innerhalb dieser Datenschutzerklärung keine speziellere
            Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten
            bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie
            ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung
            zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern
            wir keine anderen rechtlich zulässigen Gründe für die Speicherung
            Ihrer personenbezogenen Daten haben (z. B. steuer- oder
            handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall
            erfolgt die Löschung nach Fortfall dieser Gründe.
          </p>

          <h3 className="legal-h3">
            Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung
          </h3>
          <p>
            Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten
            wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit.
            a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO. Im Falle einer ausdrücklichen
            Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten
            erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs.
            1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den
            Zugriff auf Informationen in Ihr Endgerät eingewilligt haben, erfolgt
            die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TTDSG.
            Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
            Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen
            erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs.
            1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese
            zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind, auf
            Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann
            ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs.
            1 lit. f DSGVO erfolgen.
          </p>

          <h3 className="legal-h3">Empfänger von personenbezogenen Daten</h3>
          <p>
            Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen
            externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung
            von personenbezogenen Daten an diese externen Stellen erforderlich.
            Wir geben personenbezogene Daten nur dann an externe Stellen weiter,
            wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir
            gesetzlich hierzu verpflichtet sind, wenn wir ein berechtigtes
            Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder
            wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim
            Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten
            unserer Kunden nur auf Grundlage eines gültigen Vertrags über
            Auftragsverarbeitung weiter. Einige unserer Dienstleister haben ihren
            Sitz in den USA; Übermittlungen dorthin werden, soweit kein
            Angemessenheitsbeschluss greift, auf die Standardvertragsklauseln der
            EU-Kommission bzw. eine Zertifizierung nach dem EU-US Data Privacy
            Framework (DPF) gestützt.
          </p>

          <h3 className="legal-h3">
            Widerruf Ihrer Einwilligung zur Datenverarbeitung
          </h3>
          <p>
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
            Einwilligung möglich. Sie können eine bereits erteilte Einwilligung
            jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
            erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>

          <h3 className="legal-h3">
            Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie
            gegen Direktwerbung (Art. 21 DSGVO)
          </h3>
          <p>
            WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER
            F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH
            AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER
            PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN
            AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. WENN SIE WIDERSPRUCH
            EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT
            MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE
            GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND
            FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG,
            AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART.
            21 ABS. 1 DSGVO). WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM
            DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT
            WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER
            DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN (WIDERSPRUCH NACH ART.
            21 ABS. 2 DSGVO).
          </p>

          <h3 className="legal-h3">
            Beschwerderecht bei der zuständigen Aufsichtsbehörde
          </h3>
          <p>
            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
            Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem
            Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
            oder des Orts des mutmaßlichen Verstoßes. Das Beschwerderecht besteht
            unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher
            Rechtsbehelfe.
          </p>

          <h3 className="legal-h3">Recht auf Datenübertragbarkeit</h3>
          <p>
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung
            oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich
            oder an einen Dritten in einem gängigen, maschinenlesbaren Format
            aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an
            einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es
            technisch machbar ist.
          </p>

          <h3 className="legal-h3">Auskunft, Berichtigung und Löschung</h3>
          <p>
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit
            das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
            personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck
            der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung
            dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
            personenbezogene Daten können Sie sich jederzeit an uns wenden.
          </p>

          <h3 className="legal-h3">Recht auf Einschränkung der Verarbeitung</h3>
          <p>
            Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit
            an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in
            den gesetzlich vorgesehenen Fällen (Art. 18 DSGVO). Wenn Sie die
            Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen
            diese Daten (von ihrer Speicherung abgesehen) nur mit Ihrer
            Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von
            Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen
            oder juristischen Person oder aus Gründen eines wichtigen öffentlichen
            Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet
            werden.
          </p>

          <h3 className="legal-h3">SSL- bzw. TLS-Verschlüsselung</h3>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
            Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie
            an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung.
            Eine verschlüsselte Verbindung erkennen Sie daran, dass die
            Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an
            dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw.
            TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns
            übermitteln, nicht von Dritten mitgelesen werden.
          </p>

          <h3 className="legal-h3">Widerspruch gegen Werbe-E-Mails</h3>
          <p>
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
            Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter
            Werbung und Informationsmaterialien wird hiermit widersprochen. Die
            Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im
            Falle der unverlangten Zusendung von Werbeinformationen, etwa durch
            Spam-E-Mails, vor.
          </p>

          {/* 4 */}
          <h2 className="legal-h2">4. Datenerfassung auf dieser Website</h2>

          <h3 className="legal-h3">Cookies</h3>
          <p>
            Unsere Internetseiten verwenden teilweise so genannte „Cookies“.
            Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen
            Schaden an. Sie werden entweder vorübergehend für die Dauer einer
            Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf
            Ihrem Endgerät gespeichert. Cookies, die zur Durchführung des
            elektronischen Kommunikationsvorgangs oder zur Bereitstellung
            bestimmter, von Ihnen erwünschter Funktionen erforderlich sind
            (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f
            DSGVO gespeichert. Sofern eine Einwilligung zur Speicherung von
            Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt
            wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser
            Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG); die
            Einwilligung ist jederzeit widerrufbar. Sie können Ihren Browser so
            einstellen, dass Sie über das Setzen von Cookies informiert werden und
            Cookies nur im Einzelfall erlauben oder generell ausschließen.
          </p>

          <h3 className="legal-h3">Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
            Angaben aus dem Anfrageformular inklusive der von Ihnen dort
            angegebenen Kontaktdaten (insbesondere Name, E-Mail-Adresse, Betreff
            und Nachricht) zwecks Bearbeitung der Anfrage und für den Fall von
            Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne
            Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf
            Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der
            Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
            vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen
            beruht die Verarbeitung auf unserem berechtigten Interesse an der
            effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1
            lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
            DSGVO), sofern diese abgefragt wurde. Zur technischen Speicherung und
            zum Versand dieser Anfragen setzen wir die unten genannten Dienste
            Convex und Resend ein. Die von Ihnen im Kontaktformular eingegebenen
            Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre
            Einwilligung zur Speicherung widerrufen oder der Zweck für die
            Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung
            Ihrer Anfrage). Zwingende gesetzliche Bestimmungen, insbesondere
            Aufbewahrungsfristen, bleiben unberührt.
          </p>

          <h3 className="legal-h3">Anfrage per E-Mail oder Telefon</h3>
          <p>
            Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage
            inklusive aller daraus hervorgehenden personenbezogenen Daten (Name,
            Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns
            gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre
            Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf
            Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der
            Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
            vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen
            beruht die Verarbeitung auf unserem berechtigten Interesse an der
            effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1
            lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
          </p>

          <h3 className="legal-h3">Convex (Backend &amp; Datenbank)</h3>
          <p>
            Für den Betrieb der Website sowie zur Speicherung von Inhalten und
            Kontaktanfragen nutzen wir den Backend- und Datenbankdienst Convex.
            Anbieter ist die Convex, Inc., USA. Wenn Sie ein Formular auf unserer
            Website absenden, werden die von Ihnen eingegebenen Daten in der
            Datenbank von Convex gespeichert und dort für uns zur Bearbeitung
            bereitgehalten. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse an einem sicheren und effizienten
            Betrieb unserer Website) bzw., soweit die Daten der Vertragsanbahnung
            dienen, auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Die
            Datenübertragung in die USA wird auf die Standardvertragsklauseln der
            EU-Kommission gestützt. Mit dem Anbieter besteht bzw. wird ein Vertrag
            zur Auftragsverarbeitung geschlossen. Weitere Informationen:{" "}
            <a href="https://www.convex.dev/legal/privacy" target="_blank" rel="noreferrer">
              https://www.convex.dev/legal/privacy
            </a>
            .
          </p>

          <h3 className="legal-h3">Resend (E-Mail-Versand)</h3>
          <p>
            Zur Benachrichtigung über eingehende Kontaktanfragen versenden wir
            E-Mails über den Dienst Resend. Anbieter ist die Resend, Inc., USA.
            Dabei werden die von Ihnen im Kontaktformular angegebenen Daten (z. B.
            Name, E-Mail-Adresse, Betreff, Nachricht) im Rahmen des
            E-Mail-Versands verarbeitet. Die Nutzung erfolgt auf Grundlage von
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
            zuverlässigen Bearbeitung von Anfragen) bzw. Art. 6 Abs. 1 lit. b
            DSGVO. Die Datenübertragung in die USA wird auf die
            Standardvertragsklauseln der EU-Kommission gestützt. Mit dem Anbieter
            besteht bzw. wird ein Vertrag zur Auftragsverarbeitung geschlossen.
            Weitere Informationen:{" "}
            <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noreferrer">
              https://resend.com/legal/privacy-policy
            </a>
            .
          </p>

          {/* 5 */}
          <h2 className="legal-h2">5. Analyse-Tools und Werbung</h2>

          <h3 className="legal-h3">Google Analytics 4</h3>
          <p>
            Diese Website nutzt, sofern Sie eingewilligt haben, Funktionen des
            Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland
            Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
            Google Analytics ermöglicht es uns, das Verhalten der
            Websitebesucher zu analysieren. Hierbei erfasst Google verschiedene
            Nutzungsdaten (z. B. aufgerufene Seiten, ungefährer Standort,
            Geräte-/Browserinformationen). Diese Daten werden u. a. genutzt, um
            Reports über die Websiteaktivität zu erstellen. Die Speicherung von
            Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen
            auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25
            Abs. 1 TTDSG). Die Einwilligung ist jederzeit widerrufbar. Die
            Datenübertragung in die USA wird auf die Standardvertragsklauseln der
            EU-Kommission gestützt; Google ist zudem unter dem EU-US Data Privacy
            Framework zertifiziert. Mehr Informationen zum Umgang mit Nutzerdaten
            finden Sie in der Datenschutzerklärung von Google:{" "}
            <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer">
              https://policies.google.com/privacy?hl=de
            </a>
            .
          </p>

          <h3 className="legal-h3">Vercel Speed Insights</h3>
          <p>
            Zur Messung der Ladeperformance (Core Web Vitals) nutzen wir Vercel
            Speed Insights, einen Dienst der Vercel Inc., USA. Dabei werden
            anonymisierte technische Kennzahlen zur Seitengeschwindigkeit erfasst
            (z. B. Ladezeiten, Gerätetyp, ungefähre Region). Der Dienst arbeitet{" "}
            <strong>cookielos</strong> und erstellt keine Nutzerprofile; es werden
            keine personenbezogenen Profile gebildet. Die Nutzung erfolgt auf
            Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
            einer schnellen, technisch fehlerfreien Website). Weitere
            Informationen:{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
              https://vercel.com/legal/privacy-policy
            </a>
            .
          </p>

          {/* 6 */}
          <h2 className="legal-h2">6. Plugins und Tools</h2>

          <h3 className="legal-h3">YouTube</h3>
          <p>
            Auf einzelnen Seiten (insbesondere in unseren Case Studies) binden
            wir Videos der Plattform YouTube ein. Betreiber ist die Google
            Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4,
            Irland. Wir nutzen YouTube im erweiterten Datenschutzmodus
            (youtube-nocookie.com). Dieser Modus bewirkt nach Angabe von YouTube,
            dass YouTube keine Informationen über die Besucher dieser Website
            speichert, bevor diese sich das Video ansehen. Sobald Sie ein
            YouTube-Video starten, wird eine Verbindung zu den Servern von
            YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche
            unserer Seiten Sie besucht haben, und es können Cookies bzw.
            vergleichbare Wiedererkennungstechnologien gesetzt werden. Die
            Nutzung von YouTube erfolgt im Interesse einer ansprechenden
            Darstellung unserer Online-Angebote (Art. 6 Abs. 1 lit. f DSGVO);
            sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die
            Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a
            DSGVO und § 25 Abs. 1 TTDSG. Die Datenübertragung in die USA wird auf
            die Standardvertragsklauseln der EU-Kommission gestützt; Google ist
            zudem unter dem EU-US Data Privacy Framework zertifiziert. Weitere
            Informationen finden Sie in der Datenschutzerklärung von Google:{" "}
            <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer">
              https://policies.google.com/privacy?hl=de
            </a>
            .
          </p>

          <h3 className="legal-h3">Vimeo</h3>
          <p>
            Sofern in unseren Case Studies Videos der Plattform Vimeo eingebunden
            sind, ist Anbieter die Vimeo Inc., 330 West 34th Street, New York,
            New York 10001, USA. Wenn Sie eine Seite mit einem eingebetteten
            Vimeo-Video aufrufen bzw. das Video starten, wird eine Verbindung zu
            den Servern von Vimeo hergestellt. Dadurch erhält der Vimeo-Server
            Informationen darüber, welche unserer Seiten Sie besucht haben, und
            Ihre IP-Adresse wird übermittelt. Die Nutzung von Vimeo erfolgt im
            Interesse einer ansprechenden Darstellung unserer Online-Angebote
            (Art. 6 Abs. 1 lit. f DSGVO); sofern eine entsprechende Einwilligung
            abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage
            von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG. Die
            Datenübertragung in die USA wird auf die Standardvertragsklauseln der
            EU-Kommission gestützt. Weitere Informationen zum Umgang mit
            Nutzerdaten finden Sie in der Datenschutzerklärung von Vimeo:{" "}
            <a href="https://vimeo.com/privacy" target="_blank" rel="noreferrer">
              https://vimeo.com/privacy
            </a>
            .
          </p>

          <h3 className="legal-h3">Google Fonts (lokales Hosting)</h3>
          <p>
            Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so
            genannte Google Fonts. Die Google Fonts sind <strong>lokal
            installiert</strong> und werden ausschließlich von unserem eigenen
            Server bereitgestellt. Eine Verbindung zu Servern von Google findet
            dabei nicht statt; insbesondere wird Ihre IP-Adresse beim Aufruf
            dieser Website nicht an Google übermittelt. Die Nutzung von Google
            Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben
            ein berechtigtes Interesse an der einheitlichen Darstellung des
            Schriftbildes auf unserer Website. Weitere Informationen zu Google
            Fonts finden Sie unter{" "}
            <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noreferrer">
              https://developers.google.com/fonts/faq
            </a>
            .
          </p>

          <p className="legal-source">In Anlehnung an Muster von e-recht24.de.</p>
        </div>
      </section>
    </main>
  );
}
