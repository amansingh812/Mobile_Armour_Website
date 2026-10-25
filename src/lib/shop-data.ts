// Server-only module (imports mongoose); never import it from a client component.
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { slugify } from '@/lib/products';
import { cleanColour, phoneModel, sortModels } from '@/data/phone-models';

/** One buyable option: the phones it fits, a colour, its price and whether it can be bought now. */
export interface ShopVariant {
  sku: string;
  models: string[];
  colour?: string;
  price: number;
  oldPrice?: number;
  images: string[];
  available: boolean;
}

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
  /** Model/colour options; absent for single-option products. */
  variants?: ShopVariant[];
  updatedAt?: string;
}

function toShopVariant(v: any, orderIn: boolean): ShopVariant {
  return {
    sku: String(v.sku),
    models: sortModels(Array.isArray(v.models) ? v.models : []),
    colour: cleanColour(v.colour),
    price: v.price,
    oldPrice: v.oldPrice ?? undefined,
    images: Array.isArray(v.images) ? v.images.filter(Boolean) : [],
    // Order-in options depend on the supplier; kiosk options on our own count.
    available: orderIn ? v.supplier?.inStock !== false : typeof v.stock === 'number' ? v.stock > 0 : true,
  };
}

function toShopProduct(p: any): ShopProduct {
  const orderIn = p.fulfilment === 'order-in';
  const variants: ShopVariant[] | undefined =
    Array.isArray(p.variants) && p.variants.length ? p.variants.map((v: any) => toShopVariant(v, orderIn)) : undefined;
  if (variants) {
    // The design as a whole: cheapest option's price, every phone it fits,
    // and "in stock" while any option can be bought.
    const cheapest = variants.reduce((a, b) => (b.price < a.price ? b : a));
    return {
      _id: String(p._id),
      name: p.name,
      description: p.description || '',
      price: cheapest.price,
      oldPrice: cheapest.oldPrice,
      newPrice: undefined,
      imageUrl: p.imageUrl || cheapest.images[0],
      images: Array.isArray(p.images) ? p.images.filter(Boolean) : undefined,
      category: p.category,
      stock: variants.some((v) => v.available) ? undefined : 0,
      brand: p.brand ?? undefined,
      features: Array.isArray(p.features) ? p.features : undefined,
      deviceCompatibility: sortModels(variants.flatMap((v) => v.models)),
      fulfilment: orderIn ? 'order-in' : undefined,
      variants,
      updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
    };
  }
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
    // Order-in items are bought from the supplier after the sale, so the kiosk count
    // doesn't limit them; they're unavailable only when the supplier is out.
    stock:
      p.fulfilment === 'order-in'
        ? p.supplier?.inStock === false
          ? 0
          : undefined
        : typeof p.stock === 'number'
          ? p.stock
          : undefined,
    brand: p.brand ?? undefined,
    features: Array.isArray(p.features) ? p.features : undefined,
    deviceCompatibility: Array.isArray(p.deviceCompatibility) ? p.deviceCompatibility : undefined,
    fulfilment: p.fulfilment === 'order-in' ? 'order-in' : undefined,
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
  };
}

/** Cache tag for every product query; admin saves and imports revalidate it. */
export const PRODUCTS_TAG = 'products';
/** Shared (cross-request) cache lifetime for product data, in seconds. */
const PRODUCTS_TTL = 3600;

/**
 * Fields a product tile, add-on card or listing needs. Leaves out the long
 * description, specs, tags, supplier links and gallery photos, which only the
 * product page uses — this keeps listing queries and cached payloads small.
 */
export const LIST_FIELDS = {
  name: 1,
  price: 1,
  oldPrice: 1,
  newPrice: 1,
  imageUrl: 1,
  category: 1,
  stock: 1,
  brand: 1,
  features: 1,
  deviceCompatibility: 1,
  fulfilment: 1,
  'supplier.inStock': 1,
  createdAt: 1,
  updatedAt: 1,
  'variants.sku': 1,
  'variants.models': 1,
  'variants.colour': 1,
  'variants.price': 1,
  'variants.oldPrice': 1,
  'variants.stock': 1,
  'variants.images': 1,
  'variants.supplier.inStock': 1,
} as const;

/** Listing shape: tiles only show the first photo of each option. */
export function toListProduct(doc: any): ShopProduct {
  const p = toShopProduct(doc);
  if (p.variants) p.variants = p.variants.map((v) => ({ ...v, images: v.images.slice(0, 1) }));
  return p;
}

const loadAllProducts = unstable_cache(
  async (): Promise<ShopProduct[]> => {
    await dbConnect();
    const docs = await Product.find({}, LIST_FIELDS).sort({ createdAt: -1 }).lean();
    return docs.map(toListProduct);
  },
  ['shop-all-products-v2'],
  { tags: [PRODUCTS_TAG], revalidate: PRODUCTS_TTL }
);

/**
 * All products, newest first, in listing shape (no description or gallery).
 * Shared across requests and visitors, so most page renders don't touch the
 * database. Returns [] if the database is unreachable.
 */
export const getAllProducts = cache(async function getAllProducts(): Promise<ShopProduct[]> {
  try {
    return await loadAllProducts();
  } catch (err) {
    console.error('[shop-data] getAllProducts failed:', err);
    return [];
  }
});

const loadAllProductsFull = unstable_cache(
  async (): Promise<ShopProduct[]> => {
    await dbConnect();
    const docs = await Product.find({}).sort({ createdAt: -1 }).lean();
    return docs.map(toShopProduct);
  },
  ['shop-all-products-full-v1'],
  { tags: [PRODUCTS_TAG], revalidate: PRODUCTS_TTL }
);

/** All products with descriptions and photos (Google product feed). Errors aren't cached. */
export async function getAllProductsFull(): Promise<ShopProduct[]> {
  try {
    return await loadAllProductsFull();
  } catch (err) {
    console.error('[shop-data] getAllProductsFull failed:', err);
    return [];
  }
}

const loadCategoryProducts = unstable_cache(
  async (dbCategory: string, device?: string): Promise<ShopProduct[]> => {
    await dbConnect();
    const query: Record<string, unknown> = { category: dbCategory };
    if (device) query.deviceCompatibility = device;
    const docs = await Product.find(query, LIST_FIELDS).sort({ createdAt: -1 }).lean();
    return docs.map(toListProduct);
  },
  ['shop-category-products-v2'],
  { tags: [PRODUCTS_TAG], revalidate: PRODUCTS_TTL }
);

/** Products in one category, optionally for one device. Newest first. */
export const getCategoryProducts = cache(async function getCategoryProducts(dbCategory: string, device?: string): Promise<ShopProduct[]> {
  try {
    return await loadCategoryProducts(dbCategory, device);
  } catch (err) {
    console.error('[shop-data] getCategoryProducts failed:', err);
    return [];
  }
});

const loadProductById = unstable_cache(
  async (id: string): Promise<ShopProduct | null> => {
    await dbConnect();
    const doc = await Product.findById(id).lean();
    return doc ? toShopProduct(doc) : null;
  },
  ['shop-product-by-id-v2'],
  { tags: [PRODUCTS_TAG], revalidate: PRODUCTS_TTL }
);

/** One product by Mongo id, or null. Cached per request (metadata, layout and page all need it) and across requests. */
export const getProductById = cache(async function getProductById(id: string): Promise<ShopProduct | null> {
  if (!/^[a-f0-9]{24}$/i.test(id)) return null;
  try {
    return await loadProductById(id);
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
    // Current models get a page from their first product; older ones need a few.
    .filter(([d, n]) => n >= (phoneModel(d)?.launch ? 1 : MIN_PRODUCTS_FOR_DEVICE_PAGE))
    .map(([device, count]) => ({ device, slug: slugify(device), count }))
    .sort((a, b) => {
      const order = sortModels([a.device, b.device]);
      return order[0] === a.device ? -1 : 1;
    });
}
