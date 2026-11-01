// Refurbished phones: models we can source, what we check, and the copy for
// /refurbished-phones and /refurbished-phones/[slug].
//
// Owner-confirmed (1 Nov 2026): we sell refurbished iPhones and Android phones;
// most models are available, including recent ones, depending on the
// customer's budget and condition; every phone is graded and fully checked;
// 6-month warranty: if anything goes wrong, we fix it. No prices on the site:
// stock and prices change daily, so customers ask us.
//
// Specs below are from the manufacturers' published specifications. Pages
// never use Product/Offer schema (no prices), which is what Google flags as
// invalid product snippets.

import type { Faq } from '@/data/faqs';
import { BUSINESS } from '@/data/business';

export type RefurbBrand = 'iPhone' | 'Samsung' | 'Google Pixel';

export interface RefurbModel {
  name: string;
  /** One line of key specs. */
  spec?: string;
}

export interface RefurbFamily {
  slug: string; // /refurbished-phones/<slug>
  brand: RefurbBrand;
  title: string; // "iPhone 15"
  year?: string;
  /** Has its own page (only for searched-for families). */
  page: boolean;
  models: RefurbModel[];
  /** Card line on the main page. */
  summary: string;
  /** Model page extras. */
  metaTitle?: string;
  metaDescription?: string;
  intro?: string;
  goodFor?: string[];
  keepInMind?: string[];
  faqs?: Faq[];
  keywords?: string[];
}

export const REFURB = {
  path: '/refurbished-phones',
  warranty: '6-month warranty',
  warrantyLong: '6-month warranty: if anything goes wrong with the phone, we fix it',
  checks: [
    { title: 'Screen and touch', text: 'Every part of the display checked for dead pixels, lines and touch response.' },
    { title: 'Battery health', text: 'Battery health checked on every phone; ask and we’ll show you.' },
    { title: 'Cameras, speakers and mics', text: 'Front and back cameras, speakers, microphones and calls tested.' },
    { title: 'Buttons, Face ID and charging', text: 'Buttons, Face ID or fingerprint, charging port and wireless charging checked.' },
    { title: 'Signal, Wi-Fi and Bluetooth', text: 'Mobile signal, Wi-Fi and Bluetooth tested.' },
    { title: 'Unlocked and wiped', text: 'Signed out of the previous owner’s account, data wiped and reset to factory settings.' },
  ],
  grading: 'Every phone is graded on its cosmetic condition, and we tell you the grade before you buy. The grade only describes how it looks: every phone has passed the same checks.',
} as const;

const askShort = 'Stock changes daily, so ask us: tell us the model, storage and your budget and we’ll tell you what we have or can get.';

export const REFURB_FAMILIES: RefurbFamily[] = [
  // ─── iPhone (most searched) ────────────────────────────────────────
  {
    slug: 'iphone-17',
    brand: 'iPhone',
    title: 'iPhone 17',
    year: '2025',
    page: true,
    models: [
      { name: 'iPhone 17', spec: '6.3-inch OLED, ProMotion up to 120Hz, A19 chip, USB-C' },
      { name: 'iPhone Air', spec: '6.5-inch OLED, A19 Pro chip, Apple’s thinnest iPhone, USB-C' },
      { name: 'iPhone 17 Pro', spec: '6.3-inch OLED, A19 Pro chip, triple 48MP cameras, USB-C' },
      { name: 'iPhone 17 Pro Max', spec: '6.9-inch OLED, A19 Pro chip, triple 48MP cameras, USB-C' },
      { name: 'iPhone 17e' },
    ],
    summary: 'The newest generation: 120Hz screen on every model, Ceramic Shield 2.',
    metaTitle: 'Refurbished iPhone 17, 17 Pro & Air Heidelberg | Mobile Armour',
    metaDescription:
      'Refurbished iPhone 17, iPhone Air, 17 Pro and 17 Pro Max at Warringal Shopping Centre, Heidelberg. Graded, fully checked, 6-month warranty. Ask what’s in stock.',
    intro:
      'The iPhone 17 family is Apple’s 2025 line-up: every model has a ProMotion display up to 120Hz and a Ceramic Shield 2 front. Refurbished iPhone 17s are newer and harder to find, so tell us the model, storage and colour you want and we’ll tell you what we have or can get.',
    goodFor: [
      'The newest features for less than a brand-new iPhone',
      'A smooth 120Hz screen, now on the standard iPhone 17 too',
      'Years of use ahead: it’s Apple’s current generation',
    ],
    keepInMind: [
      'Refurbished stock of the newest models is limited and changes quickly',
      'Pick storage carefully: it can’t be added later',
    ],
    keywords: ['refurbished iphone 17', 'refurbished iphone 17 pro', 'refurbished iphone 17 pro max', 'refurbished iphone air'],
    faqs: [
      {
        id: 'have',
        q: 'Do you have refurbished iPhone 17s?',
        short: 'Often, but stock of the newest models changes quickly.',
        more: askShort,
      },
      {
        id: 'difference',
        q: 'What’s the difference between the iPhone 17 and iPhone 17 Pro?',
        short: 'Both have a 6.3-inch 120Hz screen; the Pro adds the faster A19 Pro chip and a third (telephoto) camera.',
        more: 'The Pro Max has the biggest 6.9-inch screen. The iPhone Air is the thinnest, with a single rear camera.',
      },
      {
        id: 'charger',
        q: 'What charger does a refurbished iPhone 17 need?',
        short: 'Any USB-C Power Delivery charger. For the fastest charge, use 40W or more.',
        more: 'We stock USB-C chargers and cables at the kiosk.',
      },
    ],
  },
  {
    slug: 'iphone-16',
    brand: 'iPhone',
    title: 'iPhone 16',
    year: '2024',
    page: true,
    models: [
      { name: 'iPhone 16', spec: '6.1-inch OLED, A18 chip, 48MP Fusion camera, Camera Control, USB-C' },
      { name: 'iPhone 16 Plus', spec: '6.7-inch OLED, A18 chip, 48MP Fusion camera, USB-C' },
      { name: 'iPhone 16 Pro', spec: '6.3-inch OLED with ProMotion, A18 Pro chip, 5x telephoto, USB-C' },
      { name: 'iPhone 16 Pro Max', spec: '6.9-inch OLED with ProMotion, A18 Pro chip, 5x telephoto, USB-C' },
      { name: 'iPhone 16e', spec: '6.1-inch OLED, A18 chip, single 48MP camera, USB-C' },
    ],
    summary: 'Apple Intelligence on every model, Camera Control button, USB-C.',
    metaTitle: 'Refurbished iPhone 16, 16 Pro & Pro Max Heidelberg | Mobile Armour',
    metaDescription:
      'Refurbished iPhone 16, 16 Plus, 16 Pro, 16 Pro Max and 16e at Warringal, Heidelberg. Graded, fully checked, 6-month warranty. Ask what’s in stock today.',
    intro:
      'The iPhone 16 family (2024) brought Apple Intelligence to every model, a Camera Control button and USB-C charging. It’s one of the best-value refurbished iPhones right now: recent enough for years of use, without the price of the latest model.',
    goodFor: [
      'Apple Intelligence features on every iPhone 16 model',
      'The 16 Pro Max for the biggest screen and 5x zoom',
      'The 16e if you want a newer iPhone on a tighter budget',
    ],
    keepInMind: [
      'The 16e has one rear camera and no MagSafe magnets',
      'Only the Pro models have the 120Hz ProMotion screen',
    ],
    keywords: ['refurbished iphone 16', 'refurbished iphone 16 pro', 'refurbished iphone 16 pro max', 'refurbished iphone 16e'],
    faqs: [
      {
        id: 'which',
        q: 'Which refurbished iPhone 16 should I get?',
        short: 'The iPhone 16 for most people; the 16 Pro Max for the biggest screen and best zoom; the 16e for the lowest price.',
        more: askShort,
      },
      {
        id: 'ai',
        q: 'Does a refurbished iPhone 16 get Apple Intelligence?',
        short: 'Yes. Every iPhone 16 model supports Apple Intelligence.',
        more: 'It works the same on a refurbished phone as on a new one.',
      },
      {
        id: 'magsafe',
        q: 'Does the iPhone 16e work with MagSafe?',
        short: 'No, the 16e has no MagSafe magnets, so it charges on a regular wireless pad.',
        more: 'A magnetic case adds MagSafe-style magnets if you want to use magnetic accessories.',
      },
    ],
  },
  {
    slug: 'iphone-15',
    brand: 'iPhone',
    title: 'iPhone 15',
    year: '2023',
    page: true,
    models: [
      { name: 'iPhone 15', spec: '6.1-inch OLED, A16 chip, 48MP camera, Dynamic Island, USB-C' },
      { name: 'iPhone 15 Plus', spec: '6.7-inch OLED, A16 chip, 48MP camera, Dynamic Island, USB-C' },
      { name: 'iPhone 15 Pro', spec: '6.1-inch OLED with ProMotion, A17 Pro chip, titanium, Action button, USB-C' },
      { name: 'iPhone 15 Pro Max', spec: '6.7-inch OLED with ProMotion, A17 Pro chip, 5x telephoto, USB-C' },
    ],
    summary: 'First iPhones with USB-C; Dynamic Island on every model.',
    metaTitle: 'Refurbished iPhone 15, 15 Pro & Pro Max Heidelberg | Mobile Armour',
    metaDescription:
      'Refurbished iPhone 15, 15 Plus, 15 Pro and 15 Pro Max at Warringal Shopping Centre, Heidelberg. Graded, fully checked, 6-month warranty. Ask what’s in stock.',
    intro:
      'The iPhone 15 family (2023) was the first with USB-C, so it charges with the same cable as a Mac, iPad or Android phone. Every model has the Dynamic Island and a 48MP main camera, and the 15 Pro and Pro Max support Apple Intelligence.',
    goodFor: [
      'USB-C charging: one cable for all your devices',
      'A 48MP main camera on every model',
      'The 15 Pro or Pro Max if you want Apple Intelligence for less',
    ],
    keepInMind: [
      'Apple Intelligence works on the 15 Pro and 15 Pro Max, not the iPhone 15 or 15 Plus',
      'Only the Pro models have the 120Hz ProMotion screen',
    ],
    keywords: ['refurbished iphone 15', 'refurbished iphone 15 pro', 'refurbished iphone 15 pro max', 'refurbished iphone 15 plus'],
    faqs: [
      {
        id: 'worth',
        q: 'Is a refurbished iPhone 15 worth it?',
        short: 'For most people, yes: USB-C, a 48MP camera and the Dynamic Island for much less than a new phone.',
        more: askShort,
      },
      {
        id: 'ai',
        q: 'Does the iPhone 15 get Apple Intelligence?',
        short: 'Only the iPhone 15 Pro and 15 Pro Max. The iPhone 15 and 15 Plus don’t support it.',
        more: 'If Apple Intelligence matters to you, choose a 15 Pro, 15 Pro Max or any iPhone 16 or newer.',
      },
      {
        id: 'cable',
        q: 'Does the iPhone 15 use a Lightning cable?',
        short: 'No. The iPhone 15 family uses USB-C.',
        more: 'Older Lightning cables won’t fit; any USB-C cable and charger will.',
      },
    ],
  },
  {
    slug: 'iphone-14',
    brand: 'iPhone',
    title: 'iPhone 14',
    year: '2022',
    page: true,
    models: [
      { name: 'iPhone 14', spec: '6.1-inch OLED, A15 Bionic, 12MP dual cameras, Lightning' },
      { name: 'iPhone 14 Plus', spec: '6.7-inch OLED, A15 Bionic, 12MP dual cameras, Lightning' },
      { name: 'iPhone 14 Pro', spec: '6.1-inch OLED with ProMotion and Always-On, A16 Bionic, 48MP camera, Dynamic Island' },
      { name: 'iPhone 14 Pro Max', spec: '6.7-inch OLED with ProMotion and Always-On, A16 Bionic, 48MP camera, Dynamic Island' },
    ],
    summary: 'Crash Detection and satellite SOS; Dynamic Island on the Pro models.',
    metaTitle: 'Refurbished iPhone 14, 14 Pro & Pro Max Heidelberg | Mobile Armour',
    metaDescription:
      'Refurbished iPhone 14, 14 Plus, 14 Pro and 14 Pro Max at Warringal Shopping Centre, Heidelberg. Graded, fully checked, 6-month warranty. Ask what’s in stock.',
    intro:
      'The iPhone 14 family (2022) added Crash Detection and Emergency SOS via satellite. The 14 Pro and 14 Pro Max introduced the Dynamic Island, the Always-On display and a 48MP main camera, which makes them a strong refurbished buy.',
    goodFor: [
      'A big step up from an iPhone 11 or 12 for a modest budget',
      'The 14 Plus for a large 6.7-inch screen without Pro pricing',
      'The 14 Pro for Dynamic Island and a 48MP camera',
    ],
    keepInMind: [
      'iPhone 14 models charge with Lightning, not USB-C',
      'The standard 14 and 14 Plus don’t have the Dynamic Island',
    ],
    keywords: ['refurbished iphone 14', 'refurbished iphone 14 pro', 'refurbished iphone 14 pro max', 'refurbished iphone 14 plus'],
    faqs: [
      {
        id: 'vs15',
        q: 'Refurbished iPhone 14 or iPhone 15?',
        short: 'The iPhone 15 adds USB-C, the Dynamic Island and a 48MP camera; the iPhone 14 costs less.',
        more: 'A refurbished iPhone 14 Pro has the Dynamic Island and 48MP camera too. ' + askShort,
      },
      {
        id: 'lightning',
        q: 'Does the iPhone 14 have USB-C?',
        short: 'No. Every iPhone 14 model uses a Lightning port.',
        more: 'Lightning cables and chargers are still easy to get, and we stock them.',
      },
      {
        id: 'battery',
        q: 'What about the battery on a refurbished iPhone 14?',
        short: 'We check battery health on every phone; ask and we’ll show you before you buy.',
        more: `Every refurbished phone has our ${REFURB.warranty}.`,
      },
    ],
  },
  {
    slug: 'iphone-13',
    brand: 'iPhone',
    title: 'iPhone 13',
    year: '2021',
    page: true,
    models: [
      { name: 'iPhone 13 mini', spec: '5.4-inch OLED, A15 Bionic, 12MP dual cameras, Lightning' },
      { name: 'iPhone 13', spec: '6.1-inch OLED, A15 Bionic, 12MP dual cameras, Lightning' },
      { name: 'iPhone 13 Pro', spec: '6.1-inch OLED with ProMotion up to 120Hz, triple 12MP cameras' },
      { name: 'iPhone 13 Pro Max', spec: '6.7-inch OLED with ProMotion up to 120Hz, triple 12MP cameras' },
    ],
    summary: 'Great value: A15 chip, OLED screen, 120Hz on the Pro models.',
    metaTitle: 'Refurbished iPhone 13, 13 Pro & Pro Max Heidelberg | Mobile Armour',
    metaDescription:
      'Refurbished iPhone 13, 13 mini, 13 Pro and 13 Pro Max at Warringal Shopping Centre, Heidelberg. Graded, fully checked, 6-month warranty. Ask what’s in stock.',
    intro:
      'The iPhone 13 family (2021) is one of the best-value refurbished iPhones: the A15 Bionic chip is still quick, every model has an OLED screen, and the 13 Pro and Pro Max have a 120Hz ProMotion display. The 13 mini is the last small iPhone.',
    goodFor: [
      'A dependable iPhone on a budget',
      'The 13 mini if you want a genuinely small phone',
      'The 13 Pro for a 120Hz screen and three cameras for less',
    ],
    keepInMind: [
      'iPhone 13 models charge with Lightning, not USB-C',
      'It doesn’t support Apple Intelligence',
    ],
    keywords: ['refurbished iphone 13', 'refurbished iphone 13 pro', 'refurbished iphone 13 pro max', 'refurbished iphone 13 mini'],
    faqs: [
      {
        id: 'still',
        q: 'Is a refurbished iPhone 13 still worth buying?',
        short: 'Yes, for a budget iPhone: the A15 chip is still fast and the OLED screen is excellent.',
        more: askShort,
      },
      {
        id: 'mini',
        q: 'Can I get a refurbished iPhone 13 mini?',
        short: 'Often. It’s the last small iPhone, so it’s popular.',
        more: 'Ask us and we’ll check what we have or can get.',
      },
      {
        id: 'pro',
        q: 'What does the iPhone 13 Pro add?',
        short: 'A 120Hz ProMotion screen, a third (telephoto) camera and a stainless-steel frame.',
        more: 'The 13 Pro Max has the bigger 6.7-inch screen.',
      },
    ],
  },
  {
    slug: 'iphone-12',
    brand: 'iPhone',
    title: 'iPhone 12',
    year: '2020',
    page: true,
    models: [
      { name: 'iPhone 12 mini', spec: '5.4-inch OLED, A14 Bionic, 5G, MagSafe' },
      { name: 'iPhone 12', spec: '6.1-inch OLED, A14 Bionic, 5G, MagSafe' },
      { name: 'iPhone 12 Pro', spec: '6.1-inch OLED, triple 12MP cameras, LiDAR, 5G' },
      { name: 'iPhone 12 Pro Max', spec: '6.7-inch OLED, triple 12MP cameras, LiDAR, 5G' },
    ],
    summary: 'The first 5G iPhones, with MagSafe and an OLED screen.',
    metaTitle: 'Refurbished iPhone 12, 12 Pro & Pro Max Heidelberg | Mobile Armour',
    metaDescription:
      'Refurbished iPhone 12, 12 mini, 12 Pro and 12 Pro Max at Warringal Shopping Centre, Heidelberg. Graded, fully checked, 6-month warranty. Ask what’s in stock.',
    intro:
      'The iPhone 12 family (2020) brought 5G, MagSafe magnetic charging and an OLED screen to every model. It’s a popular choice for a first iPhone, a teenager’s phone or a spare.',
    goodFor: [
      'A low-cost iPhone with 5G and MagSafe',
      'A first iPhone or a phone for a teenager',
      'The 12 mini for a small, light phone',
    ],
    keepInMind: [
      'Battery health matters more on older phones; ask us to show you before you buy',
      'Lightning charging, not USB-C',
    ],
    keywords: ['refurbished iphone 12', 'refurbished iphone 12 pro', 'refurbished iphone 12 pro max', 'refurbished iphone 12 mini'],
    faqs: [
      {
        id: 'worth',
        q: 'Is a refurbished iPhone 12 worth it?',
        short: 'For a budget phone, yes: 5G, MagSafe and an OLED screen for a low price.',
        more: askShort,
      },
      {
        id: 'magsafe',
        q: 'Does the iPhone 12 work with MagSafe?',
        short: 'Yes. MagSafe started with the iPhone 12, so magnetic chargers, wallets and car mounts snap on.',
        more: 'We stock MagSafe cases and accessories at the kiosk.',
      },
      {
        id: 'battery',
        q: 'What if the battery on an older iPhone is worn?',
        short: 'We check battery health on every phone; ask and we’ll show you before you buy.',
        more: 'If the battery wears later, we replace batteries at the same kiosk.',
      },
    ],
  },
  {
    slug: 'iphone-11',
    brand: 'iPhone',
    title: 'iPhone 11',
    year: '2019',
    page: true,
    models: [
      { name: 'iPhone 11', spec: '6.1-inch Liquid Retina LCD, A13 Bionic, 12MP dual cameras' },
      { name: 'iPhone 11 Pro', spec: '5.8-inch OLED, A13 Bionic, triple 12MP cameras' },
      { name: 'iPhone 11 Pro Max', spec: '6.5-inch OLED, A13 Bionic, triple 12MP cameras' },
    ],
    summary: 'Our lowest-cost Face ID iPhone; a popular first phone.',
    metaTitle: 'Refurbished iPhone 11, 11 Pro & Pro Max Heidelberg | Mobile Armour',
    metaDescription:
      'Refurbished iPhone 11, 11 Pro and 11 Pro Max at Warringal Shopping Centre, Heidelberg. Graded, fully checked, 6-month warranty. Ask what’s in stock today.',
    intro:
      'The iPhone 11 (2019) is usually the lowest-cost way into a modern iPhone with Face ID and a dual camera with Night mode. It’s a common pick for kids, grandparents and as a spare phone.',
    goodFor: [
      'A first phone for a child or teenager',
      'Calls, messages, photos and apps on the smallest budget',
      'A spare or backup phone',
    ],
    keepInMind: [
      'The iPhone 11 has an LCD screen; the 11 Pro and Pro Max have OLED',
      'No 5G: the iPhone 11 family is 4G',
    ],
    keywords: ['refurbished iphone 11', 'refurbished iphone 11 pro', 'refurbished iphone 11 pro max'],
    faqs: [
      {
        id: 'still',
        q: 'Is the iPhone 11 still good in 2026?',
        short: 'For calls, messages, photos and everyday apps, yes, and it’s usually our lowest-cost Face ID iPhone.',
        more: 'If you want 5G or a longer life ahead, look at an iPhone 12 or 13. ' + askShort,
      },
      {
        id: 'kids',
        q: 'Is a refurbished iPhone 11 good for a child?',
        short: 'It’s a popular first phone: easy to use, and it supports Screen Time parental controls.',
        more: 'Add a case and screen protector at the kiosk.',
      },
      {
        id: '5g',
        q: 'Does the iPhone 11 have 5G?',
        short: 'No, the iPhone 11 family is 4G. 5G started with the iPhone 12.',
        more: '4G still works well for everyday use on Australian networks.',
      },
    ],
  },
  // ─── Android ────────────────────────────────────────────────────────
  {
    slug: 'samsung-galaxy',
    brand: 'Samsung',
    title: 'Samsung Galaxy',
    page: true,
    models: [
      { name: 'Galaxy S25 / S25+ / S25 Ultra', spec: '6.2 / 6.7 / 6.9-inch screens, Galaxy AI' },
      { name: 'Galaxy S24 / S24+ / S24 Ultra', spec: '6.2 / 6.7 / 6.8-inch screens, Galaxy AI' },
      { name: 'Galaxy S23 / S23+ / S23 Ultra', spec: '6.1 / 6.6 / 6.8-inch screens; 200MP camera on the Ultra' },
      { name: 'Galaxy S22 / S22+ / S22 Ultra', spec: '6.1 / 6.6 / 6.8-inch screens; built-in S Pen on the Ultra' },
      { name: 'Galaxy S21 series' },
      { name: 'Galaxy A series', spec: 'Budget and mid-range models' },
      { name: 'Galaxy Z Flip and Z Fold' },
    ],
    summary: 'Galaxy S flagships, budget A series and foldables.',
    metaTitle: 'Refurbished Samsung Galaxy Phones Heidelberg | S25, S24, S23',
    metaDescription:
      'Refurbished Samsung Galaxy S25, S24, S23, S22, A series and foldables at Warringal Shopping Centre, Heidelberg. Graded, fully checked, 6-month warranty.',
    intro:
      'We sell refurbished Samsung Galaxy phones from the S flagships to the budget A series and the Z Flip and Fold. The S24 and S25 families include Galaxy AI, and the Ultra models add the S Pen and the best cameras.',
    goodFor: [
      'A flagship Samsung for much less than new',
      'The Ultra for the S Pen and the strongest zoom',
      'An A series phone as a low-cost Android',
    ],
    keepInMind: [
      'We make sure every Samsung is signed out of the previous owner’s Google and Samsung accounts',
      'Foldables are checked closely along the hinge and inner screen',
    ],
    keywords: ['refurbished samsung', 'refurbished samsung phones', 'refurbished samsung s23', 'refurbished samsung s22', 'refurbished samsung s24'],
    faqs: [
      {
        id: 'which',
        q: 'Which refurbished Samsung should I buy?',
        short: 'A Galaxy S23 or S24 for most people; an Ultra for the S Pen and zoom; an A series for the lowest price.',
        more: askShort,
      },
      {
        id: 'ai',
        q: 'Do refurbished Galaxy S24 and S25 phones have Galaxy AI?',
        short: 'Yes. Galaxy AI features work on a refurbished S24 or S25 the same as a new one.',
        more: 'Ask us which models we have today.',
      },
      {
        id: 'frp',
        q: 'Will a refurbished Samsung be locked to someone else’s account?',
        short: 'No. We check every phone is signed out of the previous owner’s Google and Samsung accounts and reset.',
        more: 'It’s one of the checks we do before any phone goes on sale.',
      },
    ],
  },
  {
    slug: 'google-pixel',
    brand: 'Google Pixel',
    title: 'Google Pixel',
    page: false,
    models: [
      { name: 'Pixel 9 / 9 Pro / 9 Pro XL' },
      { name: 'Pixel 8 / 8 Pro / 8a' },
      { name: 'Pixel 7 / 7 Pro / 7a' },
    ],
    summary: 'Clean Android and some of the best phone cameras.',
  },
];

export const REFURB_PAGES = REFURB_FAMILIES.filter((f) => f.page);
export const getRefurbFamily = (slug: string) => REFURB_PAGES.find((f) => f.slug === slug);
export const refurbPath = (f: RefurbFamily) => (f.page ? `${REFURB.path}/${f.slug}` : `${REFURB.path}#${f.slug}`);

/** All model names (for the finder and the enquiry form). */
export const REFURB_MODEL_NAMES = REFURB_FAMILIES.flatMap((f) => f.models.map((m) => m.name));

/** Phone-hub and repair-page link: "Looking for a refurbished iPhone 15?" for a device name. */
export function refurbFamilyForDevice(device: string): RefurbFamily | undefined {
  const d = device.toLowerCase();
  return REFURB_PAGES.find((f) => {
    if (f.brand === 'iPhone') {
      const n = f.slug.replace('iphone-', '');
      return new RegExp(`^iphone ${n}(\\b|e\\b| |$)`).test(d) || (n === '17' && /^iphone air/.test(d));
    }
    if (f.brand === 'Samsung') return /^(samsung|galaxy)/.test(d);
    return false;
  });
}

export const REFURB_HUB_FAQS: Faq[] = [
  {
    id: 'where',
    q: 'Where can I buy a refurbished phone near Heidelberg?',
    short: `At Mobile Armour, ${BUSINESS.address.unit}, ${BUSINESS.address.centre}, Heidelberg. We sell refurbished iPhones and Android phones.`,
    more: 'Come in to see the phones, or ask us online first and we’ll tell you what we have.',
  },
  {
    id: 'models',
    q: 'Which refurbished phones do you have?',
    short: 'Most iPhone and Samsung Galaxy models, including recent ones, plus Google Pixel.',
    more: askShort,
  },
  {
    id: 'price',
    q: 'How much is a refurbished iPhone?',
    short: 'It depends on the model, storage and condition, and stock changes daily, so we don’t list prices online.',
    more: 'Tell us your budget and we’ll tell you the best phone we can do for it.',
  },
  {
    id: 'warranty',
    q: 'Do refurbished phones come with a warranty?',
    short: `Yes. Every refurbished phone has a ${REFURB.warranty}: if anything goes wrong with it, we fix it.`,
    more: 'You also have your rights under the Australian Consumer Law.',
  },
  {
    id: 'checks',
    q: 'What do you check on a refurbished phone?',
    short: 'Screen, touch, battery health, cameras, speakers, microphones, buttons, Face ID or fingerprint, charging, signal, Wi-Fi and Bluetooth.',
    more: 'Every phone is also signed out of the previous owner’s account, wiped and reset.',
  },
  {
    id: 'grades',
    q: 'What condition are your refurbished phones in?',
    short: 'Every phone is graded on its cosmetic condition. The grade only describes how it looks: every phone passes the same checks.',
    more: 'We tell you the grade, and you can see the phone at the kiosk before you buy.',
  },
  {
    id: 'difference',
    q: 'What’s the difference between refurbished and second-hand?',
    short: 'A refurbished phone has been fully tested, graded and reset by a business, and comes with a warranty. A second-hand phone is sold as-is, usually privately.',
    more: 'That’s why a refurbished phone is the safer way to buy a used phone.',
  },
  {
    id: 'unlocked',
    q: 'Are your refurbished phones unlocked?',
    short: 'Every phone is signed out of the previous owner’s account. Ask us about network locks for a specific phone.',
    more: 'Tell us your network and we’ll confirm before you buy.',
  },
];
