import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import { sendOtpEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({ message: "If an account with this email exists, you will receive a password reset code." }, { status: 200 });
    }

    // Basic rate limit: 60s between sends
    const now = new Date();
    if (user.lastOtpSentAt && now.getTime() - new Date(user.lastOtpSentAt).getTime() < 60 * 1000) {
      return NextResponse.json({ message: "Please wait before requesting another code" }, { status: 429 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    user.otpCodeHash = otpHash;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.otpAttempts = 0;
    user.lastOtpSentAt = now;
    await user.save();

    try {
      await sendOtpEmail(user.email, otp);
    } catch (e) {
      console.error("Failed to send password reset email:", e);
      return NextResponse.json({ message: "Failed to send reset code. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ message: "Password reset code sent to your email" }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
