import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import { sendOtpEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
    try {
        // Connect to the database
        await dbConnect();
        
        // Parse the request body
        const body = await request.json();
        const { name, email, password } = body;

        // Validate the input
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { message: "Password must be at least 8 characters long" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Create a new user (password will be hashed by the User model's pre-save hook)
        const user = new User({
            name,
            email: email.toLowerCase(),
            password,
            isVerified: false
        });

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.otpCodeHash = otpHash;
        user.otpExpiresAt = expiresAt;
        user.otpAttempts = 0;
        user.lastOtpSentAt = new Date();

        await user.save();

        // Send OTP email (best-effort)
        try {
            await sendOtpEmail(user.email, otp);
        } catch (e) {
            console.error("Failed to send OTP email:", e);
        }

        // Return success response (exclude password from response)
        return NextResponse.json(
            { 
                message: "User registered successfully. Please verify the OTP sent to your email.",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration error:", error);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) { // Duplicate key error
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }
        
        return NextResponse.json(
            { message: "An error occurred during registration" },
            { status: 500 }
        );
    }
}
