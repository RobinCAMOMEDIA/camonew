"use client";

import { useMemo, useState } from "react";
import { CaseCard } from "@/components/CaseCard";
import type { PublicCase } from "@/lib/cases";
import { CATEGORY_LABELS } from "@/lib/cases";

type Category = { value: string; label: string };

// Cases overview grid + dynamic filter bar. Filter buttons come from the
// CMS-managed categories (in admin order), limited to those actually present in
// the published cases. Filtering happens client-side with the same fade.
export function CasesExplorer({
  cases,
  categories = [],
}: {
  cases: PublicCase[];
  categories?: Category[];
}) {
  const [active, setActive] = useState("all");

  // Build the filter list: "all" first, then each configured category that is
  // present in the data, plus any leftover categories present but not configured.
  const filters = useMemo(() => {
    const present = new Set(cases.map((c) => c.category));
    const configured = categories
      .map((c) => c.value)
      .filter((v) => present.has(v));
    const extras = [...present]
      .filter((c) => !configured.includes(c))
      .sort();
    return ["all", ...configured, ...extras];
  }, [cases, categories]);

  const labelFor = (key: string) => {
    if (key === "all") return CATEGORY_LABELS.all;
    const cfg = categories.find((c) => c.value === key);
    return (cfg?.label ?? CATEGORY_LABELS[key] ?? key).toUpperCase();
  };

  return (
    <>
      <div className="filter-container reveal">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn${active === f ? " active" : ""}`}
            data-filter={f}
            onClick={() => setActive(f)}
          >
            {labelFor(f)}
          </button>
        ))}
      </div>

      <div className="work__grid cases-grid">
        {cases.map((c, i) => {
          const visible = active === "all" || c.category === active;
          return (
            <div
              key={c._id}
              style={{
                display: visible ? "contents" : "none",
              }}
            >
              <CaseCard caseItem={c} index={i} showTeaser />
            </div>
          );
        })}
      </div>

      {cases.length === 0 && (
        <p className="about__text" style={{ marginTop: "2rem" }}>
          Noch keine veröffentlichten Cases vorhanden.
        </p>
      )}
    </>
  );
}
