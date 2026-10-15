// Helpers for public product URLs.
//
// Product pages live at /products/{name-slug}-{mongoId}, e.g.
//   /products/iphone-17-pro-max-redefine-shield-case-690a3f86e85b1a96832b6fd5
// The trailing 24-character id is what we look up; the slug is for people and
// Google. Old id-only URLs (/products/690a3f...) 301-redirect to the full one.

const OBJECT_ID_RE = /([a-f0-9]{24})$/i;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
    .replace(/-+$/g, '');
}

/** Path segment for a product: "{slug}-{id}" (or just the id if the name is empty). */
export function productSegment(product: { _id: unknown; name?: string }): string {
  const id = String(product._id);
  const slug = slugify(product.name || '');
  return slug ? `${slug}-${id}` : id;
}

/** Public path for a product page. */
export function productPath(product: { _id: unknown; name?: string }): string {
  return `/products/${productSegment(product)}`;
}

/** Extracts the Mongo id from a "/products/[id]" param, with or without a slug. */
export function productIdFromParam(param: string | undefined | null): string | null {
  if (!param) return null;
  const match = decodeURIComponent(param).match(OBJECT_ID_RE);
  return match ? match[1].toLowerCase() : null;
}

/** Price a customer pays: newPrice when set, otherwise price. */
export function currentPrice(p: { price: number; newPrice?: number | null }): number {
  return typeof p.newPrice === 'number' && p.newPrice > 0 ? p.newPrice : p.price;
}
