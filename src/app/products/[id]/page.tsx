import { notFound } from 'next/navigation';
import ProductView from './ProductView';
import { productIdFromParam, productSegment } from '@/lib/products';
import { getProductById, getAllProducts } from '@/lib/shop-data';
import { getPhoneHubs } from '@/lib/phones';
import { isMagnetic } from '@/lib/shop-copy';
import type { ShopProduct } from '@/lib/shop-data';

// Which categories make good add-ons, best first.
const ADDON_ORDER: Record<string, string[]> = {
  Cases: ['Screen Protectors', 'Power Banks', 'Cables & Adapters', 'Car Holders'],
  'Screen Protectors': ['Cases', 'Cables & Adapters', 'Power Banks'],
};
const DEFAULT_ORDER = ['Cases', 'Screen Protectors', 'Cables & Adapters', 'Power Banks', 'Car Holders'];

/** Up to 3 in-stock add-ons: things made for the same phone first, then universal chargers and cables. */
function pickAddOns(product: ShopProduct, all: ShopProduct[]): ShopProduct[] {
  const devices = product.deviceCompatibility || [];
  const order = ADDON_ORDER[product.category] || DEFAULT_ORDER;
  const mag = isMagnetic(product);
  const usbC = devices.some((d) => /iPhone (1[5-9]|Duo|Air)|Galaxy|Pixel/i.test(d));
  const fits = (p: ShopProduct) => devices.length > 0 && (p.deviceCompatibility || []).some((d) => devices.includes(d));
  // Cases and glass are cut for one model, so they must fit. Chargers and cables can be
  // universal, but not when the name ties them to particular phones.
  const modelSpecific = (p: ShopProduct) =>
    p.category === 'Cases' || p.category === 'Screen Protectors' || /iphone\s*\d|galaxy|pixel|ipad/i.test(p.name);
  const universal = (p: ShopProduct) => !(p.deviceCompatibility || []).length && !modelSpecific(p);
  const score = (p: ShopProduct) => (fits(p) ? 0 : 10) + order.indexOf(p.category) - (mag && isMagnetic(p) ? 0.5 : 0);
  const pool = all
    .filter((p) => p._id !== product._id && order.includes(p.category))
    .filter((p) => !(typeof p.stock === 'number' && p.stock <= 0))
    .filter((p) => fits(p) || universal(p))
    // iPhone 15 onwards (and Duo/Air) charge over USB-C, so no Lightning cables.
    .filter((p) => !(usbC && /lightning/i.test(p.name)))
    .sort((a, b) => score(a) - score(b));
  // One per category first, so it's a glass + a charger, not three glasses.
  const out: ShopProduct[] = [];
  for (const p of pool) if (out.length < 3 && !out.some((o) => o.category === p.category)) out.push(p);
  for (const p of pool) if (out.length < 3 && !out.includes(p)) out.push(p);
  return out;
}

interface Props {
  params: Promise<{ id: string }>;
}

// Re-check stock and prices at most once an hour (admin saves refresh it sooner).
export const revalidate = 3600;

// Build every product page at deploy time and serve it from Vercel's cache.
// Products added later are rendered on their first visit, then cached too.
// (Without this, Next renders each product page on every request.)
export async function generateStaticParams() {
  const all = await getAllProducts();
  return all.map((p) => ({ id: productSegment(p) }));
}

// Server-rendered product page: name, price, description, compatibility and
// related products are all in the HTML Google and AI crawlers read.
// (Redirects from old id-only URLs happen in layout.tsx.)
export default async function ProductDetailPage({ params }: Props) {
  const { id: param } = await params;
  const id = productIdFromParam(param);
  if (!id) notFound();
  const product = await getProductById(id);
  if (!product) notFound();

  const [all, hubs] = await Promise.all([getAllProducts(), getPhoneHubs()]);
  const devices = product.deviceCompatibility || [];
  const addOns = pickAddOns(product, all);
  const sameCategory = all
    .filter((p) => p._id !== product._id && p.category === product.category)
    .filter((p) => !devices.length || (p.deviceCompatibility || []).some((d) => devices.includes(d)))
    .slice(0, 4);

  return (
    <ProductView
      product={product}
      addOns={addOns}
      alternatives={sameCategory}
      hubDevices={hubs.map((h) => h.device)}
    />
  );
}
