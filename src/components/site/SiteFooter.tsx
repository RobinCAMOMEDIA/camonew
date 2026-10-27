import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";

// ---------------------------------------------------------------------------
// SITE FOOTER (v5) — big white wordmark left, four quiet columns right,
// legal line at the bottom.
// ---------------------------------------------------------------------------

const AGENCY = [
  { href: "/about", label: "About" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/cases", label: "Cases" },
  { href: "/records", label: "Records" },
  { href: "/jobs", label: "Jobs" },
];

const FOLLOW = [
  { href: "https://instagram.com/camo.media", label: "Instagram" },
  { href: "https://www.linkedin.com/company/camomedia/", label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="xf" id="footer">
      <div className="xf__main">
        <Link href="/" className="xf__logo" aria-label="CAMO Media, Startseite">
          <span className="xf__logo-mark" aria-hidden="true" />
        </Link>

        <div className="xf__cols">
          <nav className="xf__col" aria-labelledby="xf-agency">
            <p className="xf__title" id="xf-agency">
              Agentur
            </p>
            {AGENCY.map((l) => (
              <Link key={l.href} href={l.href} className="xf__link">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="xf__col">
            <p className="xf__title">Follow</p>
            {FOLLOW.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="xf__link"
                target="_blank"
                rel="noopener"
              >
                {l.label} <Arrow diagonal size={14} />
              </a>
            ))}
          </div>

          <div className="xf__col">
            <p className="xf__title">Schreib uns</p>
            <a href="mailto:hello@camo.media" className="xf__link">
              hello@camo.media
            </a>
            <a href="tel:+494022854474" className="xf__link">
              040 22854474
            </a>
          </div>

          <address className="xf__col">
            <p className="xf__title">Kontakt</p>
            <span className="xf__text">CAMO Media</span>
            <span className="xf__text">Wrangelstraße 100</span>
            <span className="xf__text">20253 Eimsbüttel</span>
          </address>
        </div>
      </div>

      <div className="xf__bottom">
        <span>© {new Date().getFullYear()} CAMO Media</span>
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <CookieSettingsButton />
      </div>
    </footer>
  );
}
