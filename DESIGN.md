---
name: CAMO Media
description: Culture Marketing Agency, Hamburg. A three-ink poster world in which wide uppercase Archivo shouts and orange squares mark the beat.
colors:
  ink: "#0B0A09"
  paper: "#EFEBE4"
  orange: "#FF7D00"
  ink-well: "#151311"
  paper-dim: "rgba(239, 235, 228, 0.55)"
typography:
  display:
    fontFamily: "Archivo, Arial Black, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8.4vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, Arial Black, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.4vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, Arial Black, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.2vw, 2.3rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(19px, 1.65vw, 24px)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  answer:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(18px, 1.45vw, 22px)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(16px, 1.2vw, 18px)"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "Archivo, Arial Black, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 800
    letterSpacing: "0.03em"
    fontVariation: "'wdth' 125"
  label:
    fontFamily: "Archivo, Arial Black, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 800
    letterSpacing: "0.03em"
    fontVariation: "'wdth' 125"
  meta:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 2.6vw, 40px)"
  column-gap: "clamp(16px, 2vw, 32px)"
  hero-top: "clamp(150px, 19vh, 200px)"
  section: "clamp(110px, 13vw, 200px)"
  section-wide: "clamp(130px, 15vw, 230px)"
  close: "clamp(90px, 11vw, 160px)"
components:
  button-catch-us:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "22px 36px 22px 60px"
  button-catch-us-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  nav-catch-us:
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "13px 20px 13px 38px"
  nav-catch-us-hover:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
  nav-pill-scrolled:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "10px 26px 10px 22px"
  menu-dot:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "54px"
  sticky-frame:
    backgroundColor: "{colors.ink-well}"
    rounded: "{rounded.none}"
    aspectRatio: "4 / 5"
  screen-mat:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "9%"
  more-link-square:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "48px"
  orange-close:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "clamp(90px, 11vw, 160px) clamp(16px, 2.6vw, 40px)"
  media-well:
    backgroundColor: "{colors.ink-well}"
    rounded: "{rounded.none}"
---

# Design System: CAMO Media

## Overview

**Creative North Star: "The Three-Ink Poster"**

CAMO's public world is printed in three inks, the way a street poster or a kiosk flyer is: near-black ink, warm paper white, and one orange. There are no grey surfaces, gradients-as-decoration, cards, shadows or divider lines. Hierarchy comes from scale and width alone. Archivo's width axis is pushed to 125% for everything that shouts, in 800/900 uppercase with tight negative tracking, and running text drops back to Archivo at normal width, so one family carries the whole voice.

The orange square is the signature. It is the dot of the CAMO wordmark, and it recurs as the full stop on every headline, the speaker marker in an answer, the bullet in a list, the marker on a timeline step, the tick of the active service, the cursor, the mobile menu trigger and the seed that floods a button on hover. Squares stay square. The only rounded form in the system is the pill of the nav chrome and the Catch-us buttons, which makes those two read as interface rather than motif.

Pages flow as one ink field broken by at most one paper band (ink text on paper, used for a statement or the scale cards so neighbouring sections never feel alike): a first viewport that states one big thing, type-led sections separated only by generous space, and an orange close that hands the visitor the "Catch us" action. Footage is real and decorative, set flush in hard-edged frames. Motion is reserved: each surface owns one authored moment, and everything else only appears.

**Key Characteristics:**
- Three inks only (ink, paper, orange); translucent paper and a near-ink media well are tints, never new colours.
- Archivo Expanded (wdth 125) 800/900 uppercase for display; Archivo at normal width for reading.
- Square orange dots end headlines and mark speakers, bullets and toggles.
- Pill shape only for nav chrome and Catch-us buttons.
- No cards, shadows, divider lines, mono eyebrows, section numbers or captions.
- One authored motion moment per surface, each with a reduced-motion fallback.

## Colors

A strict three-ink print palette: one warm near-black ground, one warm off-white, one hot orange.

### Primary
- **Signal Orange** (orange): the brand accent. Headline dots, the active service word and the swapped hero word, speaker and bullet squares, the timeline markers and active service tick, the cursor, the mobile menu trigger, the active nav link, link hovers, focus outlines (2px), text selection, and the full-bleed close section where it becomes the ground and ink becomes the text.

### Neutral
- **Press Ink** (ink): the page ground everywhere, the fill of the scrolled nav pill and the Catch-us button, and the text colour on orange.
- **Newsprint Paper** (paper): all text and the wordmark on ink, plus the hover flood of the Catch-us button on an orange close.
- **Ink Well** (ink-well): only behind media frames (video, photo and case slots) while they load or wait for owner material. It is never a section, card or panel surface.
- **Faded Paper** (paper-dim): paper at 55% for secondary meta only, such as the footer legal row, the intro meta words and case subtitles.

### Named Rules
**The Three-Ink Rule.** Ink, paper and orange are the only colours. Tints of those inks are allowed for media underlays and quiet meta. There is no fourth hue, no grey fill surface, and no second accent.

**The Inversion Rule.** On an orange field, ink takes over as the text and selection colour (selection becomes ink on orange). Orange never sets text on orange, and paper is never used as running text on orange.

## Typography

**Display Font:** Archivo at width 125% (with Arial Black, system-ui fallback)
**Body Font:** Archivo at normal width (with system-ui fallback)
**Label/Mono Font:** IBM Plex Mono, for tiny meta words only

**Character:** One grotesk family in two widths. The expanded cut is loud, flat and poster-like, and the normal cut reads plainly. Accent words change colour to orange; they never change family. All fonts are self-hosted through next/font.

### Hierarchy
- **Display** (900, clamp(3rem, 8.4vw, 6rem), line-height 0.9, uppercase): the home first-viewport statement and the /about name (CA/MO opening into CAtch MOments, tracking -0.035em). The owner ruled on 2026-10-05 that the type was too big: on /leistungen the hero title and the orange close both sit at the headline tier (800, clamp(1.9rem, 3.4vw, 3.4rem)), and new surfaces follow that calmer ceiling.
- **Headline** (800, clamp(1.9rem, 3.4vw, 3.4rem), line-height 0.95, uppercase): every ordinary section title, through the shared section-title class.
- **Title** (800–900, clamp(1.4rem, 2.2vw, 2.3rem), line-height 1, uppercase): item heads such as process steps, chain steps and case client names.
- **Lead** (500, clamp(19px, 1.65vw, 24px), line-height 1.4): the one paragraph that follows a statement; max about 34–40ch.
- **Answer** (400, clamp(18px, 1.45vw, 22px), line-height 1.5): long-form voice text on /about and the closes; max 40ch.
- **Body** (400, 16–18px, line-height 1.5): lists, step text and footer links; max about 28–36ch in columns.
- **Label** (700–800 wide, 12–16px, +0.02–0.03em, uppercase): nav links, the Catch-us buttons and the "more" links.
- **Meta** (Plex Mono 400, 8–13px, +0.06–0.12em, uppercase): tiny ambient words only, such as the intro corners, the ring of text around the home dot and the mobile-menu contact row.

### Named Rules
**The One-Shout Rule.** Each surface has one shouting statement at the top and may answer it once, in the orange close. Everything between uses the headline tier. The /about name is the recorded exception: the two-line wordmark CA/MO is the page's one shout and is set in the display tier; everything after it is headline tier.

**The Square-Stop Rule.** A headline ends in an orange square (0.17em, set as an element), never a typed period. Keep the last word and the square together on one line.

**The Mono-Whisper Rule.** Plex Mono only ever whispers: ambient words at 13px or smaller. It never introduces a section, numbers a section or captions an image.

## Layout

The grid is a 12-column layout inside a fluid page gutter (clamp(16px, 2.6vw, 40px)) with a column gap of clamp(16px, 2vw, 32px). Compositions are deliberately asymmetric. Statements take the left 7–8 columns and answers or leads sit in the right 4–5; media and text trade sides between sections. Sections are separated only by space: about 110–230px of top padding and no borders. The first viewport starts about 150–200px down to clear the stacked nav, and the orange close is a full-bleed band with clamp(90px, 11vw, 160px) of padding.

Image-led sections carry the page: every service, scale card and step has a picture, footage or a drawn demonstration beside calm text. Overflow is clipped horizontally with `clip`, not `hidden`, so sticky elements keep working.

Responsive behaviour: at 900px and below, everything stacks to the full 12 columns; the nav collapses to the wordmark plus the orange menu square; horizontal media chains become snap-scrolling strips that bleed off the right edge; and the four-up grids drop to two (one column at 520–560px). The footer reflows at 1100px. Breakpoints in use are 1100, 900, 700, 560 and 520px.

## Elevation & Depth

The system is completely flat. There are no drop shadows, no glass and no layered cards. Depth comes from three things only: full-bleed footage behind type (with a soft ink scrim on the home hero video so the claim stays legible), the ink-well underlay behind media frames, and z-order chrome (the fixed nav, the fullscreen orange menu and the cursor). The two inset box-shadows in the build are drawing tools, not elevation: one outlines the hollow "Local" square, and one shades the faces of the 3D cube.

### Named Rules
**The Flat-Print Rule.** Nothing floats. If an element needs separation, give it space or invert it to orange; never give it a shadow, border or tinted card.

## Shapes

All forms are hard rectangles with 0 radius: media frames, the orange squares, the toggle, the menu trigger and the cursor. The square is the brand geometry and comes in three sizes: a type-relative stop (0.17–0.55em), an interface square (42–56px) and the cursor (10px at rest, 46px on hover). A hollow square (2px orange outline) is the variant used when a second marker must differ from the first, as in Brand (solid) versus Local (hollow).

The single exception is the pill (999px), reserved for the Catch-us buttons in the pages and the consent buttons; the nav has no pill. Even inside a pill, the hover seed is a square.

Media frames use fixed aspect ratios: 3:4 or 4:5 portraits, 16:9 or 2:1 landscape clips, and a 16:10 crew wall. Footage is always cropped with `object-fit: cover` and is never rounded.

## Components

### Buttons
Two pill-shaped actions carry "Catch us", and both open the contact overlay.
- **Shape:** full pill (999px).
- **Catch-us button (large):** ink fill, paper text, expanded 800 uppercase at 16px, padding 22px 36px 22px 60px. An orange 12px square sits in the left padding.
- **Hover / Focus:** the square scales up (about 40×) and floods the pill. On an orange close it floods paper, and the text turns ink. Focus is a 2px ink outline offset by 4px.
- **Nav Catch-us:** set exactly like the nav links (expanded 700 uppercase, 12px) with a 7px orange square in front. Hover rolls the letters like the links. Clicking it drops the orange Catch-us sheet down from the top edge like a blind; closing rolls it back up.

### More link
- **Style:** the secondary action. A square-cornered frame (2px inset outline in currentColor, padding 16px 20px 15px 22px) holding an expanded 800 uppercase label at 13px and an orange drawn arrow.
- **Hover / Focus:** orange wipes in from the left (clip-path), the text and arrow turn ink and the arrow nudges 4px right. Nothing rotates (the owner disliked the earlier tipping square).

### Navigation
- **Desktop (Gleiter nav):** the CAMO wordmark top left, the four links in one row top centre and Catch us top right, all floating straight on the page with no plate or pill, also when scrolled. Links are expanded 700 uppercase at 12px. An orange block glides to the current page and rests behind it (the label turns ink). Hovering rolls the letters up one after another and brings them back in orange.
- **Mobile (≤900px):** the wordmark plus a 54px orange square labelled MENÜ. The square opens a fullscreen orange menu that wipes in as a circle from the tap point, with the link words set in display 900.
- **Focus:** a 2px orange outline offset by 4px on every nav control.

### Service Scroll (signature, /leistungen)
The services read as a sticky story. The left 6 columns hold one block per service (min-height 78vh): a headline-tier title (orange while active), a lead, the Brand/Local lines and a two-column offer list with 6px orange square bullets. The right 5 columns hold one 4:5 frame that pins about centred, never higher than 100px from the top, and cross-fades (0.7s) to the media of the service nearest the viewport centre. A tick strip of 10px squares on an ink plate shows the position. Below 900px nothing pins; each block shows its own media inline at 16:10. Media render only for the active layout, so a clip never loads twice.

### Screen frame
A website shown as work is never placed raw on the page. It sits on an orange mat (9% padding) inside an ink browser window with a bar of three small squares and a soft shadow, cropped to 16:10 and clear of any duplicated nav.

### Process timeline
A sticky aside (headline plus lead, left 5 columns) beside a vertical track in the right 6 columns. A thin paper track at 18% opacity carries an orange fill that grows with scroll; each step's 14px square marker turns solid orange once the fill reaches it. Step titles use the title tier.

### Arrow icon
Arrows are drawn: an SVG stroke in currentColor (the `Arrow` component), used inside the 48px orange square of the more-link, in the mobile-menu Catch us, and rotated -45° for external links in the footer. Typed arrow glyphs are not used.

### Speaker and scale markers
An inline orange square (0.5–0.55em) leads a bold name or audience at the start of a paragraph and runs into the text at the same size. Solid squares mark CAMO or Brand, and the hollow square marks Local. These are inline markers, not labels above the text.

### Orange Close
Every surface built in this world ends in a full-bleed orange band. It holds a display-tier question that ends in an ink square (for example "Catch us."), an optional lead, and a row containing the Catch-us pill and the email as an underlined expanded link. The underline retracts on hover.

### Catch-us sheet (global contact overlay)
Opening it fills the whole screen with orange, growing as a square (clip-path inset) from the click point. The owner asked for a classic form in the site's style, not a sentence form (2026-10-05), so it is laid out in two columns:
- **Left:** the headline-tier title "Catch us" with an ink square stop, a one-line lead, and the mail and phone links.
- **Right:** labelled fields (Name and E-Mail side by side, then Marke/Firma (optional) and Nachricht). Labels are 13px expanded uppercase; inputs are plain text on a 3px ink underline that turns paper on focus. Below them sit the ink send pill and the privacy line.

The close control is a 54px ink square with an orange X. The square-marker chips (`.cto__topic`) are still used by the Records booking form.

### Offer frames (/records)
Four 3:4 portrait frames in a row (the owner rejected the setlist rows), every other one stepped down. Under each frame: a 10px orange square, the offer in expanded 800 uppercase, and one line of body text. On hover the image zooms to 1.05 and the title turns orange. Below 900px the frames become a horizontal snap strip (74vw per frame).

### Service reel (/leistungen opener)
Five tall tiles across the full width. The active tile widens to 3.2× and shows its line; inactive tiles are greyscale and dimmed. Each tile links to its chapter and uses different footage than the chapter below it. Below 900px the reel becomes a horizontal snap strip.

### Case sheet (/cases)
The page opens with an edge-to-edge campaign image band under the nav, clamp(460px, 68svh, 720px) tall, with an ink scrim at its foot. The title sits bottom-left in the image, and the lead plus "Zu den Arbeiten" sit bottom-right, so the first cases peek into the first viewport. Then the grid: Two 4:3 frames per row, with the right column stepped down like a contact sheet. Under each frame: the client in the title tier with a square stop, the title in body text, and the type and year as an orange expanded label. Hovering a frame reveals an orange square holding a diagonal arrow. A case without an image shows its client name in ink on an orange field. Filter chips appear only when two or more categories are present. Everything comes from the CMS.

### Media frames
Hard-edged footage on an ink-well underlay. Clips are muted, autoplaying and decorative (aria-hidden), with no controls, picture-in-picture or context menu. Cyclers cross-fade over 0.8s. A frame may zoom to 1.05 on hover over 0.9s.

### Motion grammar
- **Easing:** expo-out (cubic-bezier(0.19, 1, 0.22, 1)) for most movement and ease-in-out (cubic-bezier(0.76, 0, 0.24, 1)) for wipes and unfolds. Durations run 0.5–0.9s.
- **Shared, ambient motion:** an intro in which the orange square scales to fill the screen and wipes up once per session; lines rising out of a mask at the first viewport; sections appearing with a 30px rise; and the nav letter roll.
- **Motion layer (VibeLayer, every page):** Lenis smooth scrolling; a living ink background with a slow, soft orange glow and a subtle static grain (background layer only); titles, leads and appearing elements tilt slightly as if on a drum while they scroll (case cards excepted); pages arrive out of a soft blur. Reduced motion turns all of it off.
- **Authored moment, one per surface:** home, the hero video contracting into the CAMO square on scroll; /about, the name opening up: CA over MO (pinned) with orange "tch" and "ments" wiping in, then the lead; /leistungen, the sticky frame cross-fading from service to service as the text scrolls past (the opener reel widens on hover as interaction, not as a second scroll moment); /records, the live video hero and the turning stamp; /cases, the staggered frames rising in; the Catch-us sheet, growing as a square from the click point.
- **Cursor:** a 10px orange square that follows the pointer through the CSS `translate` property, never `transform`, because the `scale` property would otherwise scale its position as well. It turns ink over orange grounds (`data-ground="orange"`).
- **Reduced motion:** every one of these has a static fallback, either in CSS or by checking `matchMedia` in JS.

## Do's and Don'ts

### Do:
- **Do** use only ink, paper and orange, and set the ink-well colour only behind media.
- **Do** end headlines with the square orange dot element, never a typed period.
- **Do** set display, headline, title and label text in Archivo at width 125, 800–900, uppercase, with tight negative tracking. Set running text in Archivo at normal width.
- **Do** keep the pill (999px) for nav chrome and Catch-us buttons, and keep every other shape square.
- **Do** close each surface with the orange band and a Catch-us pill, so an enquiry is always one step away.
- **Do** give each surface exactly one authored motion moment, and ship its reduced-motion fallback with it.
- **Do** use a 2px orange focus outline on ink, or a 2px ink outline on orange.

### Don't:
- **Don't** use a serif typeface, including for accent words. Accent words switch to orange only.
- **Don't** add mono eyebrows like "(01) Section", section numbers, image captions or decorative divider lines.
- **Don't** round a dot, bullet, toggle or marker. Dots are always square.
- **Don't** use grey fill surfaces, cards, drop shadows, glass or a second accent hue.
- **Don't** set a section title larger than the headline tier. The display tier belongs to the home opening statement and the /about name; new surfaces keep even their hero and close at the headline tier.
- **Don't** use text glyphs (→, ↗) as icons inside the orange squares. Use the drawn `Arrow` component.
- **Don't** use AI-generated imagery, and never present a placeholder as CAMO work. Every shipped raster carries its origin (embedded ORIGIN text): real CAMO stills, owner-confirmed BTS, or screenshots of CAMO's own site.
- **Don't** reintroduce the pre-v5 language (Space Grotesk/Inter, grey surfaces, rounded cards). legacy.css and page-extras.css were deleted on 2026-10-05; every public route, including Jobs and the legal pages, now runs on site.css tokens. The binding rules are in BRANDGUIDE.md, enforced by `npm run brand:check`.
