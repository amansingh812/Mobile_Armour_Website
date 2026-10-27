import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Order, { ORDER_STATUSES, type OrderStatus } from '@/models/Order';
import { isAdminRequest } from '@/lib/auth';
import { sendOrderStatusEmail } from '@/lib/mailer';

const noStore = { 'Cache-Control': 'no-store' };

// Admin only. GET lists orders (newest first); PATCH changes status / tracking / notes.
export async function GET(req: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  await dbConnect();
  const status = req.nextUrl.searchParams.get('status');
  const filter: Record<string, unknown> = { stripeSessionId: { $exists: true } };
  if (status && (ORDER_STATUSES as readonly string[]).includes(status)) filter.status = status;
  else if (status === 'open') filter.status = { $in: ['paid', 'ordered', 'ready', 'shipped'] };
  const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(200).lean();
  const counts = await Order.aggregate([
    { $match: { stripeSessionId: { $exists: true } } },
    { $group: { _id: '$status', n: { $sum: 1 } } },
  ]);
  return NextResponse.json({ orders, counts: Object.fromEntries(counts.map((c) => [c._id, c.n])) }, { headers: noStore });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const body = await req.json().catch(() => null);
  const id = String(body?.id || '');
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'bad id' }, { status: 400 });
  await dbConnect();
  const order = await Order.findById(id);
  if (!order) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const prev = order.status;
  if (typeof body.status === 'string') {
    if (!(ORDER_STATUSES as readonly string[]).includes(body.status)) {
      return NextResponse.json({ error: 'bad status' }, { status: 400 });
    }
    order.status = body.status as OrderStatus;
  }
  if (typeof body.trackingNumber === 'string') order.trackingNumber = body.trackingNumber.trim().slice(0, 80) || undefined;
  if (typeof body.notes === 'string') order.notes = body.notes.slice(0, 2000);
  await order.save();

  // Tell the customer when it's ready to collect or has been posted.
  let emailed = false;
  if (body.notify !== false && order.status !== prev && (order.status === 'ready' || order.status === 'shipped')) {
    emailed = await sendOrderStatusEmail(order).catch((e) => {
      console.error('[admin/orders] status email failed', e);
      return false;
    });
  }
  return NextResponse.json({ order: order.toObject(), emailed }, { headers: noStore });
}
