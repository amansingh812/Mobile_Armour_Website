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
  // Old theme demo pages and duplicate routes. Google has indexed several of
  // them (they even show as sitelinks), so they 301 to the closest real page.
  async redirects() {
    return [
      { source: "/price", destination: "/pricing", permanent: true },
      // Old placeholder category pages (they rendered fake products) and bare /shop
      { source: "/category/:path*", destination: "/products", permanent: true },
      { source: "/shop", destination: "/products", permanent: true },
      { source: "/home1", destination: "/", permanent: true },
      { source: "/home2", destination: "/", permanent: true },
      { source: "/home3", destination: "/", permanent: true },
      { source: "/service-details", destination: "/services", permanent: true },
      { source: "/project-grid", destination: "/services", permanent: true },
      { source: "/project-list", destination: "/services", permanent: true },
      { source: "/project-metro", destination: "/services", permanent: true },
      { source: "/project-slider", destination: "/services", permanent: true },
      { source: "/project-standard", destination: "/services", permanent: true },
      { source: "/project-details-gallery", destination: "/services", permanent: true },
      { source: "/project-details-left-sidebar", destination: "/services", permanent: true },
      { source: "/project-details-right-sidebar", destination: "/services", permanent: true },
    ];
  },
  async headers() {
    // Pages that should never appear in Google: carts, checkout, accounts,
    // payment results and order confirmations.
    const noindexPaths = [
      "/cart",
      "/checkout",
      "/order-confirmation",
      "/payment/:path*",
      "/account/:path*",
    ];
    return [
      ...noindexPaths.map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      })),
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          // No site-wide X-Robots-Tag (overrode noindex headers).
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
