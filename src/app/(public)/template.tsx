// Re-mounts on every navigation, so each page can arrive with an entrance
// (only styled in the ?v=4 motion preview, see `.vibe .x-page`).
export default function PublicTemplate({ children }: { children: React.ReactNode }) {
  return <div className="x-page">{children}</div>;
}
