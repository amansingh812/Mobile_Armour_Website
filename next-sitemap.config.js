/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.mobilearmour.com.au',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // ❌ Disable - we use Next.js built-in sitemap.ts
  
  // Exclude everything - let sitemap.ts handle URL generation
  exclude: ['*'],
  
  // Only generate robots.txt, not sitemap files
  // The sitemap.ts file will handle all sitemap generation
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/account',
          '/api',
          '/auth',
          '/cart',
          '/checkout',
          '/payment',
          '/_next',
          '/static',
        ],
      },
      // Optimize for Google (most important for Australian market)
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      // Optimize for Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    additionalSitemaps: [
      // Point to Next.js generated sitemap
      'https://www.mobilearmour.com.au/sitemap.xml',
    ],
  },
};
