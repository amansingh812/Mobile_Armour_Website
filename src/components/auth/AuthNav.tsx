"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function AuthNav() {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const isLoading = status === "loading";

    return (
        <div className="flex items-center">
            {isLoading ? (
                // Loading state
                <div className="h-8 w-8 rounded-full border-2 border-t-blue-500 animate-spin"></div>
            ) : session ? (
                // Logged in state
                <div className="flex items-center gap-4">
                    <Link
                        href="/account/profile"
                        className="text-sm font-medium hover:text-blue-600 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                                {session.user?.image ? (
                                    <img
                                        src={session.user.image}
                                        alt={session.user.name || "Profile"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-sm font-medium text-blue-600">
                                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                                    </span>
                                )}
                            </div>
                            <span>{session.user?.name || session.user?.email?.split('@')[0] || "Account"}</span>
                        </div>
                    </Link>

                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                // Logged out state
                <div className="flex items-center gap-4">
                    <Link
                        href="/account/login"
                        className={`text-sm font-medium ${pathname === "/account/login" ? "text-blue-600" : "hover:text-blue-600 transition-colors"
                            }`}
                    >
                        Login
                    </Link>

                    <Link
                        href="/account/register"
                        className={`px-4 py-2 rounded-md text-sm font-medium ${pathname === "/account/register"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                            }`}
                    >
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
}
