import Link from "next/link";
import { api } from "@convex/_generated/api";
import { getConvexClient } from "@/lib/convexServer";
import type { PublicCase } from "@/lib/cases";
import { HeroBend } from "@/components/home/HeroBend";
import { HomeStory, type StoryFrame } from "@/components/home/HomeStory";
import { Arrow } from "@/components/site/Arrow";
import { BRANDS } from "@/lib/brands";
import "./home.css";

// Revalidate periodically so a new showreel / newly published cases appear
// without a redeploy (ISR). Public data only.
export const revalidate = 60;

const FALLBACK_SHOWREEL = "/assets/videos/showreel.mp4";


type HomeCase = {
  id: string;
  slug: string;
  client: string;
  title: string;
  image: string | null;
};

async function getShowreel(): Promise<string> {
  try {
    const hero = await getConvexClient().query(api.hero.getHero, {});
    return hero.showreel?.url ?? FALLBACK_SHOWREEL;
  } catch {
    return FALLBACK_SHOWREEL;
  }
}

async function getCases(): Promise<HomeCase[]> {
  try {
    const cases = (await getConvexClient().query(
      api.cases.listPublished,
      {},
    )) as PublicCase[];
    return [...cases]
      .sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder,
      )
      .slice(0, 4)
      .map((c) => ({
        id: c._id,
        slug: c.slug,
        client: c.client,
        title: c.title,
        image: c.thumbnailImage?.url ?? c.heroImage?.url ?? null,
      }));
  } catch {
    return [];
  }
}

// Client logos: a quiet running line of paper logos at the foot of About.
function Logos({ className, ground = "paper" }: { className: string; ground?: string }) {
  return (
    <section className={className} aria-label="Kunden & Partner" data-ground={ground}>
      <div className="xl__marquee">
          <div className="xl__track">
            {[...BRANDS, ...BRANDS].map(([file, alt, ar, boost = 1], i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${file}-${i}`}
                src={`/assets/images/cases/${file}.png`}
                style={{ "--s": (Math.sqrt(ar) * boost).toFixed(3) } as React.CSSProperties}
                alt={i < BRANDS.length ? alt : ""}
                aria-hidden={i < BRANDS.length ? undefined : true}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
    </section>
  );
}

// Real footage for the story frames (case photos, stills, clips).
const STORY_FRAMES: StoryFrame[] = [
  { src: "/assets/images/cases/lucio101-gshock.jpg" },
  { src: "/assets/videos/1.mp4", kind: "video" },
  { src: "/assets/images/cases/kiwi.jpg" },
  { src: "/assets/images/cases/casio.jpg" },
  { src: "/assets/images/records/still-open.jpg" },
  { src: "/assets/images/cases/hoka.jpg" },
  { src: "/assets/videos/5.mp4", kind: "video" },
  { src: "/assets/images/cases/faxe-born-to-be-bold.jpg" },
  { src: "/assets/images/stills/crew-backstage.jpg" },
  { src: "/assets/images/leistungen/content.jpg" },
];

export default async function HomePage() {
  const [showreel, cases] = await Promise.all([getShowreel(), getCases()]);

  return (
    <div className="xhome">
      <HeroBend src={showreel} />

      <HomeStory frames={STORY_FRAMES}>
        <h2 className="x-h2" id="xa-title">
          About{" "}
          <span className="x-nowrap">
            us<span className="x-dot" aria-hidden="true" />
          </span>
        </h2>
        <p className="hs__about">
          Wir sind eine Culture Marketing Agency aus Hamburg. Wir kommen aus
          der Szene und bauen Content, Kampagnen und Strategien, die nicht
          nach Werbung aussehen, sondern nach etwas, worüber man spricht.
        </p>
        <Link href="/about" className="x-more">
          <span>Mehr über uns</span>
          <span className="x-more__dot" aria-hidden="true"><Arrow /></span>
        </Link>
      </HomeStory>
      <Logos className="xl xl--strip" ground="ink" />

      <section className="xc" id="work" aria-labelledby="xc-title">
        <div className="xc__head">
          <h2 className="x-h2" id="xc-title" data-appear="">
            Selected <span className="x-nowrap">Cases<span className="x-dot" aria-hidden="true" /></span>
          </h2>
          <Link href="/cases" className="x-more">
            <span>Alle Cases</span>
            <span className="x-more__dot" aria-hidden="true"><Arrow /></span>
          </Link>
        </div>

        {cases.length > 0 ? (
          <ul className="xc__grid">
            {cases.map((c, i) => (
              <li key={c.id} className="xc__card" data-appear="" style={{ "--d": (i % 2) * 110 } as React.CSSProperties}>
                <Link href={`/cases/${c.slug}`} className="xc__link">
                  <div className="xc__media">
                    {c.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.image} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span className="xc__ph x-wide" aria-hidden="true">{c.client}</span>
                    )}
                    <span className="xc__arrow" aria-hidden="true"><Arrow diagonal /></span>
                  </div>
                  <h3 className="xc__client x-wide">
                    {c.client}
                    <span className="x-dot" aria-hidden="true" />
                  </h3>
                  <p className="xc__title">{c.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="xc__empty">Neue Cases folgen in Kürze.</p>
        )}
        <Link href="/cases" className="xc__all" data-curve="">
          <span className="xc__all-text x-wide">
            Alle Cases <span className="x-nowrap">sehen<span className="x-dot" aria-hidden="true" /></span>
          </span>
          <span className="xc__all-go" aria-hidden="true"><Arrow size={18} /></span>
        </Link>
      </section>
    </div>
  );
}
