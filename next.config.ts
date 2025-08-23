import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Do not fail production builds on TS errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Do not fail production builds on ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
