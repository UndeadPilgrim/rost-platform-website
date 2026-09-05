import type { NextConfig } from "next";

/* GitHub Pages deployment: NEXT_BASE_PATH=/rost-platform-website turns on
   static export + the project-site base path. Local dev/build without the
   env var is unchanged (no basePath, standard output). Image optimization
   is disabled because Pages serves static files only. */
const isGhPages = Boolean(process.env.NEXT_BASE_PATH);

const nextConfig: NextConfig = {
  ...(isGhPages
    ? {
        output: "export" as const,
        basePath: process.env.NEXT_BASE_PATH,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
