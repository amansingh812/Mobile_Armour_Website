import type { MetadataRoute } from 'next'
import { getAllProducts, devicesWithPages } from '@/lib/shop-data'
import { SHOP_CATEGORIES } from '@/data/shop-categories'
import { productPath } from '@/lib/products'
import { getAllSuburbSlugs } from '@/data/location-pages'
import { getAllServiceSlugs } from '@/data/service-pages'
import { getAllModelSlugs } from '@/data/model-repair-pages'
import { blogPosts } from '@/data/blog-posts'
import { getPhoneHubs } from '@/lib/phones'
import { STORE } from '@/data/store-settings'
import { BRANDS } from '@/data/brands'
import { isPrivacy } from '@/lib/shop-copy'

import { SITE_URL } from '@/lib/site'

// Must match the host used in canonical tags. The env var on Vercel appears
// to be "https://mobilearmour.com.au/" (non-www + trailing slash), producing
// "https://mobilearmour.com.au//about" for every sitemap URL.
const BASE_URL = SITE_URL

// Rebuilt at most hourly so new products appear without a redeploy.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastmod = new Date().toISOString()

  // ========================================
  // 1. STATIC PAGES - Core business pages
  // ========================================
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: lastmod,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: lastmod,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Phone repair service areas hub
    {
      url: `${BASE_URL}/phone-repair`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Corporate repairs page
    {
      url: `${BASE_URL}/corporate-repairs`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    { url: `${BASE_URL}/phones`, lastModified: lastmod, changeFrequency: 'daily', priority: 0.85 },
    ...(STORE.bundle.enabled
      ? [{ url: `${BASE_URL}/bundle`, lastModified: lastmod, changeFrequency: 'weekly' as const, priority: 0.8 }]
      : []),
    { url: `${BASE_URL}/why-mobile-armour`, lastModified: lastmod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/delivery-returns`, lastModified: lastmod, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/warranty`, lastModified: lastmod, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/phone-accessories-heidelberg`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.9 },
  ]

  // ========================================
  // 2. SHOP CATEGORY + PHONE-MODEL PAGES (only those with products)
  // ========================================
  const allProducts = await getAllProducts()
  const shopPages: MetadataRoute.Sitemap = []
  for (const cat of SHOP_CATEGORIES) {
    const inCat = allProducts.filter((p) => p.category === cat.dbCategory)
    if (inCat.length === 0) continue
    shopPages.push({ url: `${BASE_URL}/shop/${cat.slug}`, lastModified: lastmod, changeFrequency: 'daily', priority: 0.9 })
    for (const d of devicesWithPages(inCat)) {
      shopPages.push({ url: `${BASE_URL}/shop/${cat.slug}/${d.slug}`, lastModified: lastmod, changeFrequency: 'daily', priority: 0.85 })
    }
  }

  if (allProducts.some(isPrivacy)) {
    shopPages.push({ url: `${BASE_URL}/shop/screen-protectors/privacy`, lastModified: lastmod, changeFrequency: 'daily', priority: 0.85 })
  }
  for (const [slug, b] of Object.entries(BRANDS)) {
    if (allProducts.some((p) => b.match.test(p.name))) {
      shopPages.push({ url: `${BASE_URL}/shop/brand/${slug}`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.7 })
    }
  }

  // Phone hubs: everything that fits one phone model
  const phonePages: MetadataRoute.Sitemap = (await getPhoneHubs()).map((h) => ({
    url: `${BASE_URL}/phones/${h.slug}`,
    lastModified: lastmod,
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }))

  // ========================================
  // 3. LOCATION PAGES - Suburb landing pages
  // ========================================
  const locationPagesList: MetadataRoute.Sitemap = getAllSuburbSlugs().map((slug) => ({
    url: `${BASE_URL}/phone-repair/${slug}`,
    lastModified: lastmod,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // ========================================
  // 4. SERVICE PAGES - Device/repair pages
  // ========================================
  const servicePagesList: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: lastmod,
    changeFrequency: 'weekly' as const,
    priority: 0.80,
  }))

  // ========================================
  // 5. MODEL-SPECIFIC REPAIR PAGES
  // ========================================
  const modelPagesList: MetadataRoute.Sitemap = getAllModelSlugs().map((slug) => ({
    url: `${BASE_URL}/repairs/${slug}`,
    lastModified: lastmod,
    changeFrequency: 'weekly' as const,
    priority: 0.80,
  }))

  // ========================================
  // 6. BLOG POSTS - Individual articles
  // ========================================
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.modifiedDate || post.publishedDate || lastmod,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  // ========================================
  // 6. DYNAMIC PRODUCT PAGES - Individual products
  // ========================================
  const productPages: MetadataRoute.Sitemap = allProducts.map((p) => ({
    url: `${BASE_URL}${productPath(p)}`,
    lastModified: p.updatedAt || lastmod,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  // ========================================
  // 7. COMBINE ALL PAGES
  // ========================================
  return [
    ...staticPages,
    ...shopPages,
    ...phonePages,
    ...locationPagesList,
    ...servicePagesList,
    ...modelPagesList,
    ...blogPages,
    ...productPages,
  ]
}
