"use client";

import { useRef, useState } from "react";

// Interactive "Was wir tun" strip: disciplines as big display words. Hovering a
// word highlights it and reveals a small looping clip that follows the cursor —
// an editorial "hover-reveal list" common to creative agencies.
// `id`s mirror the footer anchors (/leistungen#social, #content, …).
const DISCIPLINES = [
  { id: "social", word: "Social Media", media: "/assets/videos/1.mp4" },
  { id: "content", word: "Content Creation", media: "/assets/videos/2.mp4" },
  { id: "film", word: "Film & Photo", media: "/assets/videos/3.mp4" },
  { id: "digital", word: "Digital Concepts", media: "/assets/videos/4.mp4" },
  { id: "strategy", word: "Culture Strategy", media: "/assets/videos/5.mp4" },
];

export function DisciplinesStrip({ kicker = "Was wir tun" }: { kicker?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = mediaRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.left = `${e.clientX - rect.left}px`;
    el.style.top = `${e.clientY - rect.top}px`;
  }

  return (
    <section className="disciplines">
      <div className="container">
        <span className="disciplines__kicker">{kicker}</span>
        <div
          className="disciplines__list"
          onMouseMove={handleMove}
          onMouseLeave={() => setActive(null)}
        >
          {DISCIPLINES.map((d, i) => (
            <div
              key={d.id}
              id={d.id}
              className={`disciplines__item${active === i ? " is-active" : ""}${
                active !== null && active !== i ? " is-dimmed" : ""
              }`}
              onMouseEnter={() => setActive(i)}
            >
              <span className="disciplines__index" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="disciplines__word">{d.word}</span>
              <span className="disciplines__arrow" aria-hidden="true">
                →
              </span>
            </div>
          ))}

          <div
            ref={mediaRef}
            className={`disciplines__media${active !== null ? " is-visible" : ""}`}
            aria-hidden="true"
          >
            {DISCIPLINES.map((d, i) => (
              <video
                key={d.id}
                className={`disciplines__media-clip${
                  active === i ? " is-current" : ""
                }`}
                src={d.media}
                muted
                loop
                playsInline
                autoPlay
                controls={false}
                disablePictureInPicture
                controlsList="nodownload noplaybackrate nofullscreen"
                onContextMenu={(e) => e.preventDefault()}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
