import mongoose, { Schema, Document } from 'mongoose';
import { PHONE_MODELS } from '@/data/phone-models';

// Every phone a product can fit: the shop's current models plus older ones still in stock.
export const DEVICES = Array.from(
  new Set([
    ...PHONE_MODELS.map((m) => m.name),
    'iPhone 17 Plus', 'iPhone 16e', 'iPhone 17e',
    'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
    'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 13 Mini',
    'iPad Pro M4 (13-inch)', 'iPad Pro M4 (11-inch)', 'iPad Air M2 (13-inch)', 'iPad Air M2 (11-inch)',
    'iPad 10th Gen (10.9-inch)', 'iPad Mini 6 (8.3-inch)',
    'Samsung Galaxy S25', 'Samsung Galaxy S25 Plus', 'Samsung Galaxy S25 Ultra',
    'Samsung Galaxy Z Fold7', 'Samsung Galaxy Z Flip7', 'Samsung Galaxy A55', 'Samsung Galaxy A35',
    'Samsung Galaxy S24', 'Samsung Galaxy S23',
    'Google Pixel 10', 'Google Pixel 10 Pro', 'Google Pixel 10 Pro XL',
    'Google Pixel 9', 'Google Pixel 9 Pro', 'Google Pixel 9 Pro Fold',
    'OnePlus 12', 'Xiaomi 14', 'OPPO Find X7',
  ])
);

/** One buyable option of a design: a supplier SKU for a set of phones in one colour. */
export interface IVariant {
  sku: string;
  gtin?: string;
  models: string[];
  colour?: string;
  price: number;
  oldPrice?: number;
  costPrice?: number;
  stock?: number;
  images?: string[];
  supplier?: { url?: string; productId?: string; inStock?: boolean; checkedAt?: Date };
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  newPrice?: number;
  imageUrl: string;
  category: string;
  stock: number;
  features: string[];
  images?: string[];
  
  // Device Compatibility
  deviceCompatibility: string[];
  
  // Brand
  brand: string;
  
  // Accessory Types
  accessoryTypes: string[];
  
  // Product Type Categories
  caseTypes: string[];
  chargerTypes: string[];
  mountTypes: string[];
  cableTypes: string[];
  screenProtectorTypes: string[];
  
  // Additional metadata
  tags: string[];
  specifications: Record<string, string>;
  
  // Supplier data
  sku?: string;
  gtin?: string;
  manufacturer?: string;
  supplier?: { name?: string; url?: string; productId?: string; inStock?: boolean; checkedAt?: Date };
  costPrice?: number;
  fulfilment?: 'kiosk' | 'order-in';
  /** Model and colour options. Empty for single-option products. */
  variants?: IVariant[];

  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema = new Schema(
  {
    sku: { type: String, required: true, trim: true },
    gtin: { type: String, trim: true },
    models: [{ type: String, enum: DEVICES }],
    colour: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, min: 0 },
    /** Our cost ex GST. Never sent to shoppers. */
    costPrice: { type: Number, min: 0, select: false },
    /** Units at the kiosk (kiosk products only). */
    stock: { type: Number, min: 0 },
    images: [{ type: String }],
    supplier: {
      url: { type: String },
      productId: { type: String },
      inStock: { type: Boolean },
      checkedAt: { type: Date },
    },
  },
  { _id: false }
);

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, min: 0 },
    newPrice: { type: Number, min: 0 },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true, index: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
    features: [{ type: String }],
    images: [{ type: String, default: undefined }],
    
    // Device Compatibility
    deviceCompatibility: [{ type: String, enum: DEVICES, index: true }],
    
    // Brand
    brand: { 
      type: String, 
      enum: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'OPPO', 'Generic'],
      index: true 
    },
    
    // Accessory Types
    accessoryTypes: [{ 
      type: String, 
      enum: [
        'MagSafe Compatible', 'Wireless Charging Compatible', 'USB-C PD', 
        'GaN Charger Compatible', 'Fast Charging 30W+', 'OTG Data Cable'
      ],
      index: true 
    }],

    // Product Type Categories
    caseTypes: [{ 
      type: String, 
      enum: [
        'Clear TPU', 'Silicone', 'Leather', 'Rugged Shockproof', 'Slim', 
        'Camera Bump Protector', 'Wallet Case', 'Designer Printed', 'MagSafe Compatible'
      ]
    }],
    
    chargerTypes: [{ 
      type: String, 
      enum: [
        'Power Bank PD', 'Power Bank Wireless', 'Wall Charger GaN', 
        'Car Charger PD', 'Fast Charger 65W+'
      ]
    }],
    
    mountTypes: [{ 
      type: String, 
      enum: ['Car Holder Vent', 'Car Holder Dashboard', 'Magnetic Car Mount']
    }],
    
    cableTypes: [{
      type: String, 
      enum: ['USB-C to C', 'USB-C to Lightning', 'USB-C to USB-A']
    }],
    
    screenProtectorTypes: [{ 
      type: String, 
      enum: ['Tempered Glass', 'Privacy', 'Anti-glare']
    }],
    
    // Additional metadata
    tags: [{ type: String, index: true }],
    specifications: { type: Map, of: String, default: {} },

    // Supplier data (set by scripts/import-crazyparts.mjs)
    sku: { type: String, trim: true, index: true },
    gtin: { type: String, trim: true },
    manufacturer: { type: String, trim: true }, // accessory brand, e.g. REDEFYNE
    supplier: {
      name: { type: String },
      url: { type: String },
      productId: { type: String },
      inStock: { type: Boolean },
      checkedAt: { type: Date },
    },
    /** Our cost ex GST. Never sent to shoppers: excluded from every query unless asked for. */
    costPrice: { type: Number, min: 0, select: false },
    /** 'kiosk' = held in stock at Warringal; 'order-in' = ordered from the supplier when bought. */
    fulfilment: { type: String, enum: ['kiosk', 'order-in'], default: 'kiosk' },
    variants: { type: [VariantSchema], default: undefined },
  },
  { timestamps: true }
);

// Compound indexes for common filter queries
ProductSchema.index({ category: 1, brand: 1 });
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ category: 1, createdAt: -1 });
ProductSchema.index({ 'variants.sku': 1 });
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' }); // Full-text search

// Check if the model already exists to prevent overwriting during hot reloads
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

