"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// SERVICE SCROLL — the services read as a sticky story: on the left each
// service scrolls past as its own block; on the right one large media frame
// stays pinned and cross-fades to the service currently being read.
// Below 900px there is no pinning: each block shows its media inline.
// ---------------------------------------------------------------------------

export type ServiceMedia = {
  kind: "video" | "image" | "cube" | "screen";
  src?: string;
  /** CSS object-position, e.g. to keep a screenshot's left column in view */
  focus?: string;
};

export type Service = {
  id: string;
  title: string;
  lead: string;
  offer: string[];
  brand: string;
  local: string;
  media: ServiceMedia;
};

function Cube() {
  // A live 3D object in the CAMO square – shows "3D" without passing off
  // someone else's rendering as CAMO work.
  return (
    <div className="ss-cube" aria-hidden="true">
      <div className="ss-cube__body">
        {["front", "back", "right", "left", "top", "bottom"].map((f) => (
          <span key={f} className={`ss-cube__face ss-cube__face--${f}`} />
        ))}
      </div>
    </div>
  );
}

function Media({ media, active = true }: { media: ServiceMedia; active?: boolean }) {
  if (media.kind === "cube") return <Cube />;
  if (media.kind === "screen")
    // A website shown as a screen: orange mat, ink browser bar, then the page.
    return (
      <div className="ss-screen">
        <div className="ss-screen__window">
          <div className="ss-screen__bar">
            <span />
            <span />
            <span />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.src}
            alt=""
            loading="lazy"
            decoding="async"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>
    );
  if (media.kind === "video")
    return active ? (
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
    ) : null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.src}
      alt=""
      loading="lazy"
      decoding="async"
      style={media.focus ? { objectPosition: media.focus } : undefined}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}

export function ServiceScroll({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  // null until mounted: then render media only where it is shown, so videos
  // never load twice (inline on mobile, pinned frame on desktop).
  const [mobile, setMobile] = useState<boolean | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The block whose middle is closest to the viewport centre is "active".
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const blocks = Array.from(list.querySelectorAll<HTMLElement>(".ss-block"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let best = 0;
      let bestD = Infinity;
      blocks.forEach((b, i) => {
        const r = b.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
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
    <div className="ss">
      <ol ref={listRef} className="ss-list">
        {services.map((s, i) => (
          <li
            key={s.id}
            id={s.id}
            className={`ss-block${i === active ? " is-active" : ""}`}
          >
            {/* mobile: media inline above the text */}
            <div className="ss-block__media" aria-hidden="true">
              {mobile && <Media media={s.media} />}
            </div>
            <h3 className="ss-block__title x-wide">
              {s.title}
              <span className="x-dot" aria-hidden="true" />
            </h3>
            <p className="ss-block__lead">{s.lead}</p>
            <p className="ss-size">
              <span className="ss-size__mark" aria-hidden="true" />
              <strong>Für Brands:</strong> {s.brand}
            </p>
            <p className="ss-size">
              <span className="ss-size__mark ss-size__mark--local" aria-hidden="true" />
              <strong>Für Local &amp; Start-ups:</strong> {s.local}
            </p>
            <ul className="ss-offer">
              {s.offer.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {/* desktop: one pinned frame, cross-fading between services */}
      <div className="ss-stage" aria-hidden="true">
        <div className="ss-frame">
          {services.map((s, i) => (
            <div key={s.id} className={`ss-layer${i === active ? " is-active" : ""}`}>
              {mobile === false && (
                <Media media={s.media} active={Math.abs(i - active) <= 1} />
              )}
            </div>
          ))}
          <ol className="ss-ticks">
            {services.map((s, i) => (
              <li key={s.id} className={i === active ? "is-active" : ""} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
