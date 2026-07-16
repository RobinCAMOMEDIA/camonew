import Link from "next/link";
import Image from "next/image";
import type { PublicCase } from "@/lib/cases";
import { cardCategoryLabel } from "@/lib/cases";

// A single case card. Reused by the home "Selected Work" grid and the Cases
// overview. Renders the uploaded thumbnail when present (Next.js optimized,
// lazy-loaded), otherwise falls back to the original CSS gradient placeholder.
export function CaseCard({
  caseItem,
  index,
  showTeaser = false,
  priority = false,
}: {
  caseItem: PublicCase;
  index: number;
  showTeaser?: boolean;
  priority?: boolean;
}) {
  const delay = `delay-${(index % 4) + 1}`;
  const thumb = caseItem.thumbnailImage?.url;
  // Fallback gradient visuals cycle through the 8 original styles.
  const visualClass = `work-card__visual--${(index % 8) + 1}`;

  return (
    <Link
      href={`/cases/${caseItem.slug}`}
      className={`work-card reveal ${delay}`}
      data-category={caseItem.category}
    >
      <div className="work-card__media">
        {thumb ? (
          <Image
            src={thumb}
            alt={caseItem.thumbnailImage?.alt ?? caseItem.title}
            className="work-card__img"
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div className={`work-card__visual ${visualClass}`} />
        )}
      </div>
      <div className="work-card__info">
        <div>
          <div className="work-card__brand">{caseItem.title}</div>
          <div className="work-card__category">{cardCategoryLabel(caseItem)}</div>
          {showTeaser && caseItem.teaser && (
            <p
              className="work-card__desc-text"
              style={{
                marginTop: "0.8rem",
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                maxWidth: "600px",
                lineHeight: 1.5,
              }}
            >
              {caseItem.teaser}
            </p>
          )}
        </div>
        <div className="work-card__arrow">↗</div>
      </div>
    </Link>
  );
}
