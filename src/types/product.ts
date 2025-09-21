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
