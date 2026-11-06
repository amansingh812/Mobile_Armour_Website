import { NextRequest, NextResponse } from 'next/server';
import { sendLeadNotificationEmail } from '@/lib/mailer';

// Website enquiry forms (contact, repair quote, refurbished, chatbot) email the
// shop through here. It's public, so: only known form types, a phone or email
// is required, and each visitor is limited to a few sends per 10 minutes.
// (Order emails are sent by the server itself, never through this route.)
const TYPES = new Set(['ENQUIRY', 'CONTACT', 'REFURB_ENQUIRY', 'REPAIR_BOOKING']);
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded on long-lived instances
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  try {
    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    if (limited(ip)) {
      return NextResponse.json({ success: false, message: 'Too many messages, please call us instead.' }, { status: 429 });
    }
    const { type, data } = await request.json();
    const kind = typeof type === 'string' && TYPES.has(type) ? type : 'ENQUIRY';
    const d = data && typeof data === 'object' ? data : {};
    const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : undefined);
    const phone = str(d.phone, 30);
    const email = str(d.email, 120);
    if (!phone && !email) {
      return NextResponse.json({ success: false, message: 'Please include a phone number or email.' }, { status: 400 });
    }

    const result = await sendLeadNotificationEmail({
      type: kind,
      name: str(d.name, 80),
      phone,
      email,
      brand: str(d.brand, 60),
      model: str(d.model, 80),
      message: str(d.message || d.description, 4000),
      productName: str(d.productName, 200),
      quantity: str(d.quantity, 10),
      deliveryAddress: str(d.deliveryAddress, 300),
      preferredDate: str(d.preferredDate, 40),
      preferredTime: str(d.preferredTime, 40),
    });

    return result
      ? NextResponse.json({ success: true, message: 'Email notification sent successfully!' })
      : NextResponse.json({ success: false, message: 'Failed to send email notification' }, { status: 500 });
  } catch (error) {
    console.error('[send-lead-email] Error:', error);
    return NextResponse.json({ success: false, message: 'Could not send' }, { status: 500 });
  }
}
