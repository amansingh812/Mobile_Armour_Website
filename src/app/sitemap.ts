import type { MetadataRoute } from 'next'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import { categories } from '@/data/categories'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.mobilearmour.com.au'

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
      priority: 1.0, // Homepage - highest priority
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: lastmod,
      changeFrequency: 'daily',
      priority: 0.9, // Main products page - very high priority
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
      priority: 0.8, // Contact is important for local business
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.8, // Services page important for SEO
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/price`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // ========================================
  // 2. CATEGORY PAGES - Product categories
  // ========================================
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => {
    // Extract slug from category link
    const categoryParam = encodeURIComponent(category.name)
    return {
      url: `${BASE_URL}/products?category=${categoryParam}`,
      lastModified: lastmod,
      changeFrequency: 'daily',
      priority: 0.85, // Category pages are very important for SEO
    }
  })

  // ========================================
  // 3. DYNAMIC PRODUCT PAGES - Individual products
  // ========================================
  let productPages: MetadataRoute.Sitemap = []
  
  try {
    await dbConnect()
    const products = await Product.find({}).select('_id updatedAt').lean()
    
    productPages = products.map((product: any) => ({
      url: `${BASE_URL}/products/${product._id.toString()}`,
      lastModified: product.updatedAt?.toISOString() || lastmod,
      changeFrequency: 'weekly' as const,
      priority: 0.75, // Individual products - good priority
    }))
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
    // Continue without product pages if DB fails
  }

  // ========================================
  // 4. COMBINE ALL PAGES
  // ========================================
  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
  ]
}
