import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastmod = new Date().toISOString()

  // List of public-facing routes to include in the sitemap.
  // Excludes API, admin, and account-related routes by design.
  const routes: string[] = [
    '/',
    '/about',
    '/contact',
    '/faq',
    '/price',
    '/services',
    '/service-details',
    '/products',
    '/cart',
    '/checkout',
    '/order-confirmation',
    '/payment/success',
    '/payment/cancelled',
    '/project-grid',
    '/project-list',
    '/project-metro',
    '/project-slider',
    '/project-standard',
    '/project-details-gallery',
    '/project-details-left-sidebar',
    '/project-details-right-sidebar',
    '/home1',
    '/home2',
    '/home3',
  ]

  return routes.map((route) => ({
    url: new URL(route, BASE_URL).toString(),
    lastModified: lastmod,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1.0 : 0.7,
  }))
}
