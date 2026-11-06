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

export type DealKind = "bundle" | "glassPair";

/** Two cart units that earn a discount together. */
export interface BundlePair {
  kind: DealKind;
  device: string;
  /** Line ids of the two units (case + protector, or screen + camera glass). */
  ids: [string, string];
  percent: number;
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
const CAMERA = /\b(camera|lens)\b/i;

/** Camera lens guards live in "Screen Protectors" with camera/lens in the name. */
export const isCameraGuard = (category: string, name: string) =>
  category === "Screen Protectors" && CAMERA.test(name);
export const isScreenGlass = (category: string, name: string) =>
  category === "Screen Protectors" && !CAMERA.test(name);
const isCase = (category: string) => category === "Cases";

export const dealLabel = (kind: DealKind) => (kind === "bundle" ? STORE.bundle.label : STORE.glassPair.label);

/** Phones the screen + camera glass deal covers, from the devices given. */
export function glassPairDevice(devices: string[]): string | undefined {
  if (!STORE.glassPair.enabled || STORE.glassPair.discountPercent <= 0) return undefined;
  return devices.find((d) => STORE.glassPair.devices.includes(d));
}

interface Unit {
  n: number;
  item: PricedItem;
}

/**
 * Each unit is used in at most one deal, so nothing is discounted twice.
 * 1. Protection bundle (when on): case + screen protector for the same phone.
 * 2. Screen + camera glass: screen protector + camera guard for the same
 *    eligible phone.
 * Pairs are matched greedily, highest-priced first, one unit at a time.
 */
export function findBundles(items: PricedItem[]): BundlePair[] {
  const units: Unit[] = items
    .flatMap((item) => Array.from({ length: Math.max(0, Math.floor(item.quantity)) }, () => item))
    .sort((a, b) => b.unitPrice - a.unitPrice)
    .map((item, n) => ({ n, item }));
  const used = new Set<number>();
  const pairs: BundlePair[] = [];

  const match = (
    kind: DealKind,
    percent: number,
    isA: (i: PricedItem) => boolean,
    isB: (i: PricedItem) => boolean,
    eligible: (d: string) => boolean
  ) => {
    if (percent <= 0) return;
    for (const a of units) {
      if (used.has(a.n) || !isA(a.item)) continue;
      const b = units.find(
        (u) => !used.has(u.n) && u.n !== a.n && isB(u.item) && u.item.devices.some((d) => eligible(d) && a.item.devices.includes(d))
      );
      if (!b) continue;
      used.add(a.n);
      used.add(b.n);
      const device = b.item.devices.find((d) => eligible(d) && a.item.devices.includes(d)) || "";
      pairs.push({
        kind,
        device,
        ids: [a.item.id, b.item.id],
        percent,
        saving: round((a.item.unitPrice + b.item.unitPrice) * (percent / 100)),
      });
    }
  };

  if (STORE.bundle.enabled) {
    match("bundle", STORE.bundle.discountPercent, (i) => isCase(i.category), (i) => isScreenGlass(i.category, i.name), () => true);
  }
  if (STORE.glassPair.enabled) {
    match(
      "glassPair",
      STORE.glassPair.discountPercent,
      (i) => isScreenGlass(i.category, i.name),
      (i) => isCameraGuard(i.category, i.name),
      (d) => STORE.glassPair.devices.includes(d)
    );
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

/** One line per kind of deal in the cart, e.g. "Screen + camera glass (10% off)". */
export function dealSummary(bundles: BundlePair[]): string {
  const kinds = Array.from(new Set(bundles.map((b) => b.kind)));
  return kinds
    .map((k) => {
      const n = bundles.filter((b) => b.kind === k).length;
      const pct = bundles.find((b) => b.kind === k)!.percent;
      return `${dealLabel(k)} (${n > 1 ? `${n}× ` : ""}${pct}% off)`;
    })
    .join(" + ");
}

export const money = (n: number) => `$${n.toFixed(2)}`;
