import mongoose, { Schema, Document } from 'mongoose';

// A paid shop order, saved by the Stripe webhook (src/lib/orders.ts).
// One order per Stripe Checkout session; the session id makes saving idempotent,
// so Stripe retrying the webhook never creates a second order.

export const ORDER_STATUSES = [
  'paid', // just paid: pack it, or order it in from the supplier
  'ordered', // ordered in from the supplier, waiting for stock
  'ready', // ready to collect at the kiosk (customer texted)
  'shipped', // sent by post
  'completed', // collected or delivered
  'cancelled',
  'refunded',
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface IOrderItem {
  productId?: string;
  sku?: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image?: string;
  orderIn?: boolean; // ordered from the supplier when bought (not held at the kiosk)
}

export interface IOrder extends Document {
  orderNumber: string;
  stripeSessionId: string;
  paymentIntentId?: string;
  status: OrderStatus;
  fulfilment: 'collect' | 'delivery';
  customer: { name?: string; email?: string; phone?: string };
  shippingAddress?: { line1?: string; line2?: string; city?: string; state?: string; postcode?: string; country?: string };
  items: IOrderItem[];
  subtotal: number;
  bundleSaving: number;
  shipping: number;
  total: number;
  currency: string;
  trackingNumber?: string;
  notes?: string;
  customerEmailSent?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    stripeSessionId: { type: String, required: true, unique: true },
    paymentIntentId: String,
    status: { type: String, enum: ORDER_STATUSES, default: 'paid', index: true },
    fulfilment: { type: String, enum: ['collect', 'delivery'], default: 'collect' },
    customer: { name: String, email: String, phone: String },
    shippingAddress: { line1: String, line2: String, city: String, state: String, postcode: String, country: String },
    items: [
      {
        _id: false,
        productId: String,
        sku: String,
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
        image: String,
        orderIn: Boolean,
      },
    ],
    subtotal: { type: Number, default: 0 },
    bundleSaving: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: 'aud' },
    trackingNumber: String,
    notes: String,
    customerEmailSent: Boolean,
  },
  { timestamps: true }
);

OrderSchema.index({ createdAt: -1 });

export default (mongoose.models.Order as mongoose.Model<IOrder>) || mongoose.model<IOrder>('Order', OrderSchema);
