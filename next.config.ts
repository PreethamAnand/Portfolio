import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["lenis"],
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
