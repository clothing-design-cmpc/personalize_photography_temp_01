// ============================================================
// Next.js 16 Config — ESM format (default in Next.js 15+)
// Allows Unsplash remote images, enables Turbopack by default
// ============================================================

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
