"use client";

import { useEffect, useRef } from "react";

// A portrait (9:16) clip: a landscape source cropped upright, starting at
// `start` seconds so it shows a different passage than the hero. Muted,
// decorative, no controls or context menu. Pauses while off screen.
export function VerticalClip({
  src,
  start = 0,
  poster,
  focus = "50% 50%",
}: {
  src: string;
  start?: number;
  poster?: string;
  focus?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const seek = () => {
      if (start && v.currentTime < start) v.currentTime = start;
    };
    v.addEventListener("loadedmetadata", seek);
    // Loop back to the start offset instead of the beginning.
    const onEnded = () => {
      v.currentTime = start;
      v.play().catch(() => {});
    };
    v.addEventListener("ended", onEnded);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    if (v.readyState >= 1) seek();
    return () => {
      v.removeEventListener("loadedmetadata", seek);
      v.removeEventListener("ended", onEnded);
      io.disconnect();
    };
  }, [start]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      autoPlay
      preload="metadata"
      controls={false}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
      aria-hidden="true"
      tabIndex={-1}
      style={{ objectPosition: focus }}
    />
  );
}
