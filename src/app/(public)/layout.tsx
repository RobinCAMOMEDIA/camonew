import { Grain } from "@/components/site/Grain";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IntroDot } from "@/components/site/IntroDot";
import { AppearObserver } from "@/components/site/AppearObserver";
import { SiteCursor } from "@/components/site/SiteCursor";
import { VibeLayer } from "@/components/site/VibeLayer";
import { ContactOverlayProvider } from "@/components/contact/ContactOverlay";

// Shared chrome for every public-facing page: intro dot, grain overlay, nav,
// footer, the cursor and the appear-on-scroll observer. The /admin section has its
// own separate layout and does NOT include this. The ContactOverlayProvider
// wraps everything so the "Catch Us" overlay can be opened from any page.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContactOverlayProvider>
      <IntroDot />
      <VibeLayer />
      <Grain />
      <SiteNav />
      {children}
      <SiteFooter />
      <SiteCursor />
      <AppearObserver />
    </ContactOverlayProvider>
  );
}
