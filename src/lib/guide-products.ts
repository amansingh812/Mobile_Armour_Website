// Links guides (blog posts) and products both ways, from live catalogue data:
// a post's "Shop this guide" row shows in-stock products that match its
// `shop` rule, and each product page lists the guides that cover it.
// Pure functions (no database access), safe to use in any server component.
import type { ShopProduct } from '@/lib/shop-data';
import type { BlogPost } from '@/data/blog-posts';

export interface GuideShop {
  /** Heading for the product row, e.g. "Power banks in stock". */
  title?: string;
  /** Shop categories (DB names) the guide is about. */
  categories: string[];
  /** Only products that fit one of these phones (products made for any phone pass). */
  models?: string[];
  /** Case-insensitive regex the product name must match. */
  match?: string;
  /** Case-insensitive regex that rules a product out. */
  exclude?: string;
  /** Only products at or under this price (gift guides). */
  maxPrice?: number;
  /** Category page for "See all" (e.g. /shop/power-banks). */
  href?: string;
  /** How many tiles to show (default 8). */
  limit?: number;
}

const ID_RE = /\/products\/[^"'\s)]*?([a-f0-9]{24})/gi;

const inStock = (p: ShopProduct) => !(typeof p.stock === 'number' && p.stock <= 0);

function matchesShop(p: ShopProduct, shop: GuideShop): boolean {
  if (!shop.categories.includes(p.category)) return false;
  if (shop.models?.length) {
    const fits = p.deviceCompatibility || [];
    if (fits.length && !fits.some((d) => shop.models!.includes(d))) return false;
  }
  if (shop.match && !new RegExp(shop.match, 'i').test(p.name)) return false;
  if (shop.exclude && new RegExp(shop.exclude, 'i').test(p.name)) return false;
  if (shop.maxPrice != null && p.price > shop.maxPrice) return false;
  return true;
}

/** Product ids a post links to in its text. */
export function linkedProductIds(post: Pick<BlogPost, 'content'>): string[] {
  return Array.from(post.content.matchAll(ID_RE), (m) => m[1].toLowerCase());
}

/**
 * Products for a guide's "Shop this guide" row: the ones named in the text
 * first (if still in stock), then other in-stock matches, newest first.
 */
export function productsForGuide(post: BlogPost, all: ShopProduct[]): ShopProduct[] {
  const shop = post.shop;
  if (!shop) return [];
  const limit = shop.limit ?? 8;
  const byId = new Map(all.map((p) => [p._id, p]));
  const named = linkedProductIds(post)
    .map((id) => byId.get(id))
    .filter((p): p is ShopProduct => !!p && inStock(p) && matchesShop(p, shop));
  const rest = all.filter((p) => inStock(p) && matchesShop(p, shop) && !named.includes(p));
  return Array.from(new Set([...named, ...rest])).slice(0, limit);
}

/** Guides that cover a product: ones linking to it by name first, then ones whose topic includes it. */
export function guidesForProduct(product: ShopProduct, posts: BlogPost[], limit = 3): BlogPost[] {
  const id = product._id.toLowerCase();
  const linking = posts.filter((p) => linkedProductIds(p).includes(id));
  const topical = posts.filter((p) => p.shop && !linking.includes(p) && matchesShop(product, p.shop));
  return [...linking, ...topical].slice(0, limit);
}
