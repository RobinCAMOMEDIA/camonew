import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@convex/_generated/api";
import { getConvexClient } from "@/lib/convexServer";
import type { PublicCase } from "@/lib/cases";
import { CATEGORY_LABELS } from "@/lib/cases";
import { CaseVideoEmbed } from "@/components/CaseVideoEmbed";

// ISR: re-build a published case page at most once a minute.
export const revalidate = 60;

async function getCase(slug: string): Promise<PublicCase | null> {
  try {
    return (await getConvexClient().query(api.cases.getPublishedBySlug, {
      slug,
    })) as PublicCase | null;
  } catch {
    return null;
  }
}

// Pre-render all published cases at build time; new ones are picked up via ISR.
export async function generateStaticParams() {
  try {
    const slugs = (await getConvexClient().query(
      api.cases.listPublishedSlugs,
      {},
    )) as { slug: string }[];
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCase(slug);
  if (!c) {
    return { title: "Case nicht gefunden – CAMO Media" };
  }
  const title = c.seoTitle?.trim() || `${c.title} – Cases | CAMO Media`;
  const description = c.seoDescription?.trim() || c.teaser;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: c.heroImage?.url
        ? [c.heroImage.url]
        : c.thumbnailImage?.url
          ? [c.thumbnailImage.url]
          : undefined,
    },
  };
}

// Map a gallery image count to the original bento layout class.
function galleryLayoutClass(count: number) {
  if (count >= 3 && count <= 6) return `gallery-layout-${count}`;
  return "gallery-layout-default";
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCase(slug);
  if (!c) notFound();

  const services = c.services.length
    ? c.services.join(", ")
    : CATEGORY_LABELS[c.category] ?? c.category;
  const disciplines = c.disciplines.join(", ");
  const heroStyle = c.heroImage?.url
    ? {
        backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.72), rgba(10, 10, 10, 0.72)), url('${c.heroImage.url}')`,
        borderBottom: "none",
      }
    : undefined;

  const gallery = c.galleryImages.filter((g) => g.url);

  return (
    <>
      <header
        className="about-hero cases-hero"
        style={heroStyle}
      >
        <div className="about-hero__bg-decorations" aria-hidden="true">
          <div className="about-hero__grid" />
          <div className="about-hero__glow" />
        </div>
        <span className="about-hero__subtitle reveal">
          CAMO Media // Case Study
        </span>
        <h1 className="about-hero__title reveal">
          {c.title}
          <span className="square-dot" />
        </h1>
      </header>

      <section className="case-meta-section">
        <div className="container">
          <div className="case-meta-grid reveal">
            <div className="case-meta-item">
              <span className="case-meta-label">Kunde</span>
              <span className="case-meta-value">{c.client}</span>
            </div>
            {c.year && (
              <div className="case-meta-item">
                <span className="case-meta-label">Jahr</span>
                <span className="case-meta-value">{c.year}</span>
              </div>
            )}
            {services && (
              <div className="case-meta-item">
                <span className="case-meta-label">Services</span>
                <span className="case-meta-value">{services}</span>
              </div>
            )}
            {disciplines && (
              <div className="case-meta-item">
                <span className="case-meta-label">Disziplinen</span>
                <span className="case-meta-value">{disciplines}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="case-content-section">
        <div className="container">
          {(c.introHeadline || c.description) && (
            <div className="case-editorial-grid reveal">
              <div className="case-editorial-title">
                {c.introHeadline || c.title}
                <span
                  className="square-dot"
                  style={{ background: "var(--accent)" }}
                />
              </div>
              <div className="case-editorial-text">
                {c.description || c.teaser}
              </div>
            </div>
          )}

          {c.contentBlocks?.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2 key={i} className="case-editorial-title" style={{ marginBottom: "var(--space-md)" }}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote key={i} className="case-editorial-text" style={{ fontStyle: "italic", marginBottom: "var(--space-lg)" }}>
                  {block.text}
                </blockquote>
              );
            }
            return (
              <p key={i} className="case-editorial-text" style={{ marginBottom: "var(--space-lg)" }}>
                {block.text}
              </p>
            );
          })}

          {gallery.length > 0 && (
            <div className="reveal">
              <div
                className={`case-gallery-grid ${galleryLayoutClass(gallery.length)}`}
              >
                {gallery.map((img, i) => (
                  <div className="gallery-item" key={i}>
                    <Image
                      src={img.url as string}
                      alt={img.alt || `${c.title} Detail Asset ${i + 1}`}
                      width={img.width ?? 1200}
                      height={img.height ?? 900}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {(c.videos.length > 0 || c.externalVideoEmbeds.length > 0) && (
        <section className="case-video-section">
          <div className="container">
            <div className="case-video-grid reveal">
              {c.videos
                .filter((vid) => vid.url)
                .map((vid, i) => (
                  <div className="case-video-embed" key={`v-${i}`}>
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <video src={vid.url as string} controls playsInline />
                  </div>
                ))}
              {c.externalVideoEmbeds.map((url, i) => (
                <CaseVideoEmbed url={url} key={`e-${i}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {c.kpis.length > 0 && (
        <section className="case-results-section">
          <div className="container">
            <div className="case-results-grid reveal">
              {c.kpis.map((kpi, i) => (
                <div className="case-result-item" key={i}>
                  <div className="case-result-number">{kpi.value}</div>
                  <div className="case-result-label">{kpi.label}</div>
                  {kpi.description && (
                    <div
                      className="case-result-label"
                      style={{ marginTop: 4, opacity: 0.7 }}
                    >
                      {kpi.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Link href="/cases" className="case-next-nav">
        <span className="case-next-nav-label">Zurück zur Übersicht</span>
        <div className="case-next-nav-title">
          Alle Cases ansehen <span>→</span>
        </div>
      </Link>
    </>
  );
}
