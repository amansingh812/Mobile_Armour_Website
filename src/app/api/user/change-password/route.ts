import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        // Get the current session to verify the user
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        
        // Connect to the database
        await dbConnect();
        
        // Parse the request body
        const data = await req.json();
        const { currentPassword, newPassword } = data;
        
        // Validate the input
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: "Current password and new password are required" },
                { status: 400 }
            );
        }
        
        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: "New password must be at least 8 characters long" },
                { status: 400 }
            );
        }
        
        // Find the user by ID
        const userId = session.user._id;
        const user = await User.findById(userId);
        
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        
        // Verify the current password
        const isPasswordValid = await user.comparePassword(currentPassword);
        
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Current password is incorrect" },
                { status: 400 }
            );
        }
        
        // Update the password
        user.password = newPassword;
        await user.save(); // The pre-save hook will hash the password
        
        // Return success response
        return NextResponse.json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error("Error changing password:", error);
        return NextResponse.json(
            { error: "Failed to change password" },
            { status: 500 }
        );
    }
}
