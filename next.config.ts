import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Convex File Storage serves files from your deployment's *.convex.cloud domain.
    // We allow that host so <Image> can optimize remote case media.
    // If you later migrate to Cloudinary / Vercel Blob, add those hosts here too.
    remotePatterns: [
      { protocol: "https", hostname: "*.convex.cloud" },
      { protocol: "https", hostname: "*.convex.site" },
    ],
  },
};

export default nextConfig;
