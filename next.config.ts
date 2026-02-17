import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: {
    // @ts-ignore - buildActivity is not typed but works
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.fennecapp.io/:path*',
      },
    ];
  },
};

export default nextConfig;
