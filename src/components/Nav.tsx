"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContactOverlay } from "@/components/contact/ContactOverlay";

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

// Primary navigation. Internal routes use clean Next.js paths (no .html).
const LINKS = [
  { href: "/about", label: "ABOUT US" },
  { href: "/leistungen", label: "LEISTUNGEN" },
  { href: "/cases", label: "CASES" },
  { href: "/records", label: "RECORDS" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openContact } = useContactOverlay();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <Link href="/" className="nav__logo" id="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/camo.svg"
            alt="CAMO Media"
            className="nav__logo-img"
          />
        </Link>

        <div className="nav__links" id="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav__link">
              {l.label}
            </Link>
          ))}

          <div
            className="nav__socials-wrap"
            style={{
              display: "flex",
              gap: "0.8rem",
              alignItems: "center",
              marginLeft: "var(--space-xs)",
              marginRight: "var(--space-xs)",
            }}
          >
            <a
              href="https://instagram.com/camo.media"
              className="nav__social-link"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://linkedin.com/company/camo-media"
              className="nav__social-link"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>

          <div
            className="nav__socials"
            style={{
              padding: "0 var(--space-sm)",
              margin: "0 var(--space-xs)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="nav__lang"
              style={{
                display: "flex",
                gap: "4px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <span
                className="lang-de"
                style={{ color: "var(--text-primary)", fontWeight: 700 }}
              >
                DE
              </span>
              <span style={{ color: "var(--text-muted)", opacity: 0.5 }}>/</span>
              <span className="lang-en" style={{ color: "var(--text-muted)" }}>
                EN
              </span>
            </div>
          </div>

          <button
            type="button"
            className="nav__cta"
            id="nav-cta"
            onClick={openContact}
          >
            Catch Us
          </button>
        </div>

        <button
          className={`nav__burger${menuOpen ? " active" : ""}`}
          id="nav-burger"
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`nav__mobile-menu${menuOpen ? " open" : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="nav__mobile-close"
          aria-label="Menü schließen"
          onClick={() => setMenuOpen(false)}
        >
          <span />
          <span />
        </button>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            setMenuOpen(false);
            openContact();
          }}
        >
          Catch Us
        </button>
        <div
          className="mobile-lang"
          style={{
            display: "flex",
            gap: "8px",
            fontSize: "0.9rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginTop: "1rem",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
            DE
          </span>
          <span style={{ color: "var(--text-muted)", opacity: 0.5 }}>/</span>
          <span style={{ color: "var(--text-muted)" }}>EN</span>
        </div>
      </div>
    </>
  );
}
