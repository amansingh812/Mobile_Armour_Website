// Shop decisions in one place. The policy pages, cart, checkout, home page,
// product pages and bundle builder all read from here.
//
// Confirmed by the owner on 24 Oct 2026. Change a value here and every page
// updates (e.g. switch the bundle back on later).

export const STORE = {
  /** Protection bundle = 1 case + 1 screen protector for the same phone. Off for now. */
  bundle: {
    enabled: false as boolean,
    discountPercent: 10 as number,
    label: "Protection bundle",
  },

  /** Free screen protector fitting at the kiosk. Not offered. */
  freeFitting: false as boolean,

  /** Order online, pick up at the kiosk. */
  clickAndCollect: {
    enabled: true as boolean,
    readyText: "usually ready within 1 hour during opening hours",
  },

  /** Delivery: $9.95, free on orders of $100 or more. */
  delivery: {
    enabled: true as boolean,
    fee: 9.95 as number, // AUD
    freeOver: 100 as number | null, // free at or above this order value; null = flat fee always
    carrier: "Australia Post",
    timeText: "2–5 business days after dispatch",
    countries: ["AU"] as const,
  },

  /**
   * No change-of-mind returns (0 days). Wrong-model swaps (fit guarantee) and
   * faulty items under Australian Consumer Law still apply.
   */
  returns: {
    changeOfMindDays: 0 as number,
    walkIn: false as boolean,
  },

  /** Wrong model? Swap it the same day at the kiosk. */
  fitGuarantee: true as boolean,

  /**
   * Google rating shown on the home page. null = hidden.
   * Only fill in from the live Google Business Profile, e.g.
   * { rating: 4.9, count: 138, url: "https://g.page/..." }
   */
  googleRating: {
    rating: 5.0,
    count: 142, // from Google Maps, 24 Oct 2026 - update now and then
    url: "https://search.google.com/local/reviews?placeid=ChIJX3kHl8hH1moRhYBLXid25Sw",
  } as null | { rating: number; count: number; url: string },

  /** Google Place ID for the kiosk (used for review links). */
  googlePlaceId: "ChIJX3kHl8hH1moRhYBLXid25Sw",

  /** Link to the Google reviews (shown even when the rating is hidden). */
  googleReviewsUrl: "https://search.google.com/local/reviews?placeid=ChIJX3kHl8hH1moRhYBLXid25Sw",
} as const;

export interface Promise_ {
  icon: string;
  title: string;
  sub: string;
  href: string;
}

/** The promise strip shown on home, product, cart and why-buy pages. */
export function storePromises(): Promise_[] {
  const list: Promise_[] = [];
  if (STORE.fitGuarantee)
    list.push({ icon: "✓", title: "Fit guarantee", sub: "Wrong model? Swap it same day", href: "/delivery-returns#fit-guarantee" });
  if (STORE.freeFitting)
    list.push({ icon: "◎", title: "Glass fitted free", sub: "Bubble-free, at the kiosk", href: "/delivery-returns#fitting" });
  if (STORE.clickAndCollect.enabled)
    list.push({ icon: "⏱", title: "Click & collect", sub: "Pick up at Warringal", href: "/delivery-returns#click-and-collect" });
  if (STORE.returns.walkIn)
    list.push({ icon: "↺", title: "Walk-in returns", sub: "No posting back", href: "/delivery-returns#returns" });
  list.push({ icon: "⚙", title: "Repair desk on site", sub: "Screens, batteries, ports", href: "/services" });
  return list.slice(0, 5);
}

export function deliveryFee(subtotal: number): number {
  const d = STORE.delivery;
  if (!d.enabled) return 0;
  if (d.freeOver !== null && subtotal >= d.freeOver) return 0;
  return d.fee;
}

export function deliveryFeeText(): string {
  const d = STORE.delivery;
  if (d.fee === 0) return "Free";
  return d.freeOver !== null ? `$${d.fee.toFixed(2)} (free over $${d.freeOver})` : `$${d.fee.toFixed(2)}`;
}
