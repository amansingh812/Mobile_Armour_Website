"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
    const { data: session } = useSession();
    const router = useRouter();

    // Get first letter of name or email for avatar
    const getInitial = () => {
        if (session?.user?.name) return session.user.name.charAt(0);
        if (session?.user?.email) return session.user.email.charAt(0);
        return "U";
    };

    // Profile is protected, so we wrap it with ProtectedRoute
    return (
        <ProtectedRoute>
            <div className="profile-container">
                <div className="container mx-auto py-6 px-4">
                    <div className="profile-card mx-auto">
                        <h1 className="profile-title">Your Profile</h1>

                        <div className="flex flex-col items-center justify-center gap-6 mb-8">
                            <div className="profile-avatar">
                                {session?.user?.image ? (
                                    <img
                                        src={session.user.image}
                                        alt={session.user.name || "Profile"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="profile-avatar-text">
                                        {getInitial()}
                                    </span>
                                )}
                            </div>

                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {session?.user?.name || "User"}
                                </h2>
                                <p className="text-gray-600">{session?.user?.email}</p>
                            </div>
                        </div>

                        <div className="profile-info-section">
                            <h3 className="profile-section-title">Account Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="profile-field-label">
                                        Name
                                    </label>
                                    <p className="profile-field-value">
                                        {session?.user?.name || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <label className="profile-field-label">
                                        Email
                                    </label>
                                    <p className="profile-field-value">
                                        {session?.user?.email}
                                    </p>
                                </div>

                                <div>
                                    <label className="profile-field-label">
                                        Account ID
                                    </label>
                                    <p className="profile-field-value">
                                        {session?.user?._id || "Not available"}
                                    </p>
                                </div>

                                <div>
                                    <label className="profile-field-label">
                                        Account Type
                                    </label>
                                    <p className="profile-field-value">
                                        {session?.user?.image ? "Social Login" : "Email & Password"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="profile-button-group">
                            <button
                                onClick={() => router.push("/account/edit-profile")}
                                className="profile-button profile-button-primary"
                            >
                                Edit Profile
                            </button>

                            <button
                                onClick={() => router.push("/account/change-password")}
                                className="profile-button profile-button-secondary"
                            >
                                Change Password
                            </button>

                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="profile-button profile-button-danger"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
