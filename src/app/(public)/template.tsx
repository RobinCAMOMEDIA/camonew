// Re-mounts on every navigation, so each page can arrive with an entrance
// (see `.vibe .x-page`; reduced motion skips it).
export default function PublicTemplate({ children }: { children: React.ReactNode }) {
  return <div className="x-page">{children}</div>;
}
