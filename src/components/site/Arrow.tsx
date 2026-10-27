// Drawn arrow icon (replaces typed "→" glyphs). Inherits currentColor;
// `diagonal` turns it into the ↗ external-link variant.
export function Arrow({ diagonal = false, size = 18 }: { diagonal?: boolean; size?: number }) {
  return (
    <svg
      className="x-arrow"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={diagonal ? { transform: "rotate(-45deg)" } : undefined}
    >
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
