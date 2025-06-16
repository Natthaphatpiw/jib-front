import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.jib.co.th',
        port: '',
        pathname: '/img_master/**',
      },
    ],
  },
};

export default nextConfig;
