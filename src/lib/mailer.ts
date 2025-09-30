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
