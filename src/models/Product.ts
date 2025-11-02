import mongoose, { Schema, Document } from 'mongoose';

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
  
  createdAt: Date;
  updatedAt: Date;
}

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
    deviceCompatibility: [{ 
      type: String, 
      enum: [
        'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
        'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
        'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
        'iPhone 13 Mini', 'Samsung Galaxy S24', 'Samsung Galaxy S23', 'Google Pixel 8',
        'OnePlus 12', 'Xiaomi 14', 'OPPO Find X7'
      ],
      index: true 
    }],
    
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
        'Camera Bump Protector', 'Wallet Case', 'Designer Printed'
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
  },
  { timestamps: true }
);

// Check if the model already exists to prevent overwriting during hot reloads
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

