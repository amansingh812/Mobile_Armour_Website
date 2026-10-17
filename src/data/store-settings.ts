// Shop decisions in one place. The policy pages, cart, checkout, home page,
// product pages and bundle builder all read from here.
//
// Values marked PROPOSED came from the approved designs and still need the
// owner's confirmation before launch. Change the value here and every page
// updates.

export const STORE = {
  /** PROPOSED: protection bundle = 1 case + 1 screen protector for the same phone. */
  bundle: {
    enabled: true as boolean,
    discountPercent: 10 as number, // PROPOSED
    label: "Protection bundle",
  },

  /** PROPOSED: glass fitted free when bought from us and collected/fitted at the kiosk. */
  freeFitting: true as boolean,

  /** PROPOSED: order online, pick up at the kiosk. */
  clickAndCollect: {
    enabled: true as boolean,
    readyText: "usually ready within 1 hour during opening hours", // PROPOSED
  },

  /** Delivery. The current site charges no shipping, so fee 0 keeps that. */
  delivery: {
    enabled: true as boolean,
    fee: 0 as number, // AUD. PROPOSED: confirm (0 = free delivery)
    freeOver: null as number | null, // e.g. 50 = free over $50; null = flat fee always
    carrier: "Australia Post", // PROPOSED
    timeText: "2–5 business days after dispatch", // PROPOSED
    countries: ["AU"] as const,
  },

  /** PROPOSED returns policy. Consumer guarantees under Australian Consumer Law always apply on top. */
  returns: {
    changeOfMindDays: 14 as number, // PROPOSED
    walkIn: true as boolean,
  },

  /** PROPOSED: wrong model? swap it the same day at the kiosk. */
  fitGuarantee: true as boolean,

  /**
   * Google rating shown on the home page. null = hidden.
   * Only fill in from the live Google Business Profile, e.g.
   * { rating: 4.9, count: 138, url: "https://g.page/..." }
   */
  googleRating: null as null | { rating: number; count: number; url: string },

  /** Link to the Google reviews (shown even when the rating is hidden). */
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=MOBILE+ARMOUR+Phone+Repair+Specialist+Warringal+Shopping+Centre",
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
