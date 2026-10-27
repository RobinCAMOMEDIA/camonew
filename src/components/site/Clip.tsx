"use client";

// A decorative clip: muted, looping, autoplaying, no controls, no download,
// no context menu, hidden from assistive tech (BRANDGUIDE §6).
export function Clip({ src, className }: { src: string; className?: string }) {
  return (
    <video
      className={className}
      src={src}
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
}
