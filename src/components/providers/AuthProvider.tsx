"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * AuthProvider component that wraps the application with NextAuth's SessionProvider
 * This makes the session available throughout the app via useSession hook
 */
export default function AuthProvider({ children }: AuthProviderProps) {
    return <SessionProvider>{children}</SessionProvider>;
}
