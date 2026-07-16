import { mutation } from "./_generated/server";
import { requireAdmin } from "./lib";

// One-shot seed that mirrors the original hardcoded cases so the rebuilt site
// isn't empty on first run. Admin-only. Safe to re-run: it no-ops if cases
// already exist. Media here references the bundled /public images by URL; once
// you re-upload via the admin CMS those become Convex File Storage refs.
//
// Run from the admin dashboard ("Seed demo cases" button) or:
//   npx convex run seed:seedCases
export const seedCases = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const existing = await ctx.db.query("cases").first();
    if (existing) return { inserted: 0, message: "Cases already exist." };

    const now = Date.now();
    const base = {
      services: [] as string[],
      disciplines: [] as string[],
      contentBlocks: undefined,
      heroImage: undefined,
      videos: [],
      externalVideoEmbeds: [],
      seoTitle: undefined,
      seoDescription: undefined,
      createdAt: now,
      updatedAt: now,
    };

    const img = (url: string, alt: string) => ({
      kind: "image" as const,
      url,
      alt,
    });

    const cases = [
      {
        title: "G-Shock : Off-Stage",
        slug: "gshock-offstage",
        client: "Casio G-Shock",
        year: "2025",
        category: "content",
        tags: ["Content Creation", "Photography", "Social Media"],
        services: ["Content Production", "Strategy"],
        disciplines: ["Photography", "Social Media"],
        teaser:
          "Konzeption und Produktion von Raw-Content für die Streetwear-Community.",
        introHeadline: "Die rohe Energie hinter den Kulissen",
        description:
          'Für die Einführung der neuen G-Shock Metall-Reihe haben wir den klassischen Studio-Pfad verlassen. Statt polierter Werbeaufnahmen fängt die "Off-Stage" Kampagne die ungeschminkte Realität von Künstlern kurz vor dem Auftritt ein. Mitten im staubigen Backstage-Ambiente, umgeben von Kabeln, Flightcases und Instrumenten, wird G-Shock zum natürlichen Teil einer echten Musikszene.',
        thumbnailImage: img(
          "/assets/images/cases/gshock-offstage/thumbnail.png",
          "G-Shock : Off-Stage",
        ),
        heroImage: img(
          "/assets/images/cases/gshock-offstage/hero.png",
          "G-Shock : Off-Stage Hero",
        ),
        galleryImages: [1, 2, 3, 4, 5, 6].map((i) =>
          img(
            `/assets/images/cases/gshock-offstage/img${i}.png`,
            `G-Shock Case Detail Asset ${i}`,
          ),
        ),
        kpis: [
          { value: "500k+", label: "Impressionen" },
          { value: "+14.2%", label: "Engagement Rate" },
          { value: "45+", label: "Kampagnen-Assets" },
        ],
        featured: true,
        published: true,
        sortOrder: 0,
      },
      {
        title: "Zalando",
        slug: "zalando",
        client: "Zalando",
        category: "content",
        tags: ["Influencer Marketing", "Content Creation"],
        teaser:
          "Gen-Z Activation & subkulturelles Seeding durch ausgewählte Creator-Kollaborationen.",
        thumbnailImage: undefined,
        galleryImages: [],
        kpis: [],
        featured: false,
        published: true,
        sortOrder: 1,
      },
      {
        title: "Apple Music",
        slug: "apple-music",
        client: "Apple Music",
        category: "social",
        tags: ["Social Media Campaign"],
        teaser:
          "Digitale Markenkampagnen & Social-First Content zur Positionierung im Hip-Hop.",
        thumbnailImage: undefined,
        galleryImages: [],
        kpis: [],
        featured: false,
        published: true,
        sortOrder: 2,
      },
      {
        title: "Hoka",
        slug: "hoka",
        client: "Hoka",
        category: "digital",
        tags: ["Digital Campaign"],
        teaser:
          "Agile Performance-Kampagnen zur Etablierung in urbanen Laufszenen.",
        thumbnailImage: undefined,
        galleryImages: [],
        kpis: [],
        featured: false,
        published: true,
        sortOrder: 3,
      },
      {
        title: "Red Bull",
        slug: "red-bull",
        client: "Red Bull",
        category: "content",
        tags: ["Event Coverage", "Content Creation"],
        teaser:
          "Dokumentarische Content-Production und Live-Coverage von Subkultur-Events.",
        thumbnailImage: undefined,
        galleryImages: [],
        kpis: [],
        featured: false,
        published: true,
        sortOrder: 4,
      },
      {
        title: "Nike",
        slug: "nike",
        client: "Nike",
        category: "strategy",
        tags: ["Community Building", "Strategy"],
        teaser:
          "Langfristiges Community-Building & strategische Positionierung im Herzen Hamburgs.",
        thumbnailImage: undefined,
        galleryImages: [],
        kpis: [],
        featured: false,
        published: true,
        sortOrder: 5,
      },
      {
        title: "Universal Music",
        slug: "universal-music",
        client: "Universal Music",
        category: "social",
        tags: ["Release Campaign", "Social Media"],
        teaser:
          "Kreative Launch-Kampagnen & Social-Amplification für Major-Releases.",
        thumbnailImage: undefined,
        galleryImages: [],
        kpis: [],
        featured: false,
        published: true,
        sortOrder: 6,
      },
      {
        title: "About You",
        slug: "about-you",
        client: "About You",
        category: "strategy",
        tags: ["Influencer Activation", "Strategy"],
        teaser:
          "Kulturell verankerte Influencer-Kampagnen mit echter Street-Credibility.",
        thumbnailImage: undefined,
        galleryImages: [],
        kpis: [],
        featured: false,
        published: true,
        sortOrder: 7,
      },
    ];

    for (const c of cases) {
      await ctx.db.insert("cases", { ...base, ...c });
    }
    return { inserted: cases.length, message: "Seeded demo cases." };
  },
});
