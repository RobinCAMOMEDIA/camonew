# CAMO Brand-Guide

Dieser Guide ist eine verbindliche Vorgabe für jede neue Section, jede neue Seite und jede Änderung an der öffentlichen Website. Er gilt nicht für den Admin-Bereich unter `/admin`.

- `DESIGN.md` beschreibt das System ausführlich.
- `PRODUCT.md` hält die Fakten fest: was stimmt und was nicht erfunden werden darf.
- Die Tokens selbst stehen oben in `src/app/site.css`.

**Vor jeder Abgabe:** `npm run brand:check` muss 0 Fehler melden.

---

## 1. Farbe: drei Farben, sonst nichts

| Token | Wert | Wofür |
|---|---|---|
| `--x-ink` | #0B0A09 | Grundfläche, Text auf Orange, Pills |
| `--x-paper` | #EFEBE4 | Text auf Ink, helle Bänder (max. eins pro Seite) |
| `--x-orange` | #FF7D00 | Akzent: Punkte, Marker, aktive Zustände, Abschluss-Band |
| `--x-ink-2` | #151311 | **nur** als Hintergrund hinter Bildern/Videos, die laden |
| `--x-dim` | Paper 55 % | **nur** winzige Meta-Zeilen (Footer-Rechtliches) |

- **Kein grauer Text.** Text ist entweder Paper, Ink oder Orange.
- Keine weiteren Farben, keine Verläufe als Deko, keine grauen Flächen und keine Karten-Hintergründe.
- Auf Orange gilt: Text, Punkte und Markierung sind Ink, die Textauswahl ist Ink auf Orange. Dazu bekommt die Section `data-ground="orange"`; dann färbt sich der Cursor und `.x-dot` automatisch.
- Farben stehen nie hart im Code, immer als `var(--x-…)`.

## 2. Schrift: Archivo, sonst nichts

- **Display:** Archivo mit Breite 125 % (`.x-wide`), Gewicht 800/900, GROSSBUCHSTABEN, enge Laufweite (−0.02 bis −0.035em).
- **Fließtext:** Archivo in normaler Breite, 400–600.
- **IBM Plex Mono:** nur für winzige Meta-Wörter bis 13px, z. B. im Intro oder im Text-Ring der Startseite. Nie als Überschrift, nie als Nummerierung.
- **Verboten:** Serifen, Space Grotesk, Inter und Emojis als Schmuck.

### Schriftgrößen-Skala

Andere Größen gibt es nicht. In Seiten-CSS steht immer ein Token.

| Token | Größe | Einsatz |
|---|---|---|
| `--x-fs-display` | 3–6rem | nur Startseiten-Statement und /about-Fragen |
| `--x-fs-h2` | 1.9–3.4rem | **jeder** Seitentitel, Section-Titel und Abschluss (`.x-h2`) |
| `--x-fs-title` | 1.4–2.3rem | Element-Köpfe: Kundenname, Job-Titel, Prozess-Schritt |
| `--x-fs-subtitle` | 1.15–1.7rem | kleinere Element-Köpfe, Rechtstexte-H2 |
| `--x-fs-item` | 1–1.35rem | Kachel-Titel, Mehr-Links, Mail-Links |
| `--x-fs-lead-lg` | 19–24px | lange Stimme (/about-Antworten, Case-Story, Jobs-Intro) |
| `--x-fs-lead` | 16–18px | der Absatz direkt unter einem Titel (`.x-lead`) |
| `--x-fs-input` | 17–20px | Formularfelder |
| `--x-fs-body` | 15–17px | Listen, Kartentext, Schritt-Text, Rechtstexte |
| `--x-fs-small` | 14px | Datenschutz-Zeilen, Fußnoten |
| `--x-fs-label` | 13px | Feld-Labels, Chips (`.x-label`) |
| `--x-fs-meta` | 11px | Plex-Mono-Meta |

**Regel „Eine Stimme“:** Pro Seite ruft nur der Titel ganz oben. Alle Section-Titel sind `.x-h2`, und **nichts** wird größer als `--x-fs-h2`. Die einzigen Ausnahmen: die Startseite und die /about-Fragen. Der Kunde will keine riesige Schrift.

**Textbreite:** Leads höchstens 44ch, Fließtext höchstens 65ch.

## 3. Abstände

| Token | Wert | Einsatz |
|---|---|---|
| `--x-gutter` | 16–40px | linker und rechter Seitenrand, immer |
| `--x-gap` | 16–32px | Spaltenabstand im 12er-Raster |
| `--x-sp-hero-top` | 160–210px | Abstand der ersten Section nach oben (Platz für die Nav) |
| `--x-sp-section` | 110–190px | Abstand zwischen Sections |
| `--x-sp-close` | 80–140px | Innenabstand des orangen Abschluss-Bands |
| `--x-sp-head` | 36–56px | Abstand vom Section-Titel zum Inhalt |

- Sections werden **nur durch Abstand** getrennt. Keine Linien, keine Rahmen, keine Hintergrundboxen.
- Über einer Überschrift steht immer mehr Abstand als darunter.
- Raster: 12 Spalten in `--x-gutter` mit `--x-gap`. Kompositionen sind asymmetrisch, z. B. Titel 6–7 Spalten und Lead 4–5 Spalten rechts.

## 4. Form

- **Alles ist eckig** (Radius 0): Bilder, Marker, Buttons-Seeds, Chips, Cursor.
- **Die Pill** (`--x-pill`) gibt es nur für die Nav-Leiste, die Catch-us-Buttons und die Consent-Buttons.
- **Der Punkt ist ein Quadrat:** Jede Überschrift endet mit `<span className="x-dot" />`, nie mit einem getippten „.“. Das letzte Wort und der Punkt stehen zusammen in `<span className="x-nowrap">`.
- **Keine Schlagschatten.** Erlaubt sind nur Konturen mit `inset`. Einzige dokumentierte Ausnahme: das Screen-Fenster auf /leistungen.
- **Pfeile:** immer die Komponente `<Arrow />` (diagonal für externe Links). Nie getippte Zeichen wie → ↗ ✓.

## 5. Komponenten zum Wiederverwenden

Erst nehmen, was es schon gibt; nur bauen, was fehlt.

| Baustein | Klasse / Komponente |
|---|---|
| Section-Titel | `<h2 className="x-h2">Titel <span className="x-nowrap">Wort<span className="x-dot"/></span></h2>` |
| Lead | `<p className="x-lead">` |
| Label | `.x-label` |
| Großer Button | `<CatchUsButton />`; für Links: `<a className="x-pill">` mit `x-pill__fill` und `x-pill__label`. Auf Ink-Grund `x-pill--light`. |
| Mehr-Link (Zweitaktion) | `<a className="x-more"><span>Text</span><span className="x-more__dot"><Arrow/></span></a>`: eckiger Rahmen, Orange wischt beim Hover von links rein |
| Abschluss | Section mit `data-ground="orange"`, `x-h2`-Frage, `<CatchUsButton/>` und Mail-Link |
| Bild/Video-Rahmen | `overflow:hidden`, `background: var(--x-ink-2)`, `object-fit: cover`, festes Seitenverhältnis (3:4, 4:5, 4:3, 16:9, 21:9) |
| Liste | eckiger 6–10px Marker in Orange (`::before`), kein Bullet |
| Kontakt | `useContactOverlay().open()` öffnet das Catch-us-Formular |

## 6. Inhalt und Wahrheit

- **Keine erfundenen Zahlen, Kunden, Awards, Zitate oder Versprechen.** Zahlen kommen nur vom Inhaber.
- **Keine KI-Bilder.** Jedes ausgelieferte Bild trägt seine Herkunft: Beim JPEG-Export kommt ein Kommentar `ORIGIN: …` mit hinein.
- **Keine Mono-Eyebrows** („(01) Section“), keine Abschnittsnummern, keine Bildunterschriften, keine Deko-Trennlinien.
- **Videos:** stumm, Autoplay, `playsInline`, `aria-hidden`, kein Download, kein Rechtsklick (`onContextMenu` preventDefault, `controlsList="nodownload …"`).
- **Sprache:** Deutsch, direkt, ein bisschen Straße, gendern mit „:innen“.
- **Keine langen Striche** (– oder —) in Texten, Titeln oder Meta-Daten. Stattdessen Komma, Doppelpunkt oder Punkt; in Seitentiteln `|`. Telefonnummer: `040 22854474`.
- **Cases** kommen immer aus dem CMS (Convex) und werden nie im Code festgeschrieben.

## 7. Bewegung

- Pro Seite gibt es **einen** besonderen Moment, z. B. Hero-Video, Sticky-Frame oder Stempel. Alles andere erscheint nur: `data-appear` gibt 30px Aufstieg.
- Easing: `var(--x-ease)` für Bewegung, `var(--x-ease-io)` für Wipes. Dauer 0.5–0.9s.
- Jede Animation hat einen Ruhezustand unter `@media (prefers-reduced-motion: reduce)`.
- Animiert werden nur `transform`, `opacity`, `clip-path`, `scale` und `translate`. Nie `width`, `height`, `margin` oder `top`.

## 8. Rhythmus: keine gleichförmigen Seiten

Der Kunde mag es nicht, wenn jede Section gleich aussieht. Deshalb gilt:

- Nicht zweimal hintereinander „Text links, Bild rechts“.
- Pro Seite höchstens **ein** helles Paper-Band.
- Jede Unterseite endet mit dem orangen Abschluss. Ausnahme: die Startseite (Owner-Wunsch, zu groß); dort führen Nav-„Catch us“ und Footer zum Kontakt.
- Pro Seite gibt es mindestens ein Element mit voller Breite oder ein besonderes Element: Bildband, Reel, Bildwand oder Video.

## 9. Responsive

- Breakpoints: 1100, 900, 700, 560 und 520px. Ab 900px abwärts stapelt alles auf 12 Spalten.
- Reihen aus mehreren Bildern werden auf dem Handy zum horizontalen Snap-Streifen mit `scroll-padding-inline: var(--x-gutter)`.
- Auf 390px darf nichts horizontal scrollen. Lange Wörter in Titeln prüfen, z. B. „RECHTSSICHERHEIT“.

## 10. Checkliste für jede neue Section

1. Nur Tokens: Farbe, Schriftgröße und Abstand stehen als `var(--x-…)`.
2. Der Titel ist `.x-h2` und endet mit `.x-dot`.
3. Kein grauer Text, keine Linie, kein Schatten, keine Rundung (außer Pill).
4. Echte Bilder mit ORIGIN, keine erfundenen Fakten.
5. Hover- und Fokus-Zustand sind da; der Fokus ist ein 2px-Outline in Orange, auf Orange in Ink.
6. Reduced-Motion-Fallback ist eingebaut.
7. Screenshots bei 1440 und bei 390px geprüft.
8. `npm run brand:check` meldet 0 Fehler.

## Dateien

| Was | Wo |
|---|---|
| Tokens, Reset, globale Komponenten | `src/app/site.css` |
| Seiten-Styles | neben der Seite, z. B. `src/app/(public)/records/records.css` |
| Rechtliches und Jobs | `src/app/(public)/legal.css` |
| Admin | `src/app/admin.css` (eigene Tokens, nicht Teil dieser Regeln) |
| Gemeinsame Komponenten | `src/components/site/`: Nav, Footer, Arrow, CatchUsButton, Cursor, Grain, Intro, AppearObserver |
