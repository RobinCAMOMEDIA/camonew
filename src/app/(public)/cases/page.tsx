import type { Metadata } from "next";
import { api } from "@convex/_generated/api";
import { getConvexClient } from "@/lib/convexServer";
import type { PublicCase } from "@/lib/cases";
import { CasesExplorer } from "@/components/CasesExplorer";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Cases – CAMO Media | Hamburg",
  description:
    "Kulturelle Kampagnen und digitale Erfolgsgeschichten von CAMO Media. Entdecke unsere Cases im Culture Marketing.",
};

// ISR: re-fetch published cases at most once a minute.
export const revalidate = 60;

async function getCases(): Promise<PublicCase[]> {
  try {
    return (await getConvexClient().query(
      api.cases.listPublished,
      {},
    )) as PublicCase[];
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
    <>
      <header className="about-hero cases-hero">
        <div className="about-hero__bg-decorations" aria-hidden="true">
          <div className="about-hero__grid" />
          <div className="about-hero__glow" />
        </div>
        <span className="about-hero__subtitle reveal">
          CAMO Media // Portfolio
        </span>
        <h1 className="about-hero__title reveal">
          Selected Cases<span className="square-dot" />
        </h1>
      </header>

      <section className="cases-filter-section">
        <div className="container">
          <CasesExplorer cases={cases} categories={categories} />
        </div>
      </section>

      <ContactCTA
        headline={
          <>
            Bereit für echte<br />
            <span className="accent">kulturelle Relevanz</span>?
          </>
        }
      />
    </>
  );
}
