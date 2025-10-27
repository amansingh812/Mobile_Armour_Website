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
    name: 'iPhone 15 Pro REDEFINE Liquid Silicone Case',
    description: 'Experience ultimate protection and style with the REDEFINE Liquid Silicone Case for iPhone 15 Pro. This case combines durability, functionality, and a premium silicone finish, ensuring your device stays protected while enhancing your daily experience.',
    price: 55,
    oldPrice: 68,
    newPrice: 55,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1761237900/smag-15pm_1_3_ce0yad.jpg',
    category: 'Cases',
    stock: 50,
    // features: ['Shock Absorption', 'Precise Cutouts', 'Anti-Slip Grip'],
    isPopular: true,
  },
  {
    _id: '68fa726ea537bb743c540fd1',
    name: 'iPhone 17 REDEFINE Silicone Case',
    description: 'Experience ultimate protection and style with the REDEFINE Silicone Case for iPhone 17. This case combines durability, functionality, and a premium silicone finish, ensuring your device stays protected while enhancing your daily experience.',
    price: 45,
    oldPrice: 48,
    newPrice: 45,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1761243683/smag-17-ppl_wvzcfr.jpg',
    category: 'Cases',
    stock: 30,
    features: ['20000mAh Capacity', 'Fast Charging', 'LED Display', 'Dual USB Ports'],
    isPopular: true,
  },
  {
    _id: '68fa743aa537bb743c540fe3',
    name: 'iPhone 17 Heavy Duty Armor Case',
    description: '9H hardness tempered glass with oleophobic coating. Bubble-free installation.',
    price: 69,
    oldPrice: 70,
    newPrice: 69,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1761244125/16-pro_1_1_ubw2f8.jpg',
    category: 'Cases',
    stock: 100,
    features: ['9H Hardness', 'Oleophobic Coating', 'Bubble-Free', 'HD Clarity'],
    isPopular: true,
  },
  {
    _id: '68e90905c6fd3e033a92edb0',
    name: 'DB53-C 5000mAh Power Bank',
    description: 'hoco. DB53-C 5000mAh Power Bank With USB-C Connector and Lightning Cable - Black',
    price: 55,
    oldPrice: 68,
    newPrice: 55,
    imageUrl: 'https://res.cloudinary.com/dxa2mwbjl/image/upload/v1760102618/10018406a.pt02_mb6yhr.jpg',
    category: 'Power Banks',
    stock: 40,
    features: ['360° Rotation', 'Strong Magnet', 'Dashboard Mount', 'Universal Fit'],
    isPopular: true,
  },
  {
    _id: '68fa7533a537bb743c540fed',
    name: 'iPhone 17 Pro Armor Xtreme Case',
    description: 'The REDEFINE Armor Xtreme Case combines style, strength, and advanced protection for your iPhone 17. Made with soft TPU and 1500D Kevlar fiber, it offers military-grade drop protection while remaining ultra-thin and lightweight. ',
    price: 79,
    oldPrice: 98,
    newPrice: 79,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1761244385/rdf-kevlarmgs-17pm_djzsnt.jpg',
    category: 'Cases',
    stock: 80,
    features: ['Fast Charging', 'Braided Nylon', '1.5m Length', 'Reinforced Connectors'],
    isPopular: true,
  },
  {
    _id: '68fa683da537bb743c540f94',
    name: 'REDEFINE RM1 Wireless Car Mount Charger',
    description: 'The REDEFINE RM1 combines smart design with convenience, featuring automatic phone grip and Qi-standard 15W fast wireless charging. ',
    price: 69,
    oldPrice: 79,
    newPrice: 69,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1761238470/rdf-m1_ctrs8i.jpg',
    category: 'Chargers',
    stock: 25,
    features: ['Automatic Phone Grip', 'Qi Standard 15W Fast Wireless Charging', 'Smart Design', 'Convenience'],
    isPopular: true,
  },
  
];
