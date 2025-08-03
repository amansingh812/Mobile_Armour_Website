"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { toast } from "react-hot-toast";

export default function ChangePasswordPage() {
    const { data: session } = useSession();
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (formData.newPassword.length < 8) {
            toast.error("New password must be at least 8 characters long");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/user/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to change password");
            }

            toast.success("Password changed successfully");
            router.push("/account/profile");
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error(error instanceof Error ? error.message : "Failed to change password");
        } finally {
            setIsLoading(false);
        }
    };

    // Check if user is using social login
    const isSocialLogin = session?.user?.image ? true : false;

    if (isSocialLogin) {
        return (
            <ProtectedRoute>
                <div className="change-password-container">
                    <div className="container mx-auto py-6 px-4">
                        <div className="auth-card mx-auto">
                            <h1 className="auth-title">Change Password</h1>

                            <div className="text-center py-8">
                                <p className="text-gray-700 mb-4">
                                    You are signed in with a social account.
                                </p>
                                <p className="text-gray-700 mb-6">
                                    Password management is handled by your social provider.
                                </p>

                                <button
                                    onClick={() => router.push("/account/profile")}
                                    className="auth-button auth-button-secondary"
                                >
                                    Back to Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="change-password-container">
                <div className="container mx-auto py-6 px-4">
                    <div className="auth-card mx-auto">
                        <h1 className="auth-title">Change Password</h1>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="currentPassword" className="form-label">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className="form-input"

                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="newPassword" className="form-label">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="form-input"

                                    minLength={8}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-input"

                                    minLength={8}
                                    required
                                />
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="auth-button auth-button-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Changing..." : "Change Password"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => router.push("/account/profile")}
                                    className="auth-button auth-button-secondary"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
