import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Analytics } from "@/components/Analytics";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
// Global foundation: tokens, reset, shared components (see BRANDGUIDE.md).
import "./site.css";
// Admin-only styling (does not affect the public site).
import "./admin.css";

export const metadata: Metadata = {
  title: "CAMO Media | Culture Marketing Agency Hamburg",
  description:
    "CAMO Media ist eine Culture Marketing Agency aus Hamburg. Wir verbinden Marken mit Kultur: durch Social Media, Content Creation und digitale Strategien.",
  icons: { icon: "/assets/images/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
};

const GA_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

// Dev only: some browser extensions (Bitdefender: bis_skin_checked,
// bis_register, __processed_*) write attributes into the page before React
// hydrates, which triggers a hydration-mismatch overlay. This strips them as
// soon as they appear. It never ships to production.
const STRIP_EXTENSION_ATTRS = `(function(){
  var bad=function(n){return n==="bis_skin_checked"||n==="bis_register"||n.indexOf("__processed_")===0||n.indexOf("bis_")===0;};
  var clean=function(el){if(!el||!el.attributes)return;for(var i=el.attributes.length-1;i>=0;i--){var n=el.attributes[i].name;if(bad(n))el.removeAttribute(n);}};
  new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];if(m.type==="attributes"){if(bad(m.attributeName))m.target.removeAttribute(m.attributeName);}else{for(var j=0;j<m.addedNodes.length;j++){var nd=m.addedNodes[j];if(nd.nodeType===1){clean(nd);var all=nd.querySelectorAll?nd.querySelectorAll("*"):[];for(var k=0;k<all.length;k++)clean(all[k]);}}}}}).observe(document.documentElement,{attributes:true,childList:true,subtree:true});
})();`;

// Self-hosted fonts (downloaded at build time → no runtime request to Google,
// DSGVO-friendly). Archivo with its width axis carries the whole brand voice;
// IBM Plex Mono only whispers tiny meta words.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html
          lang="de"
          className={`${archivo.variable} ${plexMono.variable}`}
          // The intro script adds a class before hydration (see IntroDot).
          suppressHydrationWarning
        >
          <head>
            {process.env.NODE_ENV !== "production" && (
              <script dangerouslySetInnerHTML={{ __html: STRIP_EXTENSION_ATTRS }} />
            )}
          </head>
          {/* suppressHydrationWarning: browser extensions (e.g. Bitdefender's
              bis_register / __processed_* attributes) mutate <body> before
              React hydrates, which is harmless but triggers a hydration
              mismatch warning. This only suppresses it for the body's own
              attributes, not its children. */}
          <body suppressHydrationWarning>
            {children}
            {/* Real-user Core Web Vitals (cookieless, privacy-friendly). */}
            <SpeedInsights />
            {/* GA4 loads only after analytics consent (see cookie banner). */}
            <Analytics gaId={GA_ID} />
            <ConsentBanner />
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
