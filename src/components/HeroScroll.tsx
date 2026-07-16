"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Drives a scroll-linked animation for the hero: the wrapper is taller than the
// viewport and the hero inside is sticky-pinned. As the user scrolls through the
// extra height we expose a 0→1 progress value as the CSS var `--hero-p`, which
// the hero styles use to fade the text out and glide the video wall to center.
// Disabled (no pin, no extra height) on small screens and reduced-motion.
export function HeroScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.min(
        Math.max(-wrap.getBoundingClientRect().top, 0),
        Math.max(total, 1),
      );
      const p = total > 0 ? scrolled / total : 0;
      wrap.style.setProperty("--hero-p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-scroll">
      {children}
    </div>
  );
}
