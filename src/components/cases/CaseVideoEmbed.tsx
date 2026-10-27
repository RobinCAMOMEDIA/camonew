// Renders an external video embed (YouTube / Vimeo) inside the case detail page.
// Accepts a watch/share URL and normalises it to an embeddable iframe src.
// Server component — no interactivity needed beyond the iframe itself.

function toEmbedUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");

  // YouTube: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
  // We use youtube-nocookie.com (extended data protection mode) so YouTube only
  // sets tracking cookies once the visitor actually starts the video.
  if (host === "youtu.be") {
    const id = url.pathname.slice(1);
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  if (
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "youtube-nocookie.com"
  ) {
    if (url.pathname.startsWith("/embed/")) {
      const id = url.pathname.replace("/embed/", "");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    const id = url.searchParams.get("v");
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }

  // Vimeo: vimeo.com/ID or player.vimeo.com/video/ID
  if (host === "vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }
  if (host === "player.vimeo.com") {
    return url.toString();
  }

  return null;
}

export function CaseVideoEmbed({ url }: { url: string }) {
  const embed = toEmbedUrl(url);
  if (!embed) return null;
  return (
    <div className="cd-film__frame">
      <iframe
        src={embed}
        title="Case video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
