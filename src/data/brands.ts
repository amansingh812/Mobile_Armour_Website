/**
 * Accessory brands we stock that people search for by name (/shop/brand/{slug}).
 * Matched on the product name: the database "brand" field holds the phone maker.
 */
export interface ShopBrand {
  name: string;
  match: RegExp;
  what: string;
  guide?: { title: string; href: string };
}

export const BRANDS: Record<string, ShopBrand> = {
  lito: {
    name: 'LITO',
    match: /\blito\b/i,
    what: 'screen protectors',
    guide: { title: 'Privacy, clear or matte: which screen protector?', href: '/blog/privacy-vs-clear-vs-matte-screen-protector' },
  },
  redefine: {
    name: 'REDEFINE',
    match: /\bredefine\b/i,
    what: 'phone cases',
    guide: { title: 'Which iPhone 17 Pro Max case should you buy?', href: '/blog/which-iphone-17-pro-max-case' },
  },
  baseus: { name: 'Baseus', match: /\bbaseus\b/i, what: 'phone accessories' },
};
