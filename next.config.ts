import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  distDir: "output",
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
