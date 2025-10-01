import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, otp, newPassword } = body as { 
      email?: string; 
      otp?: string; 
      newPassword?: string; 
    };

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ message: "Email, OTP, and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.otpCodeHash || !user.otpExpiresAt) {
      return NextResponse.json({ message: "No reset code found. Please request a new one." }, { status: 400 });
    }

    if (new Date() > new Date(user.otpExpiresAt)) {
      return NextResponse.json({ message: "Reset code expired. Please request a new one." }, { status: 400 });
    }

    const providedHash = crypto.createHash("sha256").update(otp).digest("hex");
    if (providedHash !== user.otpCodeHash) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();
      return NextResponse.json({ message: "Invalid reset code" }, { status: 400 });
    }

    // Update password and clear OTP fields
    user.password = newPassword; // This will be hashed by the pre-save middleware
    user.otpCodeHash = null;
    user.otpExpiresAt = null;
    user.otpAttempts = 0;
    user.lastOtpSentAt = null;
    await user.save();

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
