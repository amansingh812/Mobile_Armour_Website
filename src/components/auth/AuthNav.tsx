"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function AuthNav() {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const isLoading = status === "loading";

    // Get first letter of name or email for avatar
    const getInitial = () => {
        if (session?.user?.name) return session.user.name.charAt(0);
        if (session?.user?.email) return session.user.email.charAt(0);
        return "U";
    };

    return (
        <div className="header-auth-nav">
            {isLoading ? (
                // Loading state
                <div className="h-8 w-8 rounded-full border-2 border-t-blue-500 animate-spin"></div>
            ) : session ? (
                // Logged in state
                <div className="flex items-center gap-4">
                    <Link
                        href="/account/profile"
                        className="header-profile-link"
                    >
                        <div className="header-profile-avatar">
                            {session.user?.image ? (
                                <img
                                    src={session.user.image}
                                    alt={session.user.name || "Profile"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="header-profile-avatar-text">
                                    {getInitial()}
                                </span>
                            )}
                        </div>
                        <span>{session.user?.name || session.user?.email?.split('@')[0] || "Account"}</span>
                    </Link>

                    {/* <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="header-auth-button header-auth-danger"
                    >
                        Sign Out
                    </button> */}
                </div>
            ) : (
                // Logged out state
                <div className="flex items-center gap-4">
                    <Link
                        href="/account/login"
                        className={`header-auth-button header-auth-secondary ${pathname === "/account/login" ? "font-bold" : ""}`}
                    >
                        Login
                    </Link>

                    {/* <Link
                        href="/account/register"
                        className={`header-auth-button header-auth-primary ${pathname === "/account/register" ? "font-bold" : ""}`}
                    >
                        Register
                    </Link> */}
                </div>
            )}
        </div>
    );
}
