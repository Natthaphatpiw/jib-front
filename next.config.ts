import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.jib.co.th',
        port: '',
        pathname: '/img_master/**',
      },
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/jib-chatbot' : '',
};

export default nextConfig;
