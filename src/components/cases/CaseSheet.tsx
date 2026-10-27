"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PublicCase } from "@/lib/cases";
import { CATEGORY_LABELS } from "@/lib/cases";
import { Arrow } from "@/components/site/Arrow";

// ---------------------------------------------------------------------------
// CASE SHEET — the cases overview. Two large frames per row (the right column
// steps down, like a staggered contact sheet). Filter chips come from the
// CMS-managed categories (admin order), limited to those present in the
// published cases. Everything shown is CMS data.
// ---------------------------------------------------------------------------

type Category = { value: string; label: string };

export function CaseSheet({
  cases,
  categories = [],
}: {
  cases: PublicCase[];
  categories?: Category[];
}) {
  const [active, setActive] = useState("all");

  const filters = useMemo(() => {
    const present = new Set(cases.map((c) => c.category));
    const configured = categories.map((c) => c.value).filter((v) => present.has(v));
    const extras = [...present].filter((c) => !configured.includes(c)).sort();
    return ["all", ...configured, ...extras];
  }, [cases, categories]);

  const labelFor = (key: string) => {
    if (key === "all") return "Alle";
    const cfg = categories.find((c) => c.value === key);
    return cfg?.label ?? CATEGORY_LABELS[key] ?? key;
  };

  const shown = cases.filter((c) => active === "all" || c.category === active);

  return (
    <>
      {filters.length > 2 && (
        <div className="cs-filter" role="group" aria-label="Cases filtern">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className="cs-chip"
              aria-pressed={active === f}
              onClick={() => setActive(f)}
            >
              <span className="cs-chip__mark" aria-hidden="true" />
              {labelFor(f)}
            </button>
          ))}
        </div>
      )}

      {shown.length > 0 ? (
        <ul className="cs-grid" key={active}>
          {shown.map((c, i) => {
            const img = c.thumbnailImage?.url ?? c.heroImage?.url ?? null;
            const alt = c.thumbnailImage?.alt || c.heroImage?.alt || "";
            const kind = c.tags[0] ?? labelFor(c.category);
            return (
              <li key={c._id} className="cs-item" style={{ "--i": i % 2 } as React.CSSProperties}>
                <Link href={`/cases/${c.slug}`} className="cs-link">
                  <div className="cs-media">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt={alt} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
                    ) : (
                      <span className="cs-media__ph x-wide" aria-hidden="true">
                        {c.client}
                      </span>
                    )}
                    <span className="cs-media__go" aria-hidden="true">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <h2 className="cs-client x-wide">
                    {c.client}
                    <span className="x-dot" aria-hidden="true" />
                  </h2>
                  <p className="cs-title">{c.title}</p>
                  <p className="cs-meta">
                    {kind}
                    {c.year ? ` · ${c.year}` : ""}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="cs-empty">Neue Cases folgen in Kürze.</p>
      )}
    </>
  );
}
