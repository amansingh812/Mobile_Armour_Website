import type { MetadataRoute } from 'next'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import { categories } from '@/data/categories'
import { getAllSuburbSlugs } from '@/data/location-pages'
import { getAllServiceSlugs } from '@/data/service-pages'
import { getAllModelSlugs } from '@/data/model-repair-pages'
import { blogPosts } from '@/data/blog-posts'

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
      url: `${BASE_URL}/price`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/project-details-gallery`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/project-details-right-sidebar`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/project-details-left-sidebar`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/project-grid`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/project-list`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/project-metro`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/project-slider`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/project-standard`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
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
    // Pricing page
    {
      url: `${BASE_URL}/pricing`,
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
  ]

  // ========================================
  // 2. CATEGORY PAGES - Product categories
  // ========================================
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => {
    const categoryParam = encodeURIComponent(category.name)
    return {
      url: `${BASE_URL}/products?category=${categoryParam}`,
      lastModified: lastmod,
      changeFrequency: 'daily',
      priority: 0.85,
    }
  })

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
  let productPages: MetadataRoute.Sitemap = []

  try {
    await dbConnect()
    const products = await Product.find({}).select('_id updatedAt').lean()

    productPages = products.map((product: any) => ({
      url: `${BASE_URL}/products/${product._id.toString()}`,
      lastModified: product.updatedAt?.toISOString() || lastmod,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
  }

  // ========================================
  // 7. COMBINE ALL PAGES
  // ========================================
  return [
    ...staticPages,
    ...categoryPages,
    ...locationPagesList,
    ...servicePagesList,
    ...modelPagesList,
    ...blogPages,
    ...productPages,
  ]
}
