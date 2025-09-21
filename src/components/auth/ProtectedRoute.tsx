"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * ProtectedRoute component that redirects unauthenticated users to the login page
 * Use this to wrap pages that require authentication
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const isLoading = status === "loading";
    const isUnauthenticated = status === "unauthenticated";

    useEffect(() => {
        // If the user is not authenticated and the session has been checked
        if (isUnauthenticated) {
            // Redirect to login page with a return URL
            router.push(`/account/login?callbackUrl=${encodeURIComponent(window.location.href)}`);
        }
    }, [isUnauthenticated, router]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // If authenticated, render the children
    return session ? <>{children}</> : null;
}
