"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/components/admin/types";

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [savedProduct, setSavedProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setProduct(data);
            } catch (err: any) {
                setError(err.message || "Failed to load product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleSave = (saved: Product) => {
        setSavedProduct(saved);
        setTimeout(() => {
            router.push(`/admin/products/${saved._id || id}`);
        }, 1200);
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
                    <p style={{ color: "#6b7280", fontSize: 14 }}>Loading product for editing...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div style={{ maxWidth: 800, margin: "60px auto", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Product Not Found</h2>
                <p style={{ color: "#6b7280", marginBottom: 20 }}>{error || "The requested product does not exist."}</p>
                <Link
                    href="/admin/products"
                    style={{
                        padding: "10px 20px",
                        background: "#2563eb",
                        color: "#fff",
                        borderRadius: 8,
                        textDecoration: "none",
                        fontWeight: 600,
                    }}
                >
                    ← Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" }}>
            {/* Breadcrumb Navigation */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
                <Link href="/admin/products" style={{ color: "#2563eb", textDecoration: "none" }}>
                    ← Products
                </Link>
                <span>/</span>
                <Link href={`/admin/products/${id}`} style={{ color: "#2563eb", textDecoration: "none" }}>
                    {product.name}
                </Link>
                <span>/</span>
                <span style={{ color: "#111827", fontWeight: 500 }}>Edit</span>
            </div>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
                        Edit Product
                    </h1>
                    <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
                        Editing details for <strong>{product.name}</strong> ({product._id})
                    </p>
                </div>
                <Link
                    href={`/admin/products/${id}`}
                    style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "1px solid #d1d5db",
                        background: "#fff",
                        color: "#374151",
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: "none",
                    }}
                >
                    👁️ View Details
                </Link>
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
                    <span>Product updated successfully! Redirecting to product page...</span>
                </div>
            )}

            {/* Reusable Form */}
            <ProductForm
                mode="edit"
                product={product}
                onSave={handleSave}
                onCancel={() => router.push(`/admin/products/${id}`)}
            />
        </div>
    );
}
