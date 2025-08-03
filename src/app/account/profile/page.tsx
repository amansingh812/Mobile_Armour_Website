"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
    const { data: session } = useSession();
    const router = useRouter();

    // Profile is protected, so we wrap it with ProtectedRoute
    return (
        <ProtectedRoute>
            <div className="container mx-auto py-10 max-w-4xl">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

                    <div className="flex items-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-6">
                            {session?.user?.image ? (
                                <img
                                    src={session.user.image}
                                    alt={session.user.name || "Profile"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-4xl text-gray-400">
                                    {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U"}
                                </span>
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold">
                                {session?.user?.name || "User"}
                            </h2>
                            <p className="text-gray-600">{session?.user?.email}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-xl font-semibold mb-4">Account Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <p className="bg-gray-50 p-3 rounded">
                                    {session?.user?.name || "Not provided"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <p className="bg-gray-50 p-3 rounded">
                                    {session?.user?.email}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Account ID
                                </label>
                                <p className="bg-gray-50 p-3 rounded">
                                    {session?.user?._id || "Not available"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Account Type
                                </label>
                                <p className="bg-gray-50 p-3 rounded">
                                    {session?.user?.image ? "Social Login" : "Email & Password"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <button
                            onClick={() => router.push("/account/edit-profile")}
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Edit Profile
                        </button>

                        <button
                            onClick={() => router.push("/account/change-password")}
                            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Change Password
                        </button>

                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
