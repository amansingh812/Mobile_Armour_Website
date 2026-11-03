"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const ADMIN_EMAILS = ['dromperfectly125@gmail.com', 'niraj3438@gmail.com'];
const isAdminEmail = (email?: string | null) => !!email && ADMIN_EMAILS.includes(email.toLowerCase());

const navItems = [
    { href: "/admin/products", label: "📦 Products", match: "/admin/products" },
    { href: "/admin/orders", label: "🧾 Orders", match: "/admin/orders" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                <p style={{ color: "#6b7280", fontSize: 16 }}>Loading...</p>
            </div>
        );
    }

    if (!session?.user || !isAdminEmail(session.user.email)) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: 16, background: "#f9fafb", fontFamily: "system-ui, -apple-system, sans-serif" }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>Admin Access Required</h2>
                <p style={{ color: "#6b7280", fontSize: 14 }}>Please sign in with an authorized admin account to access the dashboard.</p>
                <Link href="/account/login" style={{ padding: "10px 24px", background: "#2563eb", color: "#fff", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: 240,
                    background: "#111827",
                    color: "#fff",
                    padding: "24px 0",
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    overflowY: "auto",
                }}
            >
                {/* Logo / Title */}
                <div style={{ padding: "0 20px", marginBottom: 32 }}>
                    <Link href="/admin/products" style={{ textDecoration: "none", color: "#fff" }}>
                        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>
                            Mobile Armour
                        </div>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                            Admin Dashboard
                        </div>
                    </Link>
                </div>

                {/* Nav Items */}
                <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 8px" }}>
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.match);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "10px 14px",
                                    borderRadius: 8,
                                    fontSize: 14,
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? "#fff" : "#d1d5db",
                                    background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                                    textDecoration: "none",
                                    transition: "all 0.15s ease",
                                }}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Divider */}
                <div style={{ flex: 1 }} />

                {/* User info */}
                <div style={{
                    padding: "16px 20px",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    fontSize: 12,
                    color: "#9ca3af",
                }}>
                    <div style={{ fontWeight: 500, color: "#d1d5db", marginBottom: 2 }}>
                        {session.user.name || "Admin"}
                    </div>
                    <div style={{ fontSize: 11, wordBreak: "break-all" }}>
                        {session.user.email}
                    </div>
                    <Link
                        href="/"
                        style={{
                            display: "inline-block",
                            marginTop: 8,
                            fontSize: 11,
                            color: "#6b7280",
                            textDecoration: "underline",
                        }}
                    >
                        ← Back to site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, overflowY: "auto", minHeight: "100vh" }}>
                {children}
            </main>
        </div>
    );
}
