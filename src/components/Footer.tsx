import Link from "next/link";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";

const InstagramIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-logo" style={{ marginBottom: "0.8rem" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/camo.svg"
                alt="CAMO Media Logo"
                className="footer__logo-img"
                style={{
                  height: "22px",
                  width: "auto",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
            <p className="footer__brand-desc">
              Culture Marketing Agency aus Hamburg. Wir verbinden Marken mit
              Kultur.
            </p>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Navigation</div>
            <Link href="/#about" className="footer__col-link">
              Agentur
            </Link>
            <Link href="/leistungen" className="footer__col-link">
              Leistungen
            </Link>
            <Link href="/cases" className="footer__col-link">
              Portfolio
            </Link>
            <Link href="/jobs" className="footer__col-link">
              Jobs
            </Link>
            <Link href="/#contact" className="footer__col-link">
              Kontakt
            </Link>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Services</div>
            <Link href="/leistungen#social" className="footer__col-link">
              Social Media
            </Link>
            <Link href="/leistungen#content" className="footer__col-link">
              Content Creation
            </Link>
            <Link href="/leistungen#digital" className="footer__col-link">
              Digital Concepts
            </Link>
            <Link href="/leistungen#strategy" className="footer__col-link">
              Strategy
            </Link>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Kontakt</div>
            <a href="mailto:hello@camo.media" className="footer__col-link">
              hello@camo.media
            </a>
            <a href="tel:+4940123456" className="footer__col-link">
              +49 40 123 456
            </a>
            <span className="footer__col-link">Hamburg, Deutschland</span>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">
            © {new Date().getFullYear()} CAMO Media. Alle Rechte vorbehalten.
          </div>
          <div className="footer__legal">
            <Link href="/impressum" className="footer__legal-link">
              Impressum
            </Link>
            <Link href="/datenschutz" className="footer__legal-link">
              Datenschutz
            </Link>
            <CookieSettingsButton />
          </div>
          <div className="footer__socials">
            <a
              href="https://instagram.com/camo.media"
              className="footer__social-link"
              aria-label="Instagram"
              target="_blank"
              rel="noopener"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://linkedin.com/company/camo-media"
              className="footer__social-link"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
