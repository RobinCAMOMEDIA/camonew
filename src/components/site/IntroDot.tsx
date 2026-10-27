// ---------------------------------------------------------------------------
// INTRO DOT
// Short entry animation on the first page load of a session: an orange dot
// pops in, swells until it floods the screen, then the orange sheet wipes up
// and reveals the page (~1.2s total, pure CSS so it can never get stuck).
// An inline script marks <html class="intro-done"> on repeat loads within the
// session, which hides the overlay before first paint.
// Reduced motion → never shown.
// ---------------------------------------------------------------------------

const INTRO_SCRIPT = `try{var d=document.documentElement;if(sessionStorage.getItem("camo-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-done")}else{sessionStorage.setItem("camo-intro","1");d.classList.add("intro-play")}}catch(e){document.documentElement.classList.add("intro-done")}`;

export function IntroDot() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      <div className="intro" aria-hidden="true">
        <span className="intro__dot" />
        <span className="intro__meta intro__meta--l">CAMO Media</span>
        <span className="intro__meta intro__meta--r">Hamburg</span>
      </div>
    </>
  );
}
