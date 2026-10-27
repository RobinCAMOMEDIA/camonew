"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// PROCESS TIMELINE — four steps on a vertical track. An orange fill runs down
// the track as you scroll through it; each step's square marker turns solid
// once the fill has reached it. Reduced motion → fully filled, static.
// ---------------------------------------------------------------------------

export type Step = { step: string; text: string };

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(".pt-step"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--pt-p", "1");
      items.forEach((it) => it.classList.add("is-reached"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const line = window.innerHeight * 0.6;
      const p = Math.min(Math.max((line - r.top) / r.height, 0), 1);
      el.style.setProperty("--pt-p", p.toFixed(4));
      items.forEach((it) => {
        const top = it.getBoundingClientRect().top;
        it.classList.toggle("is-reached", top < line);
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
    <ol ref={ref} className="pt">
      {steps.map((s) => (
        <li key={s.step} className="pt-step">
          <span className="pt-step__mark" aria-hidden="true" />
          <h3 className="pt-step__title x-wide">
            {s.step}
            <span className="x-dot" aria-hidden="true" />
          </h3>
          <p className="pt-step__text">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
