// Client logos in public/assets/images/cases/<file>.png – shown in the home marquee.
// `ar` is the trimmed logo's width / height; the marquee sizes every logo to the
// same visual weight (width ∝ √ar) instead of the same height. An optional
// 4th value nudges logos whose drawing is thin or airy (optical correction).
export const BRANDS = [
  ["applemusic", "Apple Music", 4.19],
  ["warnermusic", "Warner Music", 2.55],
  ["gshock", "G-Shock", 5.82],
  ["hoka", "Hoka", 3.58],
  ["zalando", "Zalando", 5.24],
  ["faxe", "Faxe", 1.63],
  ["verdi", "ver.di", 3.55],
  ["kiwi", "KIWI", 2.81],
  ["casio", "Casio", 5.29],
  ["cbw", "CBW", 2.33],
  ["breuning", "Breuning", 3.19, 1.12],
  ["crodo", "Crodo", 2.47],
  ["jägermeister", "Jägermeister", 4.74],
  ["landrover", "Land Rover", 1.90],
  ["universal", "Universal Music", 2.06, 1.3],
  ["weiterbildunghamburg", "Weiterbildung Hamburg", 5.79],
] as const;
