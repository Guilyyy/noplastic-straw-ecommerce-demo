import type { NextConfig } from "next";

const basePath = process.env.GITHUB_PAGES === "true" ? "/noplastic-straw-ecommerce-demo" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
