#!/usr/bin/env node
// Brand check: enforces the hard rules in BRANDGUIDE.md on the public site.
// Run: npm run brand:check   (exit 1 on any error)
// Scope: src/app/site.css, src/app/(public)/**, src/components/** (not admin).
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const walk = (d) =>
  fs.existsSync(d)
    ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
      )
    : [];

const files = [
  path.join(ROOT, "src/app/site.css"),
  ...walk(path.join(ROOT, "src/app/(public)")),
  ...walk(path.join(ROOT, "src/components")).filter((f) => !f.includes("/admin/")),
].filter((f) => /\.(css|tsx)$/.test(f));

const INKS = ["#0b0a09", "#151311", "#efebe4", "#ff7d00"];
const INK_RGB = ["11, 10, 9", "239, 235, 228", "255, 125, 0"];
const problems = [];
const add = (level, file, line, msg) =>
  problems.push({ level, where: `${path.relative(ROOT, file)}:${line}`, msg });

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");
  const isCss = file.endsWith(".css");
  const isPageCss = isCss && !file.endsWith("site.css");
  let inRoot = false;

  lines.forEach((raw, i) => {
    const n = i + 1;
    const l = raw.trim();
    if (l.startsWith("/*") || l.startsWith("*") || l.startsWith("//")) return;

    if (isCss) {
      if (/^:root\s*\{/.test(l)) inRoot = true;
      if (inRoot && l === "}") inRoot = false;

      // 0 · A token must never be defined through itself (breaks it site-wide).
      const self = l.match(/^(--[\w-]+):\s*var\((--[\w-]+)\)/);
      if (self && self[1] === self[2]) add("error", file, n, `${self[1]} verweist auf sich selbst und ist damit ungültig.`);
      // 1 · Colour: only the three inks (+ media well); rgba only from inks.
      for (const hex of l.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []) {
        if (inRoot || /mask-image/.test(l)) continue;
        if (!INKS.includes(hex.toLowerCase()))
          add("error", file, n, `Farbe ${hex} ist keine Marken-Farbe – nutze var(--x-ink|paper|orange).`);
        else add("warn", file, n, `Hex ${hex} hart codiert – nutze das Token (var(--x-…)).`);
      }
      for (const m of l.matchAll(/rgba?\(\s*(\d+,\s*\d+,\s*\d+)/g)) {
        if (!INK_RGB.includes(m[1].replace(/\s+/g, " ").replace(/,(\S)/g, ", $1")))
          add("error", file, n, `rgba(${m[1]}, …) ist keine Tönung einer Marken-Farbe.`);
      }
      // 2 · Grey text: paper below ~90 % opacity as text colour.
      const grey = l.match(/^color:\s*rgba\(239,\s*235,\s*228,\s*(0?\.\d+)\)/);
      if (grey && parseFloat(grey[1]) < 0.9)
        add("error", file, n, "Grauer Text (Paper < 90 %) – Text ist Paper, Ink oder Orange.");
      // 3 · Fonts: only via tokens; never serif.
      if (/^font-family:/.test(l) && !/var\(--(x-display|x-body|x-mono|font-body|font-display)\)|inherit/.test(l))
        add("error", file, n, "font-family nur über var(--x-display|x-body|x-mono).");
      if (/serif/.test(l) && !/sans-serif/.test(l)) add("error", file, n, "Serifen-Schrift ist verboten.");
      // 4 · Type scale: page stylesheets use the size tokens.
      if (isPageCss && /^font-size:/.test(l) && !/var\(--x-fs-|var\(--iv-|inherit|em\b/.test(l))
        add("warn", file, n, `Schriftgröße außerhalb der Skala: "${l}" – nutze var(--x-fs-…).`);
      // 5 · Shape: square or pill only.
      const r = l.match(/^border-radius:\s*([^;]+)/);
      if (r && !/^(0|0px|var\(--x-pill(,\s*999px)?\)|999px)$/.test(r[1].trim()))
        add("error", file, n, `border-radius ${r[1]} – nur 0 (eckig) oder var(--x-pill).`);
      // 6 · Depth: no drop shadows (inset outlines are fine).
      const sh = l.match(/^box-shadow:\s*([^;]+)/);
      if (sh && !/^(none|inset)/.test(sh[1].trim()) && !/^0 0 0 /.test(sh[1].trim()))
        add("warn", file, n, "Schatten – das System ist flach (nur inset-Konturen).");
    } else {
      // 7 · No typed glyph icons or emoji in markup; arrows come from <Arrow />.
      const stripped = raw.replace(/\/\/.*$/, "");
      if (/[→←↗↘✓✔★●•]|[\u{1F300}-\u{1FAFF}]/u.test(stripped))
        add("error", file, n, "Getipptes Pfeil-/Icon-Zeichen oder Emoji – nutze <Arrow /> bzw. .x-dot.");
      // 7b · No long dashes in copy (owner, 2026-10-12): use comma, colon or full stop.
      if (/[–—]/.test(stripped) && !/^\s*(\*|\{\/\*)/.test(raw))
        add("error", file, n, "Langer Strich (– oder —) im Text – nutze Komma, Doppelpunkt oder Punkt.");
      // 8 · Legacy classes.
      if (/className="(?:[^"]*\s)?(square-dot|btn|container|label|reveal)(?=[\s"])/.test(raw))
        add("error", file, n, "Legacy-Klasse (square-dot/btn/container/label/reveal) – nutze die v5-Klassen.");
      // 9 · Mono eyebrows: Plex Mono must not title or number a section.
      if (/\(0\d\)|>\s*0\d\s*</.test(raw)) add("warn", file, n, "Sieht nach Abschnittsnummer aus (01/02…) – verboten.");
    }
  });
}

const errors = problems.filter((p) => p.level === "error");
for (const p of problems) console.log(`${p.level === "error" ? "✗" : "!"} ${p.where}  ${p.msg}`);
console.log(`\nBrand check: ${errors.length} Fehler, ${problems.length - errors.length} Hinweise.`);
process.exit(errors.length ? 1 : 0);
