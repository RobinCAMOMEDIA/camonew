"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Arrow } from "@/components/site/Arrow";
import { useContactOverlay } from "@/components/contact/ContactOverlay";

// ---------------------------------------------------------------------------
// SITE NAV (v6 · "Gleiter")
// Desktop: logo top left, the links in one row top centre, Catch us top
// right, all set alike and floating straight on the page. An orange block
// glides to the current page; on hover the letters roll up and come back in
// orange. Below 900px: logo + orange dot → fullscreen menu that grows out
// of the dot.
// ---------------------------------------------------------------------------

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/cases", label: "Cases" },
  { href: "/records", label: "Records" },
];

const SOCIALS = [
  { href: "https://instagram.com/camo.media", label: "Instagram" },
  { href: "https://www.linkedin.com/company/camomedia/", label: "LinkedIn" },
];


// Hover roll: the word (or, in the ?v=4 preview, each letter one after
// another) rolls up and comes back in orange.
function RollLabel({ text, chars }: { text: string; chars: boolean }) {
  if (!chars) {
    return (
      <span className="cn-roll" data-text={text}>
        <span>{text}</span>
      </span>
    );
  }
  return (
    <span className="cn-chars">
      <span className="x-sr">{text}</span>
      {[...text].map((ch, c) => (
        <span key={c} className="cn-ch" data-ch={ch} style={{ "--c": c } as React.CSSProperties} aria-hidden="true">
          <span>{ch}</span>
        </span>
      ))}
    </span>
  );
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const { open: openContact } = useContactOverlay();
  const [scrolled, setScrolled] = useState(false);
  // ?v=4 motion preview: nav labels roll letter by letter
  const [chars, setChars] = useState(false);
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("v");
    setChars(v === "4" || (!v && sessionStorage.getItem("camo-vibe") === "1"));
  }, [pathname]);

  // the orange block glides to the current page
  const stackRef = useRef<HTMLElement>(null);
  const glideTo = useCallback((link: HTMLElement | null) => {
    const nav = stackRef.current;
    if (!nav) return;
    if (!link) {
      nav.style.setProperty("--gs", "0");
      return;
    }
    nav.style.setProperty("--gx", `${link.offsetLeft}px`);
    nav.style.setProperty("--gw", `${link.offsetWidth}`);
    nav.style.setProperty("--gs", "1");
  }, []);
  const glideHome = useCallback(() => {
    glideTo(stackRef.current?.querySelector<HTMLElement>(".cn__link.is-active") ?? null);
  }, [glideTo]);
  useEffect(() => {
    const t = window.setTimeout(glideHome, 50);
    document.fonts?.ready.then(glideHome);
    window.addEventListener("resize", glideHome);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", glideHome);
    };
  }, [pathname, chars, glideHome]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: "100%", y: "0%" });
  const dotRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation; lock scroll + Esc while open.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // The menu bursts out of the dot that opened it.
  const toggleMenu = useCallback(() => {
    const btn = dotRef.current;
    if (btn) {
      const r = btn.getBoundingClientRect();
      setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height / 2}px` });
    }
    setMenuOpen((o) => !o);
  }, []);

  const contact = () => {
    setMenuOpen(false);
    openContact();
  };

  return (
    <>
      <header className={`cn${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-menu" : ""}`}>
        <div className="cn__left">
          <Link href="/" className="cn-logo" aria-label="CAMO Media, Startseite">
            <span className="cn-logo__mark" aria-hidden="true" />
          </Link>
          <nav
            ref={stackRef}
            className="cn__stack"
            aria-label="Hauptnavigation"
          >
            <span className="cn-glide" aria-hidden="true" />
            {LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`cn__link${isActive(pathname, l.href) ? " is-active" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <RollLabel text={l.label} chars={chars} />
              </Link>
            ))}
          </nav>
        </div>

        <button type="button" className="cn-catch" onClick={openContact}>
          <span className="cn-catch__fill" aria-hidden="true" />
          <span className="cn-catch__label">
            <RollLabel text="Catch us" chars={chars} />
          </span>
        </button>

        {/* Mobile: menu dot */}
        <button
          ref={dotRef}
          type="button"
          className="cn-dot"
          aria-expanded={menuOpen}
          aria-controls="cn-menu"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <span className="cn-dot__x" aria-hidden="true">
              <span />
              <span />
            </span>
          ) : (
            <span className="cn-dot__label">Menü</span>
          )}
        </button>
      </header>

      {/* Fullscreen menu (orange) — a square grows from the dot. */}
      <div
        id="cn-menu"
        className={`cn-menu${menuOpen ? " is-open" : ""}`}
        style={{ "--mx": origin.x, "--my": origin.y } as React.CSSProperties}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav className="cn-menu__links" aria-label="Menü">
          {[{ href: "/", label: "Start" }, ...LINKS].map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="cn-menu__link"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="cn-menu__word">{l.label}</span>
            </Link>
          ))}
        </nav>
        <div className="cn-menu__foot">
          <button type="button" className="cn-menu__catch" onClick={contact}>
            Catch us <Arrow size={14} />
          </button>
          <div className="cn-menu__socials">
            {SOCIALS.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener">
                {s.label} <Arrow diagonal size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
