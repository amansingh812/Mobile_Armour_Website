"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/components/admin/types";

export default function AddProductPage() {
    const router = useRouter();
    const [savedProduct, setSavedProduct] = useState<Product | null>(null);

    const handleSave = (saved: Product) => {
        setSavedProduct(saved);
        setTimeout(() => {
            router.push("/admin/products");
        }, 1200);
    };

    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" }}>
            {/* Breadcrumb Navigation */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
                <Link href="/admin/products" style={{ color: "#2563eb", textDecoration: "none" }}>
                    ← Products
                </Link>
                <span>/</span>
                <span style={{ color: "#111827", fontWeight: 500 }}>Add New Product</span>
            </div>

            {/* Header */}
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
                    Add New Product
                </h1>
                <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
                    Fill out the product information, pricing, inventory, and category filter details.
                </p>
            </div>

            {/* Success toast */}
            {savedProduct && (
                <div
                    style={{
                        padding: "14px 18px",
                        borderRadius: 10,
                        background: "#ecfdf5",
                        border: "1px solid #a7f3d0",
                        color: "#065f46",
                        marginBottom: 24,
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <span style={{ fontSize: 18 }}>✓</span>
                    <span>Product <strong>{savedProduct.name}</strong> created successfully! Redirecting to products list...</span>
                </div>
            )}

            {/* Reusable Form */}
            <ProductForm
                mode="add"
                onSave={handleSave}
                onCancel={() => router.push("/admin/products")}
            />
        </div>
    );
}
