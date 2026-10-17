// Cart pricing, shared by the cart page (to show totals) and the payment API
// (which re-prices from the database, so a browser can never set its own price).

import { STORE, deliveryFee } from "@/data/store-settings";

export type Fulfilment = "collect" | "delivery";

export interface PricedItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  category: string;
  devices: string[];
}

export interface BundlePair {
  device: string;
  caseId: string;
  protectorId: string;
  saving: number;
}

export interface CartTotals {
  subtotal: number;
  bundles: BundlePair[];
  bundleSaving: number;
  shipping: number;
  total: number;
}

const round = (n: number) => Math.round(n * 100) / 100;
const isCase = (c: string) => c === "Cases";
const isProtector = (c: string) => c === "Screen Protectors";

/**
 * Protection bundle: each case paired with a screen protector that fits the
 * same phone gets the bundle discount on both. Pairs are matched greedily,
 * highest-priced first, one unit at a time.
 */
export function findBundles(items: PricedItem[]): BundlePair[] {
  if (!STORE.bundle.enabled || STORE.bundle.discountPercent <= 0) return [];
  const pct = STORE.bundle.discountPercent / 100;
  const expand = (pred: (c: string) => boolean) =>
    items
      .filter((i) => pred(i.category))
      .flatMap((i) => Array.from({ length: Math.max(0, Math.floor(i.quantity)) }, () => i))
      .sort((a, b) => b.unitPrice - a.unitPrice);
  const cases = expand(isCase);
  const protectors = expand(isProtector);
  const used = new Set<number>();
  const pairs: BundlePair[] = [];
  for (const c of cases) {
    const idx = protectors.findIndex((p, i) => !used.has(i) && p.devices.some((d) => c.devices.includes(d)));
    if (idx === -1) continue;
    used.add(idx);
    const p = protectors[idx];
    const device = p.devices.find((d) => c.devices.includes(d)) || "";
    pairs.push({ device, caseId: c.id, protectorId: p.id, saving: round((c.unitPrice + p.unitPrice) * pct) });
  }
  return pairs;
}

export function priceCart(items: PricedItem[], fulfilment: Fulfilment): CartTotals {
  const subtotal = round(items.reduce((s, i) => s + i.unitPrice * i.quantity, 0));
  const bundles = findBundles(items);
  const bundleSaving = round(bundles.reduce((s, b) => s + b.saving, 0));
  const afterDiscount = round(subtotal - bundleSaving);
  const shipping = fulfilment === "delivery" ? deliveryFee(afterDiscount) : 0;
  return { subtotal, bundles, bundleSaving, shipping, total: round(afterDiscount + shipping) };
}

export const money = (n: number) => `$${n.toFixed(2)}`;
