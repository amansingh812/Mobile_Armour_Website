"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { toast } from "react-hot-toast";

export default function EditProfilePage() {
    const { data: session, update } = useSession();
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        phone: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    // Initialize form with user data when session is available
    useEffect(() => {
        if (session?.user) {
            setFormData({
                name: session.user.name || "",
                phone: session.user.phone || ""
            });
        }
    }, [session]);

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

        if (!formData.name.trim()) {
            toast.error("Name is required");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/user/update-profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update profile");
            }

            // Update the session with new user data
            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: data.user.name,
                    phone: data.user.phone
                }
            });

            toast.success("Profile updated successfully");
            router.push("/account/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="edit-profile-container">
                <div className="container mx-auto py-6 px-4">
                    <div className="auth-card mx-auto">
                        <h1 className="auth-title">Edit Profile</h1>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"

                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={session?.user?.email || ""}
                                    className="form-input bg-gray-100"
                                    disabled
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Email cannot be changed
                                </p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">
                                    Phone (optional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-input"

                                />
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="auth-button auth-button-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Updating..." : "Save Changes"}
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
