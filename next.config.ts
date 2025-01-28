import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // Corrected the hostname
        port: '' // No need to specify port if it's the default (80 for HTTP or 443 for HTTPS)
        
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // Corrected the hostname
        port: '' // No need to specify port if it's the default (80 for HTTP or 443 for HTTPS)
        
      },
    ],
  },
};
export default nextConfig;
