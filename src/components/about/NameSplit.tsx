"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// NAME SPLIT — the /about opening. "CA" over "MO", stacked like the logo.
// While the stage is pinned, scrolling reveals the missing letters in orange:
// CA·tch / MO·ments. Then the lead fades in under it. Progress lives in the
// CSS variable --ns (0 → 1). Reduced motion: shown fully opened. An optional
// portrait photo (the CAMO storefront) sits to the right of the name.
// ---------------------------------------------------------------------------

export function NameSplit({
  lead,
  image,
  imageAlt,
}: {
  lead: string;
  image?: string;
  imageAlt?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--ns", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const run = r.height - window.innerHeight; // pinned distance
      const p = run > 0 ? Math.min(Math.max(-r.top / run, 0), 1) : 1;
      el.style.setProperty("--ns", p.toFixed(4));
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
    <section ref={ref} className="ns" aria-labelledby="ns-title">
      <div className="ns__stage">
        <div className="ns__text">
        <h1 className="ns__word x-wide" id="ns-title" aria-label="CAMO steht für Catch Moments">
          <span className="ns__line" aria-hidden="true">
            <span className="ns__base">Ca</span>
            <span className="ns__add ns__add--1">tch</span>
          </span>
          <span className="ns__line" aria-hidden="true">
            <span className="ns__base">Mo</span>
            <span className="ns__add ns__add--2">ments</span>
            <span className="ns__stop" />
          </span>
        </h1>
        <p className="ns__lead">{lead}</p>
        </div>
        {image && (
          <figure className="ns__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt ?? ""} fetchPriority="high" decoding="async" />
          </figure>
        )}
      </div>
    </section>
  );
}
