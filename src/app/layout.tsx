import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Analytics } from "@/components/Analytics";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
// Original design system, copied verbatim from the static site (source of truth).
import "./legacy.css";
// Page-specific styles extracted from the original inline <style> blocks.
import "./page-extras.css";
// Admin-only styling (does not affect the public site look & feel).
import "./admin.css";

export const metadata: Metadata = {
  title: "CAMO Media – Culture Marketing Agency | Hamburg",
  description:
    "CAMO Media ist eine Culture Marketing Agency aus Hamburg. Wir verbinden Marken mit Kultur – durch Social Media, Content Creation und digitale Strategien.",
  themeColor: "#0A0A0A",
  icons: { icon: "/assets/images/favicon.png" },
};

const GA_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

// Self-hosted fonts (downloaded at build time → no runtime request to Google,
// DSGVO-friendly). Exposed as CSS variables consumed by legacy.css :root.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="de" className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <head />
          {/* suppressHydrationWarning: browser extensions (e.g. Bitdefender's
              bis_register / __processed_* attributes) mutate <body> before
              React hydrates, which is harmless but triggers a hydration
              mismatch warning. This only suppresses it for the body's own
              attributes, not its children. */}
          <body suppressHydrationWarning>
            {children}
            {/* GA4 loads only after analytics consent (see cookie banner). */}
            <Analytics gaId={GA_ID} />
            <ConsentBanner />
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
