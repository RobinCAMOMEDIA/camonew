"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceMedia } from "./ServiceScroll";

// ---------------------------------------------------------------------------
// SERVICE REEL — the /leistungen opener: all five services side by side as
// one full-width strip of tall tiles. The tile under the pointer (or focus)
// widens and shows its line; each tile jumps to its chapter below. Below
// 900px the strip becomes a horizontal snap row and nothing widens.
// ---------------------------------------------------------------------------

export type ReelItem = {
  id: string;
  title: string;
  line: string;
  media: ServiceMedia;
};

function TileMedia({ media }: { media: ServiceMedia }) {
  if (media.kind === "video")
    return (
      <video
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        aria-hidden="true"
        tabIndex={-1}
      />
    );
  if (media.kind === "cube")
    return (
      <div className="ss-cube" aria-hidden="true">
        <div className="ss-cube__body">
          {["front", "back", "right", "left", "top", "bottom"].map((f) => (
            <span key={f} className={`ss-cube__face ss-cube__face--${f}`} />
          ))}
        </div>
      </div>
    );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.src}
      alt=""
      decoding="async"
      style={media.focus ? { objectPosition: media.focus } : undefined}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}

export function ServiceReel({ items }: { items: ReelItem[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLUListElement>(null);

  // Pause the clips while the reel is off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.querySelectorAll("video").forEach((v) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className="sr" onMouseLeave={() => setActive(0)}>
      {items.map((it, i) => (
        <li
          key={it.id}
          className={`sr-tile sr-tile--${it.media.kind}${i === active ? " is-active" : ""}`}
          onMouseEnter={() => setActive(i)}
          style={{ "--i": i } as React.CSSProperties}
        >
          <a href={`#${it.id}`} className="sr-tile__link" onFocus={() => setActive(i)}>
            <span className="sr-tile__media" aria-hidden="true">
              <TileMedia media={it.media} />
            </span>
            <span className="sr-tile__scrim" aria-hidden="true" />
            <span className="sr-tile__text">
              <span className="sr-tile__title x-wide">
                {it.title}
                <span className="x-dot" aria-hidden="true" />
              </span>
              <span className="sr-tile__line">{it.line}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
