import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  // Compression
  compress: true,
  // Power by header removal for security
  poweredByHeader: false,
  // Strict mode
  reactStrictMode: true,
};

export default nextConfig;
