import { Grain } from "@/components/Grain";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteInteractions } from "@/components/SiteInteractions";
import { ContactOverlayProvider } from "@/components/contact/ContactOverlay";

// Shared chrome for every public-facing page: grain overlay, floating nav,
// footer and the global animation/interaction layer. The /admin section has its
// own separate layout and does NOT include this. The ContactOverlayProvider
// wraps everything so the "Catch Us" overlay can be opened from any page.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContactOverlayProvider>
      <Grain />
      <Nav />
      {children}
      <Footer />
      <SiteInteractions />
    </ContactOverlayProvider>
  );
}
