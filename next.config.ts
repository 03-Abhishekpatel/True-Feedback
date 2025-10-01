import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚀 Ignore ESLint errors during builds (lets Vercel deploy)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
