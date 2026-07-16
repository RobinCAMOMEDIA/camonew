"use client";

import { useEffect, useRef } from "react";

// 3-column portrait video grid from the home hero, with staggered cross-fade
// cycling between slides — ported from the original VideoColumn logic. The
// content (videos + labels) is CMS-managed and passed in via `columns`.
export type HeroSlide = {
  videoUrl: string | null;
  brand: string;
  type: string;
};
export type HeroColumn = { slides: HeroSlide[] };

const CYCLE_DURATION = 5000;
const STAGGER_DELAY = 1500;

export function HeroVideoGrid({ columns }: { columns: HeroColumn[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cols = Array.from(grid.querySelectorAll(".hero__video-col"));
    const timers: Array<ReturnType<typeof setInterval>> = [];
    const starters: Array<ReturnType<typeof setTimeout>> = [];

    cols.forEach((col, i) => {
      const slides = Array.from(col.querySelectorAll(".hero__video-slide"));
      if (slides.length < 2) return;
      let index = 0;
      starters.push(
        setTimeout(() => {
          const id = setInterval(() => {
            slides[index].classList.remove("active");
            index = (index + 1) % slides.length;
            slides[index].classList.add("active");
          }, CYCLE_DURATION);
          timers.push(id);
        }, i * STAGGER_DELAY),
      );
    });

    return () => {
      timers.forEach(clearInterval);
      starters.forEach(clearTimeout);
    };
  }, [columns]);

  return (
    <div className="hero__video-grid-tilt-wrapper" id="hero-grid-tilt-wrapper">
      <div className="hero__video-grid reveal-scale" id="hero-video-grid" ref={gridRef}>
        {columns.map((col, ci) => (
          <div className="hero__video-col" id={`hero-col-${ci + 1}`} key={ci}>
            {col.slides.map((s, si) => (
              <div
                className={`hero__video-slide${si === 0 ? " active" : ""}`}
                data-index={si}
                key={si}
              >
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate nofullscreen"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {s.videoUrl && <source src={s.videoUrl} type="video/mp4" />}
                </video>
                <video
                  className="hero__ambient-video"
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate nofullscreen"
                  onContextMenu={(e) => e.preventDefault()}
                  aria-hidden="true"
                >
                  {s.videoUrl && <source src={s.videoUrl} type="video/mp4" />}
                </video>
                <div className="hero__case-info">
                  <div className="hero__case-brand">{s.brand}</div>
                  <div className="hero__case-type">{s.type}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
