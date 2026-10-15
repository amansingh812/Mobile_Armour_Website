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
    title: 'Phone Cases Heidelberg | iPhone 17 & iPhone 16 Cases | Mobile Armour',
    metaDescription:
      'Shop iPhone 17, 17 Pro, 17 Pro Max and iPhone 16 cases: MagSafe, clear, slim and heavy-duty. See them in person at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
    intro: [
      'Phone cases for the latest iPhones, from slim clear cases to heavy-duty MagSafe armour. Every case on this page is stocked at our kiosk in Warringal Shopping Centre, Heidelberg.',
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
    title: 'Screen Protectors Heidelberg | Tempered Glass & Privacy | Mobile Armour',
    metaDescription:
      'Tempered glass, privacy and full-cover screen protectors for iPhone 17, 17 Pro, 17 Pro Max and iPhone 16. Available at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
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
];

export function getShopCategory(slug: string): ShopCategory | undefined {
  return SHOP_CATEGORIES.find((c) => c.slug === slug);
}

export function getShopCategoryByDb(dbCategory: string): ShopCategory | undefined {
  return SHOP_CATEGORIES.find((c) => c.dbCategory === dbCategory);
}
