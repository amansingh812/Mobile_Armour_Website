// Server-only module (imports mongoose); never import it from a client component.
import { cache } from 'react';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { slugify } from '@/lib/products';

// Plain, serialisable product shape passed to pages and client components.
export interface ShopProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  newPrice?: number;
  imageUrl: string;
  images?: string[];
  category: string;
  stock?: number;
  brand?: string;
  features?: string[];
  deviceCompatibility?: string[];
  /** 'order-in' = ordered from the supplier when bought. */
  fulfilment?: 'kiosk' | 'order-in';
  updatedAt?: string;
}

function toShopProduct(p: any): ShopProduct {
  return {
    _id: String(p._id),
    name: p.name,
    description: p.description || '',
    price: p.price,
    oldPrice: p.oldPrice ?? undefined,
    newPrice: p.newPrice ?? undefined,
    imageUrl: p.imageUrl,
    images: Array.isArray(p.images) ? p.images.filter(Boolean) : undefined,
    category: p.category,
    stock: typeof p.stock === 'number' ? p.stock : undefined,
    brand: p.brand ?? undefined,
    features: Array.isArray(p.features) ? p.features : undefined,
    deviceCompatibility: Array.isArray(p.deviceCompatibility) ? p.deviceCompatibility : undefined,
    fulfilment: p.fulfilment === 'order-in' ? 'order-in' : undefined,
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
  };
}

/** All products, newest first. Returns [] if the database is unreachable. */
export async function getAllProducts(): Promise<ShopProduct[]> {
  try {
    await dbConnect();
    const docs = await Product.find({}).sort({ createdAt: -1 }).lean();
    return docs.map(toShopProduct);
  } catch (err) {
    console.error('[shop-data] getAllProducts failed:', err);
    return [];
  }
}

/** Products in one category, optionally for one device. Newest first. */
export const getCategoryProducts = cache(async function getCategoryProducts(dbCategory: string, device?: string): Promise<ShopProduct[]> {
  try {
    await dbConnect();
    const query: Record<string, unknown> = { category: dbCategory };
    if (device) query.deviceCompatibility = device;
    const docs = await Product.find(query).sort({ createdAt: -1 }).lean();
    return docs.map(toShopProduct);
  } catch (err) {
    console.error('[shop-data] getCategoryProducts failed:', err);
    return [];
  }
});

/** One product by Mongo id, or null. Cached per request (metadata, layout and page all need it). */
export const getProductById = cache(async function getProductById(id: string): Promise<ShopProduct | null> {
  try {
    await dbConnect();
    const doc = await Product.findById(id).lean();
    return doc ? toShopProduct(doc) : null;
  } catch (err) {
    console.error('[shop-data] getProductById failed:', err);
    return null;
  }
});

/** Minimum products a device needs before it gets its own page (avoids thin pages). */
export const MIN_PRODUCTS_FOR_DEVICE_PAGE = 2;

/**
 * Devices with enough products in a category to deserve a /shop/{cat}/{device} page.
 * A device page is made even when every product in the category fits it: it
 * targets a different search ("iphone 17 pro max case" vs "phone cases") and
 * has its own copy and questions.
 */
export function devicesWithPages(products: ShopProduct[]): { device: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    for (const d of p.deviceCompatibility || []) counts.set(d, (counts.get(d) || 0) + 1);
  }
  return Array.from(counts.entries())
    .filter(([, n]) => n >= MIN_PRODUCTS_FOR_DEVICE_PAGE)
    .map(([device, count]) => ({ device, slug: slugify(device), count }))
    .sort((a, b) => b.count - a.count);
}
