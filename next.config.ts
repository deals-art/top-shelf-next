import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '*.dropboxusercontent.com' },
      { protocol: 'https', hostname: 'dropboxusercontent.com' },
    ],
  },
};

export default nextConfig;
