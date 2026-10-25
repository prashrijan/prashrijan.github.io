import type { NextConfig } from "next";

/**
 * Static-export configuration so the experience can be served directly from
 * GitHub Pages (prashrijan.github.io is a user page served from the repo root).
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // User page lives at the domain root, so no basePath / assetPrefix needed.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
