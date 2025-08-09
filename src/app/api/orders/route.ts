import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    // Expected body shape
    // {
    //   customer: { fullName, email, phone, address: { street, city, state, zipCode, country } },
    //   items: [{ productId, quantity, price }],
    //   total,
    //   paymentMethod: 'cod' | 'bank'
    // }

    const { customer, items, total, paymentMethod } = body || {};

    if (!customer || !customer.address) {
      return NextResponse.json({ error: 'Missing customer/address' }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items to order' }, { status: 400 });
    }

    if (typeof total !== 'number' || total <= 0) {
      return NextResponse.json({ error: 'Invalid total' }, { status: 400 });
    }

    const orderDoc = await Order.create({
      // Optional: if you add auth later, pass user id here
      user: new mongoose.Types.ObjectId(),
      items: items.map((it: any) => ({
        product: new mongoose.Types.ObjectId(it.productId),
        quantity: it.quantity,
        price: it.price,
      })),
      totalAmount: total,
      shippingAddress: {
        street: customer.address.street,
        city: customer.address.city,
        state: customer.address.state,
        postalCode: customer.address.zipCode,
        country: customer.address.country,
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      orderStatus: 'processing',
    });

    return NextResponse.json({ id: orderDoc._id, status: 'created' }, { status: 201 });
  } catch (err) {
    console.error('Create order error', err);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
