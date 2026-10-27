import type { Metadata } from "next";
import { api } from "@convex/_generated/api";
import { getConvexClient } from "@/lib/convexServer";
import type { PublicCase } from "@/lib/cases";
import { CaseSheet } from "@/components/cases/CaseSheet";
import { CatchUsButton } from "@/components/site/CatchUsButton";
import "./cases.css";


export const metadata: Metadata = {
  title: "Cases | CAMO Media Hamburg",
  description:
    "Kampagnen, Content und Social von CAMO Media, für Marken und lokale Unternehmen. Culture Marketing aus Hamburg.",
};

// ISR: re-fetch published cases at most once a minute.
export const revalidate = 60;

async function getCases(): Promise<PublicCase[]> {
  try {
    const cases = (await getConvexClient().query(api.cases.listPublished, {})) as PublicCase[];
    // Featured first, then the admin's sort order.
    return [...cases].sort(
      (a, b) => Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder,
    );
  } catch {
    return [];
  }
}

async function getCategories(): Promise<{ value: string; label: string }[]> {
  try {
    return (await getConvexClient().query(api.categories.getCategories, {})) as {
      value: string;
      label: string;
    }[];
  } catch {
    return [];
  }
}

export default async function CasesPage() {
  const [cases, categories] = await Promise.all([getCases(), getCategories()]);

  return (
    <div className="cs">
      {/* ── Opener: campaign image band with the title set into it ──── */}
      <header className="cs-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="cs-head__img"
          src="/assets/images/cases/cases-hero.jpg"
          alt="CAMO-Shooting: zwei Models am Camo-Auto zwischen Containern"
          fetchPriority="high"
          decoding="async"
        />
        <div className="cs-head__scrim" aria-hidden="true" />
        <h1 className="cs-head__title x-wide">
          <span className="x-nowrap">
            Cases<span className="x-dot" aria-hidden="true" />
          </span>
        </h1>
        <div className="cs-head__side">
          <p className="cs-head__lead">
            Kampagnen, Content und Kanäle, die wir gemacht haben. Für Marken
            und für Läden um die Ecke.
          </p>
        </div>
      </header>

      <section className="cs-body" id="arbeiten" aria-label="Alle Cases">
        <CaseSheet cases={cases} categories={categories} />
      </section>

      <section className="cs-close" aria-labelledby="cs-close-title" data-ground="orange">
        <h2 className="cs-close__q x-wide" id="cs-close-title">
          Dein Projekt als <span className="x-nowrap">nächstes<span className="x-dot" aria-hidden="true" /></span>
        </h2>
        <div className="cs-close__row">
          <CatchUsButton />
          <a href="mailto:hello@camo.media" className="cs-close__mail">
            hello@camo.media
          </a>
        </div>
      </section>
    </div>
  );
}
