import { ReactNode } from "react";

// The "Let's Connect" contact band used at the bottom of several pages.
export function ContactCTA({
  tagline = "Let's Connect",
  headline,
  sub,
  showPhone = false,
}: {
  tagline?: string;
  headline: ReactNode;
  sub?: string;
  showPhone?: boolean;
}) {
  return (
    <section className="contact-cta" id="contact">
      <div className="contact-cta__bg" aria-hidden="true" />
      <div className="container">
        <div className="contact-cta__content reveal">
          <div className="label contact-cta__tagline">{tagline}</div>
          <h2 className="contact-cta__headline">{headline}</h2>
          {sub && <p className="contact-cta__sub">{sub}</p>}
          <div className="hero__actions">
            <a href="mailto:hello@camo.media" className="btn btn--primary">
              hello@camo.media
              <span className="btn__arrow">→</span>
            </a>
            {showPhone && (
              <a href="tel:+4940123456" className="btn btn--ghost">
                Anrufen
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
