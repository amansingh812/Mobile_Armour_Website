export interface PopularProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  newPrice?: number;
  imageUrl: string;
  category: string;
  stock?: number;
  features?: string[];
  isPopular: boolean;
}

export const popularProducts: PopularProduct[] = [
  {
    _id: '68f7d7291bef842350bbe077',
    name: 'Premium Silicone Phone Case',
    description: 'Durable silicone case with shock absorption and precise cutouts. Available in multiple colors.',
    price: 599,
    oldPrice: 899,
    newPrice: 599,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1757780567/CocoSparkleRingStandiPhone16Pro_iqjdvr.jpg',
    category: 'Cases',
    stock: 50,
    // features: ['Shock Absorption', 'Precise Cutouts', 'Anti-Slip Grip'],
    isPopular: true,
  },
  {
    _id: '68f7d7291bef842350bbe078',
    name: '20000mAh Fast Charging Power Bank',
    description: 'High-capacity power bank with dual USB ports and LED display. Supports fast charging.',
    price: 1499,
    oldPrice: 1999,
    newPrice: 1499,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1757780567/CocoSparkleRingStandiPhone16Pro_iqjdvr.jpg',
    category: 'Power Banks',
    stock: 30,
    features: ['20000mAh Capacity', 'Fast Charging', 'LED Display', 'Dual USB Ports'],
    isPopular: true,
  },
  {
    _id: '68f7d7291bef842350bbe079',
    name: 'Tempered Glass Screen Protector',
    description: '9H hardness tempered glass with oleophobic coating. Bubble-free installation.',
    price: 299,
    oldPrice: 499,
    newPrice: 299,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1757780554/CocoSparkleRingStandiPhone16ProMax_oksteo.jpg',
    category: 'Screen Protectors',
    stock: 100,
    features: ['9H Hardness', 'Oleophobic Coating', 'Bubble-Free', 'HD Clarity'],
    isPopular: true,
  },
  {
    _id: '68f7d7291bef842350bbe07a',
    name: 'Magnetic Car Phone Holder',
    description: 'Strong magnetic mount with 360° rotation. Universal compatibility with dashboard mount.',
    price: 799,
    oldPrice: 1199,
    newPrice: 799,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1757779584/ProCase_bwiupn.jpg',
    category: 'Car Holders',
    stock: 40,
    features: ['360° Rotation', 'Strong Magnet', 'Dashboard Mount', 'Universal Fit'],
    isPopular: true,
  },
  {
    _id: '68f7d7291bef842350bbe07b',
    name: 'USB-C Fast Charging Cable',
    description: 'Braided nylon cable with fast charging support. 1.5m length with reinforced connectors.',
    price: 399,
    oldPrice: 599,
    newPrice: 399,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1757779540/iphone17Case_idepnk.jpg',
    category: 'Cables & Adapters',
    stock: 80,
    features: ['Fast Charging', 'Braided Nylon', '1.5m Length', 'Reinforced Connectors'],
    isPopular: true,
  },
  {
    _id: '68f7d7291bef842350bbe07c',
    name: 'Leather Wallet Phone Case',
    description: 'Premium leather case with card slots and kickstand. RFID protection included.',
    price: 1299,
    oldPrice: 1799,
    newPrice: 1299,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1757779525/iphone17Air_zht8v0.jpg',
    category: 'Cases',
    stock: 25,
    features: ['Genuine Leather', 'Card Slots', 'Kickstand', 'RFID Protection'],
    isPopular: true,
  },
  {
    _id: '68f7d7291bef842350bbe07d',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad with LED indicator. Compatible with all Qi-enabled devices.',
    price: 899,
    oldPrice: 1299,
    newPrice: 899,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1757779506/iphone17ProMax_zht8v0.jpg',
    category: 'Cables & Adapters',
    stock: 35,
    features: ['Wireless Charging', 'LED Indicator', 'Qi-Compatible', 'Fast Charging'],
    isPopular: true,
  },
  {
    _id: '68f7d7291bef842350bbe07e',
    name: 'Privacy Screen Protector',
    description: 'Anti-spy tempered glass with 9H hardness. Protects your privacy from side viewing.',
    price: 599,
    oldPrice: 899,
    newPrice: 599,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1757779486/iphone17Pro_zht8v0.jpg',
    category: 'Screen Protectors',
    stock: 60,
    features: ['Privacy Protection', '9H Hardness', 'Anti-Spy', 'Scratch Resistant'],
    isPopular: true,
  },
];
