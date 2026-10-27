// GA4 ecommerce events (gtag is loaded in app/layout.tsx).
// Event names and fields follow Google's recommended ecommerce schema so the
// Monetisation reports fill in: view_item -> add_to_cart -> begin_checkout -> purchase.

export interface GaItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
}

type Gtag = (command: 'event', name: string, params: Record<string, unknown>) => void;

export function track(name: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  try {
    const g = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof g === 'function') g('event', name, { currency: 'AUD', ...params });
  } catch {}
}

/** One GA item from a cart/product line. */
export function gaItem(p: {
  _id: string;
  name: string;
  category?: string;
  price?: number;
  newPrice?: number;
  variantSku?: string;
  variantLabel?: string;
}, quantity = 1): GaItem {
  const price = p.newPrice && p.newPrice > 0 ? p.newPrice : p.price;
  return {
    item_id: p.variantSku || p._id,
    item_name: p.name,
    item_category: p.category,
    item_variant: p.variantLabel,
    price: typeof price === 'number' ? price : undefined,
    quantity,
  };
}

export const gaValue = (items: GaItem[]) =>
  Math.round(items.reduce((n, i) => n + (i.price || 0) * (i.quantity || 1), 0) * 100) / 100;
