import nodemailer from "nodemailer";
import type { IOrder } from "@/models/Order";
import { STORE } from "@/data/store-settings";
import { BUSINESS, fullAddress } from "@/data/business";

const SMTP_HOST = process.env.SMTP_HOST as string;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER as string;
const SMTP_PASS = process.env.SMTP_PASS as string;
const SMTP_FROM = process.env.SMTP_FROM as string;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
  // Do not throw on import; allow build to succeed. Runtime will throw if used without config.
  console.warn("[mailer] SMTP environment variables are not fully set. Emails will fail at runtime.");
}

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function sendOtpEmail(to: string, otp: string) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    throw new Error("SMTP not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM");
  }

  const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Verify your email</h2>
    <p>Your one-time verification code is:</p>
    <div style="font-size: 28px; font-weight: 700; letter-spacing: 6px; padding: 12px 16px; background: #f6f6f6; display: inline-block; border-radius: 6px;">
      ${otp}
    </div>
    <p style="margin-top: 12px;">This code will expire in 10 minutes. If you did not request this, you can ignore this email.</p>
    <p style="color: #999; font-size: 12px;">Mobile Armour</p>
  </div>`;

  return transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject: "Your Mobile Armour verification code",
    html,
  });
}

interface LeadNotificationData {
  type: string;
  name?: string;
  phone?: string;
  email?: string;
  brand?: string;
  model?: string;
  message?: string;
  productName?: string;
  quantity?: string;
  deliveryAddress?: string;
  preferredDate?: string;
  preferredTime?: string;
}

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendLeadNotificationEmail(rawData: LeadNotificationData) {
  // Form input goes straight into the email HTML: escape it and cap lengths.
  const data = Object.fromEntries(
    Object.entries(rawData).map(([k, v]) => [k, typeof v === "string" ? escapeHtml(v.slice(0, 4000)) : v])
  ) as LeadNotificationData;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.warn("[mailer] SMTP not configured. Skipping lead notification email.");
    return null;
  }

  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL || SMTP_FROM;
  const timestamp = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' });
  
  console.log(`[mailer] Preparing to send lead notification:`, {
    from: SMTP_FROM,
    to: notificationEmail,
    type: data.type,
    name: data.name,
    phone: data.phone,
  });
  
  let typeLabel = 'New Enquiry';
  let typeColor = '#2196F3';
  
  switch (data.type) {
    case 'REPAIR_BOOKING':
      typeLabel = '🔧 New Repair Booking';
      typeColor = '#FF5722';
      break;
    case 'PRODUCT_ORDER':
      typeLabel = '🛒 New Paid Order';
      typeColor = '#4CAF50';
      break;
    case 'ENQUIRY':
      typeLabel = '💬 New Chatbot Enquiry';
      typeColor = '#2196F3';
      break;
    case 'CONTACT':
      typeLabel = '📩 New Website Message';
      typeColor = '#FF5600';
      break;
  }

  const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background: ${typeColor}; color: white; padding: 20px; text-align: center;">
      <h2 style="margin: 0;">${typeLabel}</h2>
      <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">${timestamp}</p>
    </div>
    
    <div style="padding: 24px;">
      <h3 style="margin: 0 0 16px; color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px;">Customer Details</h3>
      
      <table style="width: 100%; border-collapse: collapse;">
        ${data.name ? `<tr><td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name:</strong></td><td style="padding: 8px 0; color: #333;">${data.name}</td></tr>` : ''}
        ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 8px 0; color: #333;"><a href="tel:${data.phone}" style="color: #FF5722;">${data.phone}</a></td></tr>` : ''}
        ${data.email ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0; color: #333;"><a href="mailto:${data.email}" style="color: #2196F3;">${data.email}</a></td></tr>` : ''}
        ${data.brand ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Brand:</strong></td><td style="padding: 8px 0; color: #333;">${data.brand}</td></tr>` : ''}
        ${data.model ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Model:</strong></td><td style="padding: 8px 0; color: #333;">${data.model}</td></tr>` : ''}
        ${data.productName ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Product:</strong></td><td style="padding: 8px 0; color: #333;">${data.productName}</td></tr>` : ''}
        ${data.quantity ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Quantity:</strong></td><td style="padding: 8px 0; color: #333;">${data.quantity}</td></tr>` : ''}
        ${data.deliveryAddress ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Address:</strong></td><td style="padding: 8px 0; color: #333;">${data.deliveryAddress}</td></tr>` : ''}
        ${data.preferredDate ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Preferred Date:</strong></td><td style="padding: 8px 0; color: #333;">${data.preferredDate}</td></tr>` : ''}
        ${data.preferredTime ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Preferred Time:</strong></td><td style="padding: 8px 0; color: #333;">${data.preferredTime}</td></tr>` : ''}
      </table>
      
      ${data.message ? `
      <h3 style="margin: 24px 0 12px; color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px;">Message / Issue</h3>
      <p style="margin: 0; padding: 12px; background: #f9f9f9; border-radius: 6px; color: #555; line-height: 1.6; white-space: pre-line;">${data.message}</p>
      ` : ''}
      
      ${data.phone ? `
      <div style="margin-top: 24px; text-align: center;">
        <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
          💬 Reply on WhatsApp
        </a>
      </div>
      ` : ''}
    </div>
    
    <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #999;">
      <p style="margin: 0;">Mobile Armour Lead Notification System</p>
    </div>
  </div>`;

  try {
    const mailResult = await transporter.sendMail({
      from: SMTP_FROM,
      to: notificationEmail,
      subject: `${typeLabel} - ${(rawData.name || rawData.phone || 'New Customer').slice(0, 80)}`,
      html,
    });
    console.log(`[mailer] ✅ Lead notification email sent successfully for ${data.type}`, {
      messageId: mailResult.messageId,
      response: mailResult.response
    });
    return true;
  } catch (error) {
    console.error("[mailer] ❌ Failed to send lead notification email:", {
      error: error instanceof Error ? error.message : String(error),
      to: notificationEmail,
      from: SMTP_FROM,
      type: data.type
    });
    return false;
  }
}

// ------------------------------------------------------------ customer order email

/** Order confirmation for the customer. Returns true when sent. */
export async function sendOrderConfirmationEmail(order: IOrder): Promise<boolean> {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.warn("[mailer] SMTP not configured. Skipping order confirmation email.");
    return false;
  }
  const to = order.customer?.email;
  if (!to) return false;

  const e = (v: unknown) => escapeHtml(String(v ?? ""));
  const collect = order.fulfilment !== "delivery";
  const anyOrderIn = order.items.some((i) => i.orderIn);
  const firstName = (order.customer?.name || "").trim().split(/\s+/)[0];

  const when = collect
    ? anyOrderIn
      ? `Some items are ordered in for you (${STORE.orderIn.readyText}). We'll text you as soon as everything is ready to collect.`
      : `We'll text you when it's ready to collect (${STORE.clickAndCollect.readyText}).`
    : `We'll send it by ${STORE.delivery.carrier} (${STORE.delivery.timeText}) and email you when it's on its way.${
        anyOrderIn ? ` Some items are ordered in first (${STORE.orderIn.readyText}).` : ""
      }`;

  const rows = order.items
    .map(
      (i) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#222">${e(i.name)}<br><span style="color:#888;font-size:13px">Qty ${i.quantity}</span></td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;color:#222;white-space:nowrap">$${(i.unitPrice * i.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join("");
  const extra = [
    order.bundleSaving > 0 ? `<tr><td style="padding:6px 0;color:#666">Bundle saving</td><td style="padding:6px 0;text-align:right;color:#666">−$${order.bundleSaving.toFixed(2)}</td></tr>` : "",
    !collect ? `<tr><td style="padding:6px 0;color:#666">Delivery</td><td style="padding:6px 0;text-align:right;color:#666">${order.shipping > 0 ? `$${order.shipping.toFixed(2)}` : "Free"}</td></tr>` : "",
  ].join("");
  const addr = order.shippingAddress;
  const addrText = addr ? [addr.line1, addr.line2, addr.city, addr.state, addr.postcode].filter(Boolean).join(", ") : "";

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e6e6e6;border-radius:10px;overflow:hidden">
    <div style="background:#111;color:#fff;padding:22px 24px">
      <div style="font-size:13px;opacity:.75">Mobile Armour · Order ${e(order.orderNumber)}</div>
      <h2 style="margin:6px 0 0;font-size:22px">Thanks${firstName ? `, ${e(firstName)}` : ""}. Your order is paid.</h2>
    </div>
    <div style="padding:24px">
      <p style="margin:0 0 16px;color:#333;line-height:1.55">${e(when)}</p>
      ${collect ? `<p style="margin:0 0 20px;color:#333;line-height:1.55"><strong>Collect from:</strong> ${e(fullAddress)}<br>Bring this email or your order number <strong>${e(order.orderNumber)}</strong>.</p>` : `<p style="margin:0 0 20px;color:#333;line-height:1.55"><strong>Delivering to:</strong> ${e(addrText)}</p>`}
      <table style="width:100%;border-collapse:collapse;font-size:15px">${rows}${extra}
        <tr><td style="padding:12px 0 0;font-weight:700;color:#111">Total paid</td><td style="padding:12px 0 0;text-align:right;font-weight:700;color:#111">$${order.total.toFixed(2)} AUD</td></tr>
      </table>
      <p style="margin:24px 0 0;color:#555;font-size:14px;line-height:1.55">Wrong model? We'll swap it at the kiosk. Questions about your order: call <a href="${BUSINESS.phoneHref}" style="color:#e85d1f">${BUSINESS.phoneDisplay}</a> or reply to this email.</p>
    </div>
    <div style="background:#f6f6f6;padding:14px 24px;font-size:12px;color:#888">${e(BUSINESS.name)} · ${e(fullAddress)}</div>
  </div>`;

  const text = `Thanks${firstName ? `, ${firstName}` : ""}. Your Mobile Armour order ${order.orderNumber} is paid.

${when}
${collect ? `Collect from: ${fullAddress}` : `Delivering to: ${addrText}`}

${order.items.map((i) => `${i.quantity} x ${i.name}  $${(i.unitPrice * i.quantity).toFixed(2)}`).join("\n")}
Total paid: $${order.total.toFixed(2)} AUD

Questions: ${BUSINESS.phoneDisplay}`;

  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    replyTo: process.env.LEAD_NOTIFICATION_EMAIL || SMTP_FROM,
    subject: `Your Mobile Armour order ${order.orderNumber}`,
    html,
    text,
  });
  return true;
}

/** "Ready to collect" / "On its way" email when the shop updates an order. */
export async function sendOrderStatusEmail(order: IOrder): Promise<boolean> {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) return false;
  const to = order.customer?.email;
  if (!to || (order.status !== "ready" && order.status !== "shipped")) return false;
  const e = (v: unknown) => escapeHtml(String(v ?? ""));
  const ready = order.status === "ready";
  const firstName = (order.customer?.name || "").trim().split(/\s+/)[0];
  const heading = ready ? "Your order is ready to collect" : "Your order is on its way";
  const tracking = order.trackingNumber
    ? `Tracking number: ${order.trackingNumber} (track at auspost.com.au/mypost/track)`
    : "";
  const body = ready
    ? `Pick it up from ${fullAddress}. Open 9am–5pm Monday to Saturday, 10am–5pm Sunday. Bring your order number ${order.orderNumber}.`
    : `We've sent it by ${STORE.delivery.carrier}. ${tracking}`;
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e6e6e6;border-radius:10px;overflow:hidden">
    <div style="background:#111;color:#fff;padding:22px 24px">
      <div style="font-size:13px;opacity:.75">Mobile Armour · Order ${e(order.orderNumber)}</div>
      <h2 style="margin:6px 0 0;font-size:22px">${e(heading)}${firstName ? `, ${e(firstName)}` : ""}</h2>
    </div>
    <div style="padding:24px;color:#333;line-height:1.55">
      <p style="margin:0 0 16px">${e(body)}</p>
      <ul style="margin:0 0 16px;padding-left:18px">${order.items.map((i) => `<li>${i.quantity} × ${e(i.name)}</li>`).join("")}</ul>
      <p style="margin:0;font-size:14px;color:#555">Questions: <a href="${BUSINESS.phoneHref}" style="color:#e85d1f">${BUSINESS.phoneDisplay}</a></p>
    </div>
  </div>`;
  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    replyTo: process.env.LEAD_NOTIFICATION_EMAIL || SMTP_FROM,
    subject: `${heading} (${order.orderNumber})`,
    html,
    text: `${heading}. ${body}`,
  });
  return true;
}
