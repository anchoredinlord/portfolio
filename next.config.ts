import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image optimisation ──────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [80, 160, 320, 480],
  },

  // ── Performance ─────────────────────────────────────────────
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // ── Security & cache headers ─────────────────────────────────
  async headers() {
    return [
      // ── Security headers on every route ──
      {
        source: "/(.*)",
        headers: [
          // Prevent your site being embedded in iframes (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Stop browsers guessing MIME types (MIME sniffing)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only send referrer on same-origin requests
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Disable browser features you don't use
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Force HTTPS for 1 year (only active on Vercel / HTTPS)
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          // Content Security Policy — tightened for a Next.js + Framer Motion site
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js needs inline scripts for hydration; framer-motion needs unsafe-eval
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // Tailwind + framer-motion inject inline styles
              "style-src 'self' 'unsafe-inline'",
              // Images: self + data URIs (for SVG placeholders)
              "img-src 'self' data: blob:",
              // Fonts served from same origin
              "font-src 'self'",
              // API calls only to same origin
              "connect-src 'self'",
              // No plugins (Flash etc.)
              "object-src 'none'",
              // Framing already blocked by X-Frame-Options above
              "frame-ancestors 'none'",
              // Only load workers from same origin
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
      // ── Long-lived cache for static assets ──
      {
        source: "/(images|documents)/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
