// Shop category pages: /shop/{slug} and /shop/{slug}/{device-slug}.
// `dbCategory` must match Product.category in MongoDB exactly.
// Copy is deliberately factual: no delivery, fitting or warranty promises
// until the business confirms them.

export interface ShopCategory {
  slug: string;
  dbCategory: string;
  name: string; // plural display name, e.g. "Phone Cases"
  shortName: string; // used in device pages: "{device} {shortName}"
  title: string; // <title>
  metaDescription: string;
  intro: string[]; // paragraphs under the H1
  buyingTips: { heading: string; points: string[] };
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: 'cases',
    dbCategory: 'Cases',
    name: 'Phone Cases',
    shortName: 'Cases',
    title: 'iPhone 17 & 16 Cases Heidelberg | Mobile Armour',
    metaDescription:
      'iPhone 17, 17 Pro, 17 Pro Max and iPhone 16 cases: MagSafe, clear, slim and heavy-duty. See them in person at Warringal Shopping Centre, Heidelberg.',
    intro: [
      'Phone cases for the latest iPhones, from slim clear cases to heavy-duty MagSafe armour. Pick your phone and colour, then collect from our kiosk in Warringal Shopping Centre, Heidelberg, or get it delivered.',
      'Not sure which one fits? Bring your phone to the kiosk and try a case on before you buy.',
    ],
    buyingTips: {
      heading: 'How to choose a phone case',
      points: [
        'Match the exact model: iPhone 17, 17 Pro and 17 Pro Max cases are not interchangeable because the camera layouts differ.',
        'MagSafe cases have a built-in magnet ring, so MagSafe chargers, wallets and car mounts stay attached.',
        'Clear and jelly cases show off the phone colour; heavy-duty cases add raised edges around the screen and camera.',
      ],
    },
  },
  {
    slug: 'screen-protectors',
    dbCategory: 'Screen Protectors',
    name: 'Screen Protectors',
    shortName: 'Screen Protectors',
    title: 'Tempered Glass Screen Protectors | Mobile Armour',
    metaDescription:
      'Tempered glass, privacy and full-cover screen protectors for iPhone 17, 17 Pro, 17 Pro Max and iPhone 16, at Warringal Shopping Centre, Heidelberg.',
    intro: [
      'Tempered glass and privacy screen protectors for current iPhones, including Baseus, Kinglas and Lito brands. All are stocked at our Warringal Shopping Centre kiosk in Heidelberg.',
      'A screen protector costs far less than a screen replacement. If your screen is already cracked, see our screen repair service instead.',
    ],
    buyingTips: {
      heading: 'Which screen protector do you need?',
      points: [
        '9H tempered glass resists scratches and absorbs the impact of most everyday drops.',
        'Privacy glass darkens the screen from the side, so people next to you on the train can’t read it.',
        'Full-cover glass runs edge to edge; check it is listed as case-friendly if you use a thick case.',
      ],
    },
  },
  {
    slug: 'cables-adapters',
    dbCategory: 'Cables & Adapters',
    name: 'Chargers, Cables & Adapters',
    shortName: 'Chargers & Cables',
    title: 'USB-C Chargers, Cables & Adapters Heidelberg | Mobile Armour',
    metaDescription:
      'USB-C cables, fast chargers and adapters for iPhone, Samsung and iPad. Available at Mobile Armour, Warringal Shopping Centre, Heidelberg VIC 3084.',
    intro: [
      'USB-C and Lightning cables, fast wall chargers and adapters for iPhone, Samsung and iPad, available from our kiosk at Warringal Shopping Centre, Heidelberg.',
      'If your phone has stopped charging with any cable, the charging port itself may need cleaning or repair; bring it to the kiosk and we can check it.',
    ],
    buyingTips: {
      heading: 'Choosing a charger or cable',
      points: [
        'iPhone 15 and later use USB-C; iPhone 14 and earlier use Lightning.',
        'For fast charging, the charger and cable both need to support USB-C Power Delivery (PD); 20W or more fast-charges any recent iPhone.',
        'Retractable and 3-in-1 cables cover several devices in one, handy for the car or a bag.',
      ],
    },
  },
  {
    slug: 'car-holders',
    dbCategory: 'Car Holders',
    name: 'Car Phone Holders & FM Transmitters',
    shortName: 'Car Holders',
    title: 'Car Phone Holders & FM Transmitters Heidelberg | Mobile Armour',
    metaDescription:
      'Car phone holders, MagSafe car mounts and Bluetooth FM transmitters such as the Baseus S-09 Pro. Available at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
    intro: [
      'Car phone holders and Bluetooth FM transmitters for hands-free navigation, calls and music, available from our kiosk at Warringal Shopping Centre, Heidelberg.',
    ],
    buyingTips: {
      heading: 'Choosing a car accessory',
      points: [
        'Vent mounts suit most cars; dashboard mounts are better if your vents are round or awkward.',
        'Magnetic mounts need a MagSafe phone or case to hold securely.',
        'A Bluetooth FM transmitter plays your phone through the car radio in cars without Bluetooth, and usually charges the phone too.',
      ],
    },
  },
  {
    slug: 'power-banks',
    dbCategory: 'Power Banks',
    name: 'Power Banks',
    shortName: 'Power Banks',
    title: 'Power Banks & MagSafe Battery Packs Heidelberg | Mobile Armour',
    metaDescription:
      'Portable power banks and MagSafe battery packs for iPhone and Samsung at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
    intro: [
      'Portable power banks and MagSafe battery packs for iPhone and Samsung, available from our kiosk at Warringal Shopping Centre, Heidelberg.',
    ],
    buyingTips: {
      heading: 'Choosing a power bank',
      points: [
        '10,000mAh recharges most phones about twice; 20,000mAh suits travel and tablets.',
        'MagSafe power banks snap onto the back of an iPhone 12 or later, or a MagSafe case.',
        'Look for USB-C PD output of 20W or more for fast charging.',
      ],
    },
  },
  {
    slug: 'wireless-chargers',
    dbCategory: 'Wireless Chargers',
    name: 'Wireless & MagSafe Chargers',
    shortName: 'Wireless Chargers',
    title: 'Wireless & MagSafe Chargers Heidelberg | Mobile Armour',
    metaDescription:
      'MagSafe and Qi wireless chargers, pads and 3-in-1 stands for iPhone, AirPods and Apple Watch. Mobile Armour, Warringal Shopping Centre, Heidelberg.',
    intro: [
      'MagSafe and Qi wireless chargers, from single pads to 3-in-1 stands for iPhone, AirPods and Apple Watch, at our kiosk in Warringal Shopping Centre, Heidelberg.',
    ],
    buyingTips: {
      heading: 'Choosing a wireless charger',
      points: [
        'MagSafe chargers snap onto iPhone 12 and later; with a case, the case needs a MagSafe magnet ring.',
        'Qi and Qi2 pads work with most recent iPhones and Android phones.',
        'A 3-in-1 stand charges a phone, earbuds and watch from one plug.',
      ],
    },
  },
  {
    slug: 'apple-watch-straps',
    dbCategory: 'Apple Watch Straps',
    name: 'Apple Watch Straps & Bands',
    shortName: 'Watch Straps',
    title: 'Apple Watch Straps & Bands Heidelberg | Mobile Armour',
    metaDescription:
      'Apple Watch straps and bands at Mobile Armour, Warringal Shopping Centre, Heidelberg: silicone sport bands, stretchy nylon, braided and Alpine loops in small and large sizes.',
    intro: [
      'Silicone sport bands, stretchy nylon and braided loops, classic nylon and Alpine-style loops for Apple Watch, in small (38–42mm) and large (42–49mm) fits, from our kiosk at Warringal Shopping Centre, Heidelberg.',
    ],
    buyingTips: {
      heading: 'Which size do I need?',
      points: [
        'Small fits 38mm, 40mm and 41mm watches, and the 42mm Series 10 and 11.',
        'Large fits 44mm, 45mm and 49mm (Ultra) watches, and the 42mm Series 1–3.',
        'Not sure? The size is engraved on the back of the watch case, or bring your watch to the kiosk.',
      ],
    },
  },
  {
    slug: 'headphones',
    dbCategory: 'Headphones',
    name: 'Earbuds & Headphones',
    shortName: 'Earbuds & Headphones',
    title: 'Wireless Earbuds & Headphones Heidelberg | Mobile Armour',
    metaDescription:
      'Bluetooth earbuds, wired USB-C earphones and headphones at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
    intro: [
      'Bluetooth earbuds, wired USB-C earphones and over-ear headphones, available from our kiosk at Warringal Shopping Centre, Heidelberg.',
    ],
    buyingTips: {
      heading: 'Choosing earbuds or headphones',
      points: [
        'iPhone 15 and later have a USB-C port, so wired earphones need a USB-C plug (or an adapter).',
        'Check the battery life with the case, not just the earbuds on their own.',
        'Over-ear headphones block more outside noise; earbuds are easier to carry.',
      ],
    },
  },
  {
    slug: 'speakers',
    dbCategory: 'Speakers',
    name: 'Bluetooth Speakers',
    shortName: 'Speakers',
    title: 'Bluetooth Speakers Heidelberg | Mobile Armour',
    metaDescription: 'Portable Bluetooth speakers at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
    intro: ['Portable Bluetooth speakers for home, the car park or the beach, from our kiosk at Warringal Shopping Centre, Heidelberg.'],
    buyingTips: {
      heading: 'Choosing a Bluetooth speaker',
      points: [
        'Check the water-resistance rating if it’s going outdoors.',
        'Bigger speakers usually mean more bass and longer battery life, but less portability.',
      ],
    },
  },
  {
    slug: 'mounts-stands',
    dbCategory: 'Mounts & Stands',
    name: 'Bike Mounts, Phone Stands & Holders',
    shortName: 'Mounts & Stands',
    title: 'Bike Phone Mounts, Phone Stands & Holders Heidelberg | Mobile Armour',
    metaDescription:
      'Bike and scooter phone mounts, desk stands for phones and tablets, magnetic holders and selfie sticks at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
    intro: [
      'Handlebar mounts for bikes, e-scooters and motorbikes, desk stands for phones and tablets, magnetic holders and selfie sticks, from our kiosk at Warringal Shopping Centre, Heidelberg.',
    ],
    buyingTips: {
      heading: 'Choosing a mount or stand',
      points: [
        'For a bike, check the mount fits your handlebar and your phone with its case on.',
        'For motorbikes, a vibration dampener helps protect the phone’s camera.',
        'Adjustable desk stands suit video calls and watching; check they fold flat if you travel.',
      ],
    },
  },
  {
    slug: 'memory-storage',
    dbCategory: 'Memory & Storage',
    name: 'Memory Cards & USB Drives',
    shortName: 'Memory & Storage',
    title: 'Memory Cards, USB Drives & Card Readers Heidelberg | Mobile Armour',
    metaDescription:
      'microSD cards, USB-C flash drives and card readers at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
    intro: ['microSD cards, USB-C flash drives and card readers to back up photos and free up space, from our kiosk at Warringal Shopping Centre, Heidelberg.'],
    buyingTips: {
      heading: 'Choosing storage',
      points: [
        'iPhones have no memory card slot; use a USB-C flash drive or card reader instead.',
        'For 4K video, choose a card rated V30 or U3 or faster.',
      ],
    },
  },
  {
    slug: 'tech-gadgets',
    dbCategory: 'Tech Gadgets',
    name: 'Tech Gadgets',
    shortName: 'Gadgets',
    title: 'Tech Gadgets & Phone Accessories Heidelberg | Mobile Armour',
    metaDescription:
      'Selfie sticks, tripods, trackers and handy phone gadgets at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
    intro: ['Selfie sticks, tripods, item trackers and other handy gadgets for your phone, from our kiosk at Warringal Shopping Centre, Heidelberg.'],
    buyingTips: {
      heading: 'Good to know',
      points: ['Bring your phone in and we’ll check a gadget works with it before you buy.'],
    },
  },
];

export function getShopCategory(slug: string): ShopCategory | undefined {
  return SHOP_CATEGORIES.find((c) => c.slug === slug);
}

export function getShopCategoryByDb(dbCategory: string): ShopCategory | undefined {
  return SHOP_CATEGORIES.find((c) => c.dbCategory === dbCategory);
}
