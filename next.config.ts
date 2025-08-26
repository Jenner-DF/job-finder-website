import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "", // optional
        pathname: "/**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
