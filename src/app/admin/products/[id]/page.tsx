"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Product, getProductPrice } from "@/components/admin/types";

export default function ViewProductPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setProduct(data);
                setSelectedImage(data.imageUrl || data.images?.[0] || null);
            } catch (err: any) {
                setError(err.message || "Failed to load product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        if (!product?._id) return;
        if (!window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) return;

        setDeleting(true);
        try {
            const res = await fetch(`/api/products/${product._id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete product");
            router.push("/admin/products");
        } catch (err: any) {
            alert(err.message || "Failed to delete product");
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
                    <p style={{ color: "#6b7280", fontSize: 14 }}>Loading product details...</p>
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

    const price = getProductPrice(product);
    const hasDiscount = product.oldPrice && product.oldPrice > price;
    const discountPercent = hasDiscount && product.oldPrice ? Math.round(((product.oldPrice - price) / product.oldPrice) * 100) : 0;
    const inStock = (product.stock ?? 0) > 0;
    const allImages = [product.imageUrl, ...(product.images || [])].filter(Boolean) as string[];
    const uniqueImages = Array.from(new Set(allImages));

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" }}>
            {/* Breadcrumb Navigation */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
                <Link href="/admin/products" style={{ color: "#2563eb", textDecoration: "none" }}>
                    ← Products
                </Link>
                <span>/</span>
                <span>{product.category}</span>
                <span>/</span>
                <span style={{ color: "#111827", fontWeight: 500, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {product.name}
                </span>
            </div>

            {/* Header & Action Bar */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 16,
                    marginBottom: 28,
                    paddingBottom: 20,
                    borderBottom: "1px solid #e5e7eb",
                }}
            >
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
                        <span
                            style={{
                                background: "#f3f4f6",
                                color: "#374151",
                                padding: "4px 10px",
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                        >
                            {product.category}
                        </span>
                        {product.brand && (
                            <span
                                style={{
                                    background: "#eff6ff",
                                    color: "#1d4ed8",
                                    padding: "4px 10px",
                                    borderRadius: 6,
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                            >
                                {product.brand}
                            </span>
                        )}
                        <span
                            style={{
                                background: inStock ? "#ecfdf5" : "#fef2f2",
                                color: inStock ? "#065f46" : "#991b1b",
                                padding: "4px 10px",
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: inStock ? "#10b981" : "#ef4444",
                                }}
                            />
                            {inStock ? `${product.stock ?? 0} in stock` : "Out of stock"}
                        </span>
                    </div>
                    <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.5px" }}>
                        {product.name}
                    </h1>
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <Link
                        href={`/products/${product._id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            padding: "9px 16px",
                            borderRadius: 8,
                            border: "1px solid #d1d5db",
                            background: "#fff",
                            color: "#374151",
                            fontSize: 13,
                            fontWeight: 600,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <span>Storefront ↗</span>
                    </Link>

                    <Link
                        href={`/admin/products/${product._id}/edit`}
                        style={{
                            padding: "9px 18px",
                            borderRadius: 8,
                            background: "#f59e0b",
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: 600,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <span>✏️ Edit Product</span>
                    </Link>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        style={{
                            padding: "9px 16px",
                            borderRadius: 8,
                            border: "1px solid #fecaca",
                            background: "#fff",
                            color: "#dc2626",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: deleting ? "not-allowed" : "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <span>🗑️ {deleting ? "Deleting..." : "Delete"}</span>
                    </button>
                </div>
            </div>

            {/* Main Content Layout */}
            <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 28, alignItems: "start" }}>
                {/* Left Column: Media & Pricing Card */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* Image Preview Card */}
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            padding: 20,
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: 320,
                                background: "#f9fafb",
                                borderRadius: 8,
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 14,
                                border: "1px solid #f3f4f6",
                            }}
                        >
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                />
                            ) : (
                                <span style={{ color: "#9ca3af", fontSize: 13 }}>No Image Available</span>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {uniqueImages.length > 1 && (
                            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6 }}>
                                {uniqueImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setSelectedImage(img)}
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 6,
                                            border: selectedImage === img ? "2px solid #2563eb" : "1px solid #e5e7eb",
                                            overflow: "hidden",
                                            padding: 0,
                                            background: "#fff",
                                            cursor: "pointer",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pricing & Inventory Card */}
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            padding: 20,
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 14px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Pricing & Inventory
                        </h3>

                        <div style={{ display: "grid", gap: 14 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ color: "#6b7280", fontSize: 13 }}>Selling Price:</span>
                                <div style={{ textAlign: "right" }}>
                                    <span style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>
                                        ${price.toFixed(2)}
                                    </span>
                                    {hasDiscount && (
                                        <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "flex-end" }}>
                                            <span style={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>
                                                ${product.oldPrice?.toFixed(2)}
                                            </span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", background: "#fef2f2", padding: "1px 6px", borderRadius: 4 }}>
                                                -{discountPercent}% OFF
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={{ height: 1, background: "#f3f4f6" }} />

                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "#6b7280" }}>Stock Available:</span>
                                <span style={{ fontWeight: 600, color: inStock ? "#111827" : "#dc2626" }}>
                                    {product.stock ?? 0} units
                                </span>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "#6b7280" }}>Database ID:</span>
                                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6b7280" }}>
                                    {product._id}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Product Information */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* Description Card */}
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            padding: 24,
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 12px 0" }}>
                            Description
                        </h3>
                        <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>
                            {product.description || "No description provided."}
                        </p>
                    </div>

                    {/* Features Card */}
                    {product.features && product.features.length > 0 && (
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: 12,
                                padding: 24,
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                            }}
                        >
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 14px 0" }}>
                                Key Features ({product.features.length})
                            </h3>
                            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "grid", gap: 10 }}>
                                {product.features.map((feat, i) => (
                                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151" }}>
                                        <span style={{ color: "#10b981", fontWeight: 700, marginTop: 1 }}>✓</span>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Specifications Card */}
                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: 12,
                                padding: 24,
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                            }}
                        >
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 14px 0" }}>
                                Technical Specifications
                            </h3>
                            <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
                                {Object.entries(product.specifications).map(([key, val], idx) => (
                                    <div
                                        key={key}
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "180px 1fr",
                                            padding: "10px 16px",
                                            fontSize: 13,
                                            background: idx % 2 === 0 ? "#f9fafb" : "#fff",
                                            borderBottom: idx === Object.keys(product.specifications || {}).length - 1 ? "none" : "1px solid #f3f4f6",
                                        }}
                                    >
                                        <span style={{ fontWeight: 600, color: "#4b5563" }}>{key}</span>
                                        <span style={{ color: "#111827" }}>{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Device Compatibility */}
                    {product.deviceCompatibility && product.deviceCompatibility.length > 0 && (
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: 12,
                                padding: 24,
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                            }}
                        >
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 14px 0" }}>
                                Device Compatibility ({product.deviceCompatibility.length})
                            </h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {product.deviceCompatibility.map((dev, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            background: "#f3f4f6",
                                            color: "#374151",
                                            padding: "6px 12px",
                                            borderRadius: 99,
                                            fontSize: 13,
                                            fontWeight: 500,
                                        }}
                                    >
                                        📱 {dev}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Filter Tags Card */}
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            padding: 24,
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 14px 0" }}>
                            Category Filters & Attributes
                        </h3>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                            {renderTagGroup("Accessory Types", product.accessoryType)}
                            {renderTagGroup("Cases Filters", product.casesFilter)}
                            {renderTagGroup("Chargers Filters", product.chargersFilter)}
                            {renderTagGroup("Mounts Filters", product.mountsFilter)}
                            {renderTagGroup("Cables Filters", product.cablesFilter)}
                            {renderTagGroup("Screen Protectors", product.screenProtectorsFilter)}
                            {renderTagGroup("General Tags", product.tags)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function renderTagGroup(title: string, tags?: string[]) {
    if (!tags || tags.length === 0) return null;
    return (
        <div style={{ background: "#f9fafb", padding: 12, borderRadius: 8, border: "1px solid #f3f4f6" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 8, letterSpacing: "0.5px" }}>
                {title}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {tags.map((t, idx) => (
                    <span
                        key={idx}
                        style={{
                            background: "#fff",
                            border: "1px solid #e5e7eb",
                            color: "#374151",
                            padding: "3px 8px",
                            borderRadius: 4,
                            fontSize: 12,
                        }}
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
}
