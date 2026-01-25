import nodemailer from "nodemailer";

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

export async function sendLeadNotificationEmail(data: LeadNotificationData) {
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
      typeLabel = '🛒 New Product Order';
      typeColor = '#4CAF50';
      break;
    case 'ENQUIRY':
      typeLabel = '💬 New Chatbot Enquiry';
      typeColor = '#2196F3';
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
      <p style="margin: 0; padding: 12px; background: #f9f9f9; border-radius: 6px; color: #555; line-height: 1.6;">${data.message}</p>
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
      subject: `${typeLabel} - ${data.name || data.phone || 'New Customer'}`,
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
