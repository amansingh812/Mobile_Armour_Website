import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function PUT(req: NextRequest) {
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
        const { name, phone } = data;

        // Validate the input
        if (!name || name.trim() === "") {
            return NextResponse.json(
                { error: "Name is required" },
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

        // Update user fields
        user.name = name;
        if (phone !== undefined) {
            user.phone = phone;
        }

        // Save the updated user
        await user.save();

        // Return success response with updated user data
        return NextResponse.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                _id: user._id.toString()
            }
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
