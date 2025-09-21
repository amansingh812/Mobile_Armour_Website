import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Types for authentication
export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    isAdmin?: boolean;
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
 * Check if the user is an admin (only for Niraj3438@gmail.com)
 */
export async function isAdmin(): Promise<boolean> {
    const user = await getCurrentUser();
    return user?.email === 'Niraj3438@gmail.com';
}

/**
 * Require admin access - redirects to login if not admin
 */
export async function requireAdmin() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/account/login");
    }

    if (user.email !== 'Niraj3438@gmail.com') {
        redirect("/");
    }

    return user;
}

/**
 * Get admin status for the current user
 */
export async function getAdminStatus() {
    const user = await getCurrentUser();
    return {
        isAdmin: user?.email === 'Niraj3438@gmail.com',
        user: user
    };
}
