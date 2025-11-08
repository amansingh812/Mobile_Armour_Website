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
    _id: '690a3f86e85b1a96832b6fd5',
    name: 'iPhone 17 Pro Max REDEFINE Shield Heavy Duty Magnetic Case',
    description: 'The REDEFINE Shield Armor Case offers rugged, military-grade protection for your iPhone 17 Pro Max. Built from premium aluminum alloy, PC, and TPU, it combines strength with modern style.',
    price: 59,
    oldPrice: 68,
    newPrice: 55,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1762279264/defenmgs-17pm_imonbl.jpg',
    category: 'Cases',
    stock: 10,
    // features: ['Shock Absorption', 'Precise Cutouts', 'Anti-Slip Grip'],
    isPopular: true,
  },
  {
    _id: '6907a8d2e3235c120d5c8c19',
    name: 'Baseus Crystal Diamond iPhone 17 Pro Max Glass',
    description: 'Protect your iPhone 17 Pro Max with the Baseus Crystal Diamond HD Tempered Glass. Featuring a 0.3mm ultra-thin 3D curved edge, it offers seamless coverage and a comfortable touch. ',
    price: 25,
    oldPrice: 35,
    newPrice: 25,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1762108626/_-2_8_6_1_1_gbhont.jpg',
    category: 'Screen Protector',
    stock: 30,
    //features: ['20000mAh Capacity', 'Fast Charging', 'LED Display', 'Dual USB Ports'],
    isPopular: true,
  },
  {
    _id: '690a462ee85b1a96832b6ff4',
    name: 'iPhone 17 Pro Max Mercury Soft Feeling Jelly Case',
    description: 'Enjoy a perfect balance of simplicity and protection with the Mercury Soft Feeling Jelly Case for iPhone 17 Pro Max. Crafted from premium, flexible materials, it offers a smooth, soft-touch finish that feels great in hand. The slim, lightweight design provides everyday protection',
    price: 59,
    oldPrice: 69,
    newPrice: 59,
    imageUrl: 'https://res.cloudinary.com/drygcfes5/image/upload/v1762280910/sf-17pm-5_f26gcz.jpg',
    category: 'Cases',
    stock: 100,
    features: ['9H Hardness', 'Oleophobic Coating', 'Bubble-Free', 'HD Clarity'],
    isPopular: true,
  },
  {
    _id: '6901ed8afac9247d13c57978',
    name: 'Baseus S-09 Pro Series Car FM Transmitter-Cluster Black',
    description: 'Baseus S-09 Pro FM Transmitter, Bluetooth. Baseus FM Transmitter will make your time in the car even more enjoyable. Bluetooth 5.3 technology allows you to conveniently play music from your smartphone through your car radio, thanks to its wide FM frequency range (87.5-108 Mhz) you can easily find a free frequency and enjoy your favorite songs. ',
    price: 49,
    oldPrice: 55,
    newPrice: 49,
    imageUrl: 'https://res.cloudinary.com/dxa2mwbjl/image/upload/v1761733977/c10762200113-00_1_nvgpnn.jpg',
    category: 'Car Holders',
    stock: 40,
    features: ['360° Rotation', 'Strong Magnet', 'Dashboard Mount', 'Universal Fit'],
    isPopular: true,
  },
  {
    _id: '690096296c7522d79fa94127',
    name: 'iQuick 18W QC3.0 USB-A Charging Adapter',
    description: 'Brand: iQuick Model: GS-552D Color: White Compatibility: USB-A Interface Power: 18W(Max) Input: 100-240V 50/60HZ, 0.6A Output: 5V/3A OR 9V/2A OR 12V/1.5A',
    price: 29,
    oldPrice: 35,
    newPrice: 29,
    imageUrl: 'https://res.cloudinary.com/dxa2mwbjl/image/upload/v1761646006/iquick-18uplug_1_mn85h5.jpg',
    category: 'Cables & Adapters',
    stock: 80,
    features: ['Fast Charging', 'Braided Nylon', '1.5m Length', 'Reinforced Connectors'],
    isPopular: true,
  },
  {
    _id: '690099f56c7522d79fa9413e',
    name: 'iQuick 3 in 1 Retractable Fast Charge & Data Sync Cable IQTC2301 1.2m-White',
    description: 'Brand: iQuick Model: IQTC2301 Power Output: with 1 device connected: USB-C 11V/6A, Lightning 5V/2.4A, Micro-USB 5V/2.4A with 2 devices connected: USB-C + Lightning 5V/3.5A, USB-C + Micro-USB 5V/3.5A, Micro-USB + Lightning 5V/3.5A with 3 devices connected: USB-C + Lightning + Micro-USB 5V/3.5A',
    price: 39,
    oldPrice: 49,
    newPrice: 39,
    imageUrl: 'https://res.cloudinary.com/dxa2mwbjl/image/upload/v1761646998/iquick-a1t3-1_1_avgso5.jpg',
    category: 'Cables & Adapters',
    stock: 25,
    features: ['Automatic Phone Grip', 'Qi Standard 15W Fast Wireless Charging', 'Smart Design', 'Convenience'],
    isPopular: true,
  },
  
];
