import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'links.papareact.com',
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
     },
     {
      protocol: "https",
      hostname: "i5.walmartimages.com",
    }
    ],
  },
};

export default nextConfig;
