"use client";

import { useContactOverlay } from "@/components/contact/ContactOverlay";

// Home finale: bold full-bleed contact band with an image collage + CTA.
// The "Catch Us" button opens the global contact overlay (same as the nav).
export function HomeContact() {
  const { open: openContact } = useContactOverlay();

  return (
    <section className="ht-contact" id="contact">
      <div className="ht-contact__bg" aria-hidden="true">
        <div className="ht-contact__glow" />
        <div className="ht-contact__watermark">CATCH US</div>
      </div>

      <div className="container ht-contact__inner">
        <div className="ht-contact__media reveal-left" aria-hidden="true">
          <figure className="ht-contact__img ht-contact__img--a">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/musichero.jpeg" alt="" />
          </figure>
          <figure className="ht-contact__img ht-contact__img--b">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/chacho2.jpg" alt="" />
          </figure>
          <figure className="ht-contact__img ht-contact__img--c">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/catchmomentsrecords.png" alt="" />
          </figure>
        </div>

        <div className="ht-contact__content reveal-right">
          <p className="ht-eyebrow">
            <span className="ht-eyebrow__num">05</span> Let&apos;s Connect
          </p>
          <h2 className="ht-contact__headline">
            Lass uns deine Marke{" "}
            <span className="accent">kulturell relevant</span> machen.
          </h2>
          <p className="ht-contact__sub">
            Social-Strategie, Content oder eine kulturelle Kampagne – wir sind
            ready, wenn du es bist.
          </p>
          <div className="ht-contact__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={openContact}
            >
              Catch Us
              <span className="btn__arrow">→</span>
            </button>
            <a href="mailto:hello@camo.media" className="btn btn--ghost">
              hello@camo.media
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
