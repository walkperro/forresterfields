/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  images: {
    // Disable optimization locally to avoid _next/image proxy timeouts
    unoptimized: isDev,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};
module.exports = nextConfig;
