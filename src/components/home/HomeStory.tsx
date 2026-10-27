"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// HOME STORY — after the bending hero: a pinned stage where the About text
// settles in the centre while real footage frames fly out of the depth past
// the viewer (perspective).
// Frame transforms are computed per frame in JS from one scroll progress.
// Reduced motion: no pin, the text alone, no frames.
// ---------------------------------------------------------------------------

export type StoryFrame = { src: string; kind?: "image" | "video" };

// Screen anchors for the frames (x, y in % of the stage, from the centre).
const SLOTS: [number, number][] = [
  [-36, -20], [35, 18], [-38, 24], [36, -24], [-30, -30], [31, 30],
  [-40, 4], [40, -6], [-33, 30], [33, -30], [-39, -12], [38, 10],
];

export function HomeStory({
  frames,
  children,
}: {
  frames: StoryFrame[];
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(".hs__frame"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-static");
      return;
    }
    el.classList.add("is-live");
    const clamp = (v: number, lo = 0, hi = 1) => Math.min(Math.max(v, lo), hi);
    let raf = 0;
    let ps = -1;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const run = Math.max(el.offsetHeight - window.innerHeight, 1);
      const target = clamp(-r.top / run);
      // ease towards the scroll position for an inertial, smooth glide
      const k = document.documentElement.classList.contains("vibe") ? 0.3 : 0.085;
      ps = ps < 0 ? target : ps + (target - ps) * k;
      if (Math.abs(target - ps) < 0.0004) ps = target;
      else raf = requestAnimationFrame(update);
      const p = ps;
      el.style.setProperty("--hs", p.toFixed(4));
      // entrance before the pin (with the motion layer): 0 until the stage is a
      // quarter screen away, 1 once it locks; by then the hero has left
      const pre = clamp(1 - r.top / (window.innerHeight * 0.25));
      el.style.setProperty("--hs-in", (pre * pre * (3 - 2 * pre)).toFixed(3));
      // already half there when the stage arrives, so the hand-over is never empty
      el.style.setProperty("--hs-text", clamp(0.4 + p / 0.05).toFixed(3));

      const n = items.length;
      items.forEach((it, i) => {
        // each frame lives in its own window inside .24 → 1
        const start = 0.02 + (i / n) * 0.78;
        const t = (p - start) / 0.3; // 0 → 1 across its pass
        if (t <= 0 || t >= 1) {
          it.style.opacity = "0";
          it.style.visibility = "hidden";
          return;
        }
        it.style.visibility = "visible";
        const [sx, sy] = SLOTS[i % SLOTS.length];
        const fade = Math.min(t / 0.15, (1 - t) / 0.12, 1);
        it.style.opacity = fade.toFixed(3);
        const z = -1600 + t * 2200; // from deep behind to just past the screen
        const tilt = sx < 0 ? 14 : -14;
        it.style.transform = `translate(-50%, -50%) translate3d(${sx}vw, ${sy}vh, ${z}px) rotateY(${tilt * (1 - t)}deg)`;
      });
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
    <section ref={ref} className="hs" aria-label="About us">
      <div className="hs__stage">
        <div className="hs__frames" aria-hidden="true">
          {frames.map((f, i) => (
            <figure key={f.src + i} className={`hs__frame hs__frame--${i % 3}`}>
              {f.kind === "video" ? (
                <video
                  src={f.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={false}
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  tabIndex={-1}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.src} alt="" loading="lazy" decoding="async" />
              )}
            </figure>
          ))}
        </div>

        <div className="hs__text">{children}</div>
      </div>
    </section>
  );
}
