// Intro paragraphs and questions for shop listing pages, written from the
// stock itself (counts and prices), so they stay true as products change.
import type { Faq } from '@/data/faqs';
import type { ShopProduct } from '@/lib/shop-data';
import { currentPrice } from '@/lib/products';
import { BUSINESS, hoursShort } from '@/data/business';
import { STORE, deliveryFeeText } from '@/data/store-settings';

const has = (re: RegExp) => (p: ShopProduct) => re.test(p.name);
export const isMagnetic = has(/magsafe|magnetic/i);
export const isClear = has(/clear|transparent|jelly|crystal/i);
export const isWallet = has(/wallet|card holder|diary|flip/i);
export const isLeather = has(/leather|diary|\bpu\b/i);

/** Other names people search for a phone ("iPhone Fold" for the iPhone Duo). */
export function deviceAlias(device: string): string | undefined {
  return device === 'iPhone Duo' ? 'iPhone Fold' : undefined;
}
export const isRugged = has(/heavy duty|armou?r|shock|impact|kevlar|defender/i);
export const isPrivacy = has(/privacy/i);
export const isMatte = has(/matte|anti-glare/i);

const money = (n: number) => (n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`);
export const fromPrice = (products: ShopProduct[]) =>
  products.length ? money(Math.min(...products.map((p) => currentPrice(p)))) : null;

function count(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

/** "3 are magnetic, 2 are clear and 1 holds cards" from a list of [n, phrase]. */
function listParts(parts: [number, string][]): string {
  const p = parts.filter(([n]) => n > 0).map(([n, s]) => `${n} ${s}`);
  if (!p.length) return '';
  return p.length === 1 ? p[0] : `${p.slice(0, -1).join(', ')} and ${p[p.length - 1]}`;
}

const isOrderIn = (p: ShopProduct) => p.fulfilment === 'order-in';

/**
 * Where the products are, honestly: kiosk stock vs ordered in from our supplier.
 * Reads after a count, e.g. "12 iPhone 18 cases " + availability(products).
 */
export function availability(products: ShopProduct[]): string {
  const o = products.filter(isOrderIn).length;
  const k = products.length - o;
  const at = `${BUSINESS.address.centre}, Heidelberg`;
  if (!o) return `in stock at Mobile Armour, ${at}`;
  if (!k) return `at Mobile Armour, ${at}, ordered in for you (${STORE.orderIn.readyText})`;
  return `at Mobile Armour, ${at}: ${k} in stock at the kiosk, ${o} ordered in for you`;
}

function collectFaq(id: string, products: ShopProduct[] = []): Faq {
  const o = products.filter(isOrderIn).length;
  const k = products.length - o;
  if (STORE.clickAndCollect.enabled && o > 0) {
    return {
      id,
      q: 'Can I pick it up from the kiosk?',
      short: k
        ? `Yes. Choose click & collect at checkout: kiosk stock is ${STORE.clickAndCollect.readyText}; ordered-in items are ${STORE.orderIn.readyText}, and we email you when it's ready.`
        : `Yes. Choose click & collect at checkout: we order it in for you (${STORE.orderIn.readyText}) and email you when it's ready.`,
      more: `Collect from ${BUSINESS.address.unit}, ${BUSINESS.address.centre} (${hoursShort()}). Delivery across Australia is ${deliveryFeeText().toLowerCase()}.`,
    };
  }
  return {
    id,
    q: 'Can I pick it up today?',
    short: STORE.clickAndCollect.enabled
      ? `Yes. Order online and choose click & collect: it's ${STORE.clickAndCollect.readyText}.`
      : 'Yes, walk in during opening hours and buy it at the kiosk.',
    more: `Or walk in to ${BUSINESS.address.unit}, ${BUSINESS.address.centre} (${hoursShort()}). Delivery across Australia is ${deliveryFeeText().toLowerCase()}.`,
  };
}

function seeFaq(id: string, what: string, products: ShopProduct[] = []): Faq {
  const o = products.filter(isOrderIn).length;
  const k = products.length - o;
  if (o > 0 && k === 0)
    return {
      id,
      q: `Can I see the ${what} before I buy?`,
      short: `These are ordered in for you when you buy, so they aren't on display at the kiosk.`,
      more: `Call ${BUSINESS.phoneDisplay} and we'll tell you which similar ${what} we have at ${BUSINESS.address.centre} to try.`,
    };
  return {
    id,
    q: `Can I see the ${what} before I buy?`,
    short:
      o > 0
        ? `${k} of these are stocked at our kiosk in ${BUSINESS.address.centre}, Heidelberg; the other ${o} are ordered in when you buy.`
        : `Yes. Everything on this page is stocked at our kiosk in ${BUSINESS.address.centre}, Heidelberg.`,
    more: 'Bring your phone and try a case on, or compare glass side by side.',
  };
}

function fitFaq(id: string, device: string, what: string): Faq {
  return {
    id,
    q: `Will these ${what} fit my ${device}?`,
    short: `Yes. Every ${what.replace(/s$/, '')} on this page is listed for the ${device}.`,
    more: `Not sure which model you have? Check Settings > General > About.${
      STORE.fitGuarantee ? ' Bought the wrong one? Bring it back unused and we swap it the same day.' : ''
    }`,
  };
}

/** Copy for /shop/{category}/{device}. */
export function deviceListingCopy(catSlug: string, device: string, products: ShopProduct[]) {
  const n = products.length;
  const from = fromPrice(products);
  if (catSlug === 'cases') {
    const mag = products.filter(isMagnetic).length;
    const parts = listParts([
      [mag, mag === 1 ? 'is magnetic (MagSafe)' : 'are magnetic (MagSafe)'],
      [products.filter(isClear).length, 'are clear'],
      [products.filter(isWallet).length, 'hold cards'],
      [products.filter(isLeather).length, 'are leather or leather-look'],
      [products.filter(isRugged).length, 'are heavy-duty'],
    ]);
    const faqs: Faq[] = [fitFaq('fit', device, 'cases')];
    if (mag > 0)
      faqs.push({
        id: 'magsafe',
        q: `Do these ${device} cases work with MagSafe?`,
        short: `${mag} of the ${n} have magnets built in, so MagSafe chargers, wallets and car mounts snap on.`,
        more: 'Cases without magnets still charge on a wireless pad, but MagSafe accessories won’t hold.',
      });
    faqs.push(seeFaq('see', 'cases', products), collectFaq('collect', products));
    return {
      intro: [
        `${count(n, `${device} case`, `${device} cases`)} ${availability(products)}${from ? `, from ${from}` : ''}.${parts ? ` Of these, ${parts}.` : ''}`,
        `Every case and cover here is listed for the ${device}${deviceAlias(device) ? ` (sometimes called the ${deviceAlias(device)})` : ''}. Phones from the same year differ in size and camera layout, so check the fit on each case: where one also fits another model with the same body, we say so.`,
      ],
      faqs,
    };
  }
  if (catSlug === 'screen-protectors') {
    const priv = products.filter(isPrivacy).length;
    const faqs: Faq[] = [fitFaq('fit', device, 'screen protectors')];
    if (priv > 0)
      faqs.push({
        id: 'privacy',
        q: 'What does a privacy screen protector do?',
        short: 'It darkens the screen when viewed from the side, so people next to you can’t read it.',
        more: 'Looking straight on, you see the screen normally, slightly dimmer than with clear glass.',
      });
    faqs.push(seeFaq('see', 'screen protectors', products), collectFaq('collect', products));
    return {
      intro: [
        `${count(n, `${device} screen protector`, `${device} screen protectors`)} ${availability(products)}${from ? `, from ${from}` : ''}${priv ? `, including ${priv} privacy glass` : ''}.`,
        `Each one is cut for the ${device}'s screen and front camera, so it covers edge to edge without lifting.`,
      ],
      faqs,
    };
  }
  return {
    intro: [
      `${count(n, 'product', 'products')} for the ${device} ${availability(products)}${from ? `, from ${from}` : ''}.`,
    ],
    faqs: [fitFaq('fit', device, 'accessories'), collectFaq('collect', products)],
  };
}

export { collectFaq, seeFaq, money, listParts };
