// Phone hubs: one page per phone model with everything that fits it.
import { cache } from 'react';
import { getAllProducts, type ShopProduct } from '@/lib/shop-data';
import { slugify } from '@/lib/products';
import { PHONE_MODELS, phoneModel, isWatchSize } from '@/data/phone-models';

const PHONE_ORDER = new Map(PHONE_MODELS.map((m, i) => [m.name, i]));

export const MIN_PRODUCTS_FOR_PHONE_PAGE = 2;

export interface PhoneHub {
  device: string;
  slug: string;
  products: ShopProduct[];
}

/** Every phone with enough products for its own page, newest phones first. */
export const getPhoneHubs = cache(async function getPhoneHubs(): Promise<PhoneHub[]> {
  const all = await getAllProducts();
  const map = new Map<string, ShopProduct[]>();
  for (const p of all) for (const d of p.deviceCompatibility || []) map.set(d, [...(map.get(d) || []), p]);
  return Array.from(map.entries())
    .filter(([d, list]) => !isWatchSize(d) && list.length >= (phoneModel(d)?.launch ? 1 : MIN_PRODUCTS_FOR_PHONE_PAGE))
    .map(([device, products]) => ({ device, slug: slugify(device), products }))
    // Newest phones first (shop order), then older models by how much we stock.
    .sort((a, b) => {
      const ia = PHONE_ORDER.get(a.device) ?? 999;
      const ib = PHONE_ORDER.get(b.device) ?? 999;
      return ia !== ib ? ia - ib : b.products.length - a.products.length;
    });
});

export async function getPhoneHub(slug: string): Promise<PhoneHub | null> {
  return (await getPhoneHubs()).find((h) => h.slug === slug) || null;
}

/** "13 cases · 4 screen protectors" style summary. */
export function hubSummary(products: ShopProduct[]): string {
  const n = (cat: string) => products.filter((p) => p.category === cat).length;
  const parts = [
    [n('Cases'), 'case', 'cases'],
    [n('Screen Protectors'), 'screen protector', 'screen protectors'],
    [n('Cables & Adapters'), 'charger or cable', 'chargers & cables'],
    [n('Car Holders'), 'car accessory', 'car accessories'],
    [n('Power Banks'), 'power bank', 'power banks'],
  ] as const;
  return parts
    .filter(([c]) => c > 0)
    .map(([c, one, many]) => `${c} ${c === 1 ? one : many}`)
    .join(' · ');
}
