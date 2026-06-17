import type { NextConfig } from "next";

// Security headers applied to every response. These are the "safe" set:
// they harden the site against clickjacking, MIME-sniffing, protocol
// downgrade, and referrer leakage without restricting the third-party
// resources the site legitimately loads (Google Maps, CARTO tiles,
// Dropbox images, Web3Forms).
const securityHeaders = [
  // Force HTTPS for two years, including subdomains (all are HTTPS on Vercel).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  // Stop browsers from guessing a file's type (blocks a class of attacks).
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Block this site from being embedded in an iframe (anti-clickjacking).
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Modern equivalent of the above for browsers that prefer CSP.
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'",
  },
  // Don't leak the full URL to other sites in the Referer header.
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Turn off browser features the site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  // Don't advertise that the site runs on Next.js (reduces fingerprinting).
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '*.dropboxusercontent.com' },
      { protocol: 'https', hostname: 'dropboxusercontent.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
