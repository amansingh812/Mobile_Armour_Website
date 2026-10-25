export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  oldPrice?: number;
  newPrice?: number;
  stock?: number;
  features?: string[];
  images?: string[];
  deviceCompatibility?: string[];
  /** Chosen option (model + colour) for products with options. */
  variantSku?: string;
  /** e.g. "iPhone 17 Pro Max · Mint" */
  variantLabel?: string;
  /** The phone the customer picked. */
  model?: string;
}

/** One cart line per product option: the same case in two colours is two lines. */
export function lineKey(p: Pick<Product, '_id' | 'variantSku' | 'model'>): string {
  return p.variantSku ? `${p._id}::${p.variantSku}::${p.model || ''}` : p._id;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}
