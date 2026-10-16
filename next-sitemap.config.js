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
        // Never block /_next: it holds the CSS/JS Google needs to render pages.
        disallow: [
          '/admin',
          '/account',
          '/api',
          '/auth',
          '/cart',
          '/checkout',
          '/payment',
        ],
      },
      // AI search and answer engines (ChatGPT, Perplexity, Claude, Gemini,
      // Apple, Copilot/Bing): explicitly allowed so they can read and cite us.
      ...[
        'OAI-SearchBot',
        'ChatGPT-User',
        'GPTBot',
        'PerplexityBot',
        'Perplexity-User',
        'ClaudeBot',
        'Claude-SearchBot',
        'Claude-User',
        'Google-Extended',
        'Applebot-Extended',
        'Bingbot',
      ].map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/admin', '/account', '/api', '/cart', '/checkout', '/payment'],
      })),
    ],
    additionalSitemaps: [
      // Point to Next.js generated sitemap
      'https://www.mobilearmour.com.au/sitemap.xml',
    ],
  },
};
