"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// HOME HERO (v5)
// Full-bleed showreel with "creative. culture. digital." in the lower left.
// The stage is pinned while you scroll: the video contracts into a square —
// the CAMO dot (our dots are square) — a band of text runs around its edge
// and the claim slides in left and right of it. Scroll progress → CSS variables (cheap, no layout thrash).
// Reduced motion → a plain full-screen video, no pinning.
// ---------------------------------------------------------------------------

const RING_TEXT =
  "CULTURE MARKETING AGENCY ▪ HAMBURG ▪ SOCIAL ▪ CONTENT ▪ FILM ▪ STRATEGY ▪ ";

export function HomeHero({ src }: { src: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (v: number, lo = 0, hi = 1) => Math.min(Math.max(v, lo), hi);
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const run = Math.max(el.offsetHeight - vh, 1);
      const p = clamp(-rect.top / run);
      const small = vw < 700;
      // Half the side of the final square (the "dot").
      const h1 = Math.min(vw, vh) * (small ? 0.3 : 0.2);
      const k = easeInOut(clamp(p / 0.6));
      el.style.setProperty("--xh-p", p.toFixed(4));
      el.style.setProperty("--xh-ix", `${((vw / 2 - h1) * k).toFixed(1)}px`);
      el.style.setProperty("--xh-iy", `${((vh / 2 - h1) * k).toFixed(1)}px`);
      el.style.setProperty("--xh-rend", `${h1.toFixed(1)}px`);
      el.style.setProperty("--xh-title", clamp(1 - p / 0.3).toFixed(3));
      el.style.setProperty("--xh-t", clamp((p - 0.42) / 0.3).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    el.classList.add("is-live");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="xh" id="hero" aria-labelledby="xh-title">
      <div className="xh__stage">
        <video
          className="xh__video"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          onContextMenu={(e) => e.preventDefault()}
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="xh__shade" aria-hidden="true" />

        {/* band of text running around the square */}
        <svg className="xh__ring" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path id="xh-ring-path" d="M14,14 H186 V186 H14 Z" />
          </defs>
          <text>
            <textPath href="#xh-ring-path" textLength="1376" lengthAdjust="spacing">
              {RING_TEXT}
              {RING_TEXT}
              <animate
                attributeName="startOffset"
                from="0"
                to="-688"
                dur="26s"
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>

        <p className="xh__side xh__side--l" aria-hidden="true">
          Wir machen
          <br />
          Marken
        </p>
        <p className="xh__side xh__side--r" aria-hidden="true">
          zum Teil
          <br />
          der <span className="x-nowrap">Kultur<span className="x-dot" /></span>
        </p>

        <h1 className="xh__title x-wide" id="xh-title">
          <span className="x-sr">CAMO Media, Culture Marketing Agency aus Hamburg: </span>
          {["creative", "culture", "digital"].map((word, i) => (
            <span key={word} className="xh__line">
              <span style={{ "--i": i } as React.CSSProperties}>
                {word}
                <span className="x-dot" aria-hidden="true" />
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
