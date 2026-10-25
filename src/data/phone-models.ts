// The phones we sell accessories for, in the order customers see them.
// `launch: true` models always show in "Shop by phone"; the rest appear once
// they have products. Names must match Product.deviceCompatibility exactly.

export type PhoneBrand = 'Apple' | 'Samsung' | 'Google';

export interface PhoneModel {
  name: string;
  /** Short label for buttons, e.g. "17 Pro Max". */
  short: string;
  brand: PhoneBrand;
  series: string;
  launch: boolean;
}

export const PHONE_MODELS: PhoneModel[] = [
  // iPhone 18 and the foldable Duo (2026)
  { name: 'iPhone Duo', short: 'Duo', brand: 'Apple', series: 'iPhone 18', launch: true },
  { name: 'iPhone 18 Pro Max', short: '18 Pro Max', brand: 'Apple', series: 'iPhone 18', launch: true },
  { name: 'iPhone 18 Pro', short: '18 Pro', brand: 'Apple', series: 'iPhone 18', launch: true },
  // iPhone 17 series
  { name: 'iPhone 17 Pro Max', short: '17 Pro Max', brand: 'Apple', series: 'iPhone 17', launch: true },
  { name: 'iPhone 17 Pro', short: '17 Pro', brand: 'Apple', series: 'iPhone 17', launch: true },
  { name: 'iPhone 17', short: '17', brand: 'Apple', series: 'iPhone 17', launch: true },
  { name: 'iPhone Air', short: 'Air', brand: 'Apple', series: 'iPhone 17', launch: true },
  // iPhone 16 series
  { name: 'iPhone 16 Pro Max', short: '16 Pro Max', brand: 'Apple', series: 'iPhone 16', launch: true },
  { name: 'iPhone 16 Pro', short: '16 Pro', brand: 'Apple', series: 'iPhone 16', launch: true },
  { name: 'iPhone 16 Plus', short: '16 Plus', brand: 'Apple', series: 'iPhone 16', launch: true },
  { name: 'iPhone 16', short: '16', brand: 'Apple', series: 'iPhone 16', launch: true },
  // Samsung premium (last 12 months): shown once stocked
  { name: 'Samsung Galaxy S26 Ultra', short: 'S26 Ultra', brand: 'Samsung', series: 'Galaxy S26', launch: false },
  { name: 'Samsung Galaxy S26 Plus', short: 'S26+', brand: 'Samsung', series: 'Galaxy S26', launch: false },
  { name: 'Samsung Galaxy S26', short: 'S26', brand: 'Samsung', series: 'Galaxy S26', launch: false },
  { name: 'Samsung Galaxy Z Fold8', short: 'Z Fold8', brand: 'Samsung', series: 'Galaxy Z', launch: false },
  { name: 'Samsung Galaxy Z Flip8', short: 'Z Flip8', brand: 'Samsung', series: 'Galaxy Z', launch: false },
  // Google Pixel (last 12 months): shown once stocked
  { name: 'Google Pixel 11 Pro XL', short: 'Pixel 11 Pro XL', brand: 'Google', series: 'Pixel 11', launch: false },
  { name: 'Google Pixel 11 Pro', short: 'Pixel 11 Pro', brand: 'Google', series: 'Pixel 11', launch: false },
  { name: 'Google Pixel 11', short: 'Pixel 11', brand: 'Google', series: 'Pixel 11', launch: false },
  { name: 'Google Pixel 10 Pro Fold', short: 'Pixel 10 Pro Fold', brand: 'Google', series: 'Pixel 10', launch: false },
];

const ORDER = new Map(PHONE_MODELS.map((m, i) => [m.name, i]));

/** Sorts model names into shop order; unknown (older) models go last, A–Z. */
export function sortModels(names: string[]): string[] {
  return [...new Set(names)].sort((a, b) => {
    const ia = ORDER.get(a) ?? 999;
    const ib = ORDER.get(b) ?? 999;
    return ia !== ib ? ia - ib : a.localeCompare(b);
  });
}

export function phoneModel(name: string): PhoneModel | undefined {
  return PHONE_MODELS.find((m) => m.name === name);
}

/** Button label: "17 Pro Max" for known models, the full name otherwise. */
export function shortModel(name: string): string {
  return phoneModel(name)?.short || name.replace(/^(Samsung Galaxy|Google) /, '');
}

/** Swatch colours for the colour names suppliers use. Unknown names get a neutral grey. */
const SWATCH: Record<string, string> = {
  black: '#16181d',
  white: '#f4f4f2',
  clear: 'linear-gradient(135deg,#ffffff 0%,#e3e8ee 100%)',
  transparent: 'linear-gradient(135deg,#ffffff 0%,#e3e8ee 100%)',
  'shiny clear': 'linear-gradient(135deg,#ffffff 0%,#dfe6ee 100%)',
  frosted: '#dfe3e8',
  grey: '#8a8f98',
  gray: '#8a8f98',
  'space grey': '#5d6168',
  silver: '#c9ccd1',
  titanium: '#a7a49c',
  natural: '#b9b2a6',
  navy: '#1f2a5c',
  blue: '#2457d6',
  'sky blue': '#8ec5ff',
  'light blue': '#a9cdf0',
  'sierra blue': '#a7c1d9',
  mint: '#98d8c8',
  green: '#3a8f5c',
  'dark green': '#24493a',
  olive: '#6b6a3a',
  purple: '#7b3fa0',
  lavender: '#c9b6e8',
  pink: '#f5b8c8',
  'light pink': '#f8cdd8',
  red: '#c8262e',
  wine: '#7a2a3a',
  burgundy: '#6d1f2f',
  orange: '#f26a1b',
  'cosmic orange': '#f26a1b',
  yellow: '#f5d142',
  gold: '#d4b46a',
  brown: '#7a5236',
  beige: '#e3d3b8',
  tan: '#c49a6c',
};

export function swatchFor(colour?: string): string {
  if (!colour) return '#c9ccd1';
  const k = colour.toLowerCase().replace(/^colou?r:\s*/, '').trim();
  return SWATCH[k] || SWATCH[k.split(' ').pop() || ''] || '#c9ccd1';
}

/** "Color: Wine" → "Wine". */
export function cleanColour(colour?: string | null): string | undefined {
  const c = (colour || '').replace(/^colou?r:\s*/i, '').trim();
  return c || undefined;
}
