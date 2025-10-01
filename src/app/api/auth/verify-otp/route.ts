import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, otp } = body as { email?: string; otp?: string };

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: "User already verified" }, { status: 200 });
    }

    if (!user.otpCodeHash || !user.otpExpiresAt) {
      return NextResponse.json({ message: "No OTP found. Please request a new code." }, { status: 400 });
    }

    if (new Date() > new Date(user.otpExpiresAt)) {
      return NextResponse.json({ message: "OTP expired. Please request a new code." }, { status: 400 });
    }

    const providedHash = crypto.createHash("sha256").update(otp).digest("hex");
    if (providedHash !== user.otpCodeHash) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    user.isVerified = true;
    user.otpCodeHash = null;
    user.otpExpiresAt = null;
    user.otpAttempts = 0;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
