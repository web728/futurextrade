import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The default dev-mode route indicator renders as a floating badge in the
  // bottom-left corner and can show an "issue" count during development.
  // It never appears in a production build/deploy, but disabling it here
  // keeps the dev preview visually clean too.
  devIndicators: false,
};

export default nextConfig;
