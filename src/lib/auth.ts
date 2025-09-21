import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Types for authentication
export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export interface Session {
    user: User;
    expires: string;
}

/**
 * Get the current session on the server
 */
export async function getSession() {
    return await getServerSession(authOptions);
}

/**
 * Check if the user is authenticated on the server
 */
export async function getCurrentUser() {
    const session = await getSession();

    return session?.user;
}

/**
 * Protect a route by requiring authentication
 * Redirects to login page if not authenticated
 */
export async function requireAuth() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/account/login");
    }

    return user;
}

/**
 * Check if a user is authenticated on the client side
 * This is a simple helper for client components
 */
export function isAuthenticated(session: Session | null): boolean {
    return !!session?.user;
}

/**
 * Format the user's display name
 */
export function formatUserName(user: User | undefined): string {
    if (!user) return "Guest";

    if (user.name) return user.name;

    if (user.email) {
        // Extract name from email (e.g., john.doe@example.com -> John Doe)
        const emailName = user.email.split("@")[0];
        return emailName
            .split(/[._-]/)
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");
    }
    return "User";
}
