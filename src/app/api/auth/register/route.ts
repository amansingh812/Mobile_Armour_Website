import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

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
            isVerified: true // For simplicity; in production, you might want email verification
        });

        // Save the user to the database
        await user.save();

        // Return success response (exclude password from response)
        return NextResponse.json(
            { 
                message: "User registered successfully",
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
