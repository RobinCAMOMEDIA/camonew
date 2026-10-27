import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@convex/_generated/api";
import { getConvexClient } from "@/lib/convexServer";
import type { PublicCase } from "@/lib/cases";
import { CATEGORY_LABELS } from "@/lib/cases";
import { CaseVideoEmbed } from "@/components/cases/CaseVideoEmbed";
import { Arrow } from "@/components/site/Arrow";
import "../cases.css";

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
    return { title: "Case nicht gefunden | CAMO Media" };
  }
  const title = c.seoTitle?.trim() || `${c.title} | Cases | CAMO Media`;
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
  const hero = c.heroImage?.url ?? c.thumbnailImage?.url ?? null;
  const gallery = c.galleryImages.filter((g) => g.url);
  const videos = c.videos.filter((v) => v.url);
  const facts = [
    { k: "Kunde", v: c.client },
    { k: "Jahr", v: c.year },
    { k: "Services", v: services },
    { k: "Disziplinen", v: disciplines },
  ].filter((f) => f.v);

  return (
    <article className="cd">
      {/* ── Hero: the case image full-bleed, title at the foot ───────── */}
      <header className={`cd-hero${hero ? "" : " cd-hero--plain"}`}>
        {hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="cd-hero__img" src={hero} alt={c.heroImage?.alt || ""} fetchPriority="high" />
        )}
        <div className="cd-hero__scrim" aria-hidden="true" />
        <div className="cd-hero__text">
          <h1 className="cd-hero__title x-wide">
            {c.title}
            <span className="x-dot" aria-hidden="true" />
          </h1>
        </div>
      </header>

      {/* ── Facts + story ─────────────────────────────────────────────── */}
      <section className="cd-intro">
        <dl className="cd-facts">
          {facts.map((f) => (
            <div key={f.k} className="cd-fact">
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
        <div className="cd-story">
          {(c.introHeadline || c.description || c.teaser) && (
            <>
              {c.introHeadline && <h2 className="cd-story__head x-wide">{c.introHeadline}</h2>}
              <p className="cd-story__lead">{c.description || c.teaser}</p>
            </>
          )}
          {c.contentBlocks?.map((block, i) => {
            if (block.type === "heading")
              return (
                <h2 key={i} className="cd-story__head x-wide">
                  {block.text}
                </h2>
              );
            if (block.type === "quote")
              return (
                <blockquote key={i} className="cd-story__quote">
                  <span className="cd-story__quote-mark" aria-hidden="true" />
                  {block.text}
                </blockquote>
              );
            return (
              <p key={i} className="cd-story__p">
                {block.text}
              </p>
            );
          })}
        </div>
      </section>

      {/* ── Film: right after the story, before the stills ──────────── */}
      {(videos.length > 0 || c.externalVideoEmbeds.length > 0) && (
        <section className="cd-film" aria-label="Videos">
          {videos.map((vid, i) => (
            <div className="cd-film__frame" key={`v-${i}`}>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                src={vid.url as string}
                controls
                playsInline
                preload="metadata"
                poster={hero ?? undefined}
                controlsList="nodownload"
                disablePictureInPicture
              />
            </div>
          ))}
          {c.externalVideoEmbeds.map((url, i) => (
            <CaseVideoEmbed url={url} key={`e-${i}`} />
          ))}
        </section>
      )}

      {/* ── Gallery: two per row, a lone last image runs full width ──── */}
      {gallery.length > 0 && (
        <section className="cd-gallery" aria-label="Bilder">
          {gallery.map((img, i) => (
            <figure
              key={i}
              className={`cd-shot${gallery.length % 2 === 1 && i === gallery.length - 1 ? " cd-shot--wide" : ""}`}
              data-appear=""
            >
              <Image
                src={img.url as string}
                alt={img.alt || `${c.title}, Bild ${i + 1}`}
                width={img.width ?? 1600}
                height={img.height ?? 1200}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </figure>
          ))}
        </section>
      )}

      {/* ── Results (from the CMS only) ───────────────────────────────── */}
      {c.kpis.length > 0 && (
        <section className="cd-results" aria-label="Ergebnisse">
          {c.kpis.map((kpi, i) => (
            <div className="cd-result" key={i}>
              <p className="cd-result__value x-wide">{kpi.value}</p>
              <p className="cd-result__label">{kpi.label}</p>
              {kpi.description && <p className="cd-result__desc">{kpi.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ── Back to all ───────────────────────────────────────────────── */}
      <nav className="cd-next" aria-label="Weitere Cases" data-ground="orange">
        <Link href="/cases" className="cd-next__link">
          <span className="cd-next__q x-wide">
            Alle <span className="x-nowrap">Cases<span className="x-dot" aria-hidden="true" /></span>
          </span>
          <span className="cd-next__go" aria-hidden="true">
            <Arrow />
          </span>
        </Link>
      </nav>
    </article>
  );
}
