// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable gzip/brotli compression for all HTTP responses
  compress: true,

  // Remove X-Powered-By header (minor security + fewer bytes)
  poweredByHeader: false,

  // Note: optimizeFonts is built-in and always enabled in Next.js 15+
  // No need to set it explicitly

  images: {
    // Allow Cloudinary-hosted product/service images
    domains: ["res.cloudinary.com"],

    // Serve AVIF first (smaller than WebP), then WebP for older browsers
    formats: ["image/avif", "image/webp"],

    // Cache optimised images for 1 year — they have content hashes in the URL
    minimumCacheTTL: 60 * 60 * 24 * 365,

    // Breakpoints for <Image> srcset — tuned for mobile-first
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        // Block admin pages from indexing
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
