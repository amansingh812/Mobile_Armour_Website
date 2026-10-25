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
    // Cloudinary resizes product photos (f_auto/q_auto/w_), not Vercel's
    // image optimiser, which has a monthly limit. See src/lib/image-loader.ts.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",

    // Breakpoints for <Image> srcset — tuned for mobile-first
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Old theme demo pages and duplicate routes. Google has indexed several of
  // them (they even show as sitelinks), so they 301 to the closest real page.
  async redirects() {
    return [
      { source: "/price", destination: "/services", permanent: true },
      // Repair prices page retired: quotes are given per phone.
      { source: "/pricing", destination: "/services", permanent: true },
      // Old placeholder category pages (they rendered fake products) and bare /shop
      { source: "/category/:path*", destination: "/products", permanent: true },
      { source: "/shop", destination: "/products", permanent: true },
      // Bike mounts and stands merged into one category (25 Oct 2026)
      { source: "/shop/bike-mounts/:path*", destination: "/shop/mounts-stands", permanent: true },
      { source: "/shop/stands-holders/:path*", destination: "/shop/mounts-stands", permanent: true },
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
