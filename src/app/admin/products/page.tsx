"use client";

import React, { useEffect, useMemo, useState } from "react";

type Product = {
    _id?: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    newPrice?: number;
    imageUrl: string;
    category: string;
    stock: number;
    features: string[];
    createdAt?: string;
};

const initialForm: Product = {
    name: "",
    description: "",
    price: 0,
    oldPrice: 0,
    newPrice: 0,
    imageUrl: "",
    category: "",
    stock: 0,
    features: [],
};

export default function AdminProductsPage() {
    const [form, setForm] = useState<Product>(initialForm);
    const [featuresText, setFeaturesText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    // Derive features array from text (comma or newline separated)
    const parsedFeatures = useMemo(() => {
        return featuresText
            .split(/\n|,/)
            .map((f) => f.trim())
            .filter(Boolean);
    }, [featuresText]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(data);
            } catch (e: any) {
                console.error(e);
                setError(e.message ?? "Failed to fetch products");
            }
        };
        fetchProducts();
    }, [refreshKey]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (
            name === "price" ||
            name === "stock" ||
            name === "oldPrice" ||
            name === "newPrice"
        ) {
            setForm((prev) => ({ ...prev, [name]: Number(value) }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value } as Product));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const payload = {
                ...form,
                features: parsedFeatures,
                // Keep compatibility: default main price to newPrice if provided
                price: form.newPrice && form.newPrice > 0 ? form.newPrice : form.price,
            };
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.error || "Failed to create product");
            }
            setSuccess("Product created successfully");
            setForm(initialForm);
            setFeaturesText("");
            setRefreshKey((k) => k + 1);
        } catch (e: any) {
            setError(e.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "24px", maxWidth: 1000, margin: "0 auto" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
                Admin • Products
            </h1>

            {/* Alerts */}
            {error && (
                <div
                    style={{
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        color: "#991b1b",
                        padding: "10px 12px",
                        borderRadius: 8,
                        marginBottom: 16,
                    }}
                >
                    {error}
                </div>
            )}
            {success && (
                <div
                    style={{
                        background: "#ecfdf5",
                        border: "1px solid #a7f3d0",
                        color: "#065f46",
                        padding: "10px 12px",
                        borderRadius: 8,
                        marginBottom: 16,
                    }}
                >
                    {success}
                </div>
            )}

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 32,
                }}
            >
                <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Name
                    </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Product name"
                        style={inputStyle}
                    />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        placeholder="Describe the product"
                        rows={4}
                        style={{ ...inputStyle, resize: "vertical" }}
                    />
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        min={0}
                        step={0.01}
                        onChange={handleChange}
                        required
                        placeholder="0.00"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        min={0}
                        step={1}
                        onChange={handleChange}
                        required
                        placeholder="0"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Old Price (MRP)
                    </label>
                    <input
                        type="number"
                        name="oldPrice"
                        value={form.oldPrice ?? 0}
                        min={0}
                        step={0.01}
                        onChange={handleChange}
                        placeholder="0.00"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        New Price (Sale)
                    </label>
                    <input
                        type="number"
                        name="newPrice"
                        value={form.newPrice ?? 0}
                        min={0}
                        step={0.01}
                        onChange={handleChange}
                        placeholder="0.00"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Category
                    </label>
                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Phone Cases"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Image URL
                    </label>
                    <input
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        required
                        placeholder="https://..."
                        style={inputStyle}
                    />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Features (comma or newline separated)
                    </label>
                    <textarea
                        name="features"
                        value={featuresText}
                        onChange={(e) => setFeaturesText(e.target.value)}
                        placeholder="Waterproof, Shockproof, ..."
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical" }}
                    />
                </div>

                <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12 }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: "#111827",
                            color: "#fff",
                            padding: "10px 14px",
                            borderRadius: 8,
                            border: "1px solid #111827",
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "Saving..." : "Add Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setForm(initialForm);
                            setFeaturesText("");
                            setError(null);
                            setSuccess(null);
                        }}
                        style={{
                            background: "#fff",
                            color: "#111827",
                            padding: "10px 14px",
                            borderRadius: 8,
                            border: "1px solid #e5e7eb",
                            cursor: "pointer",
                        }}
                    >
                        Reset
                    </button>
                </div>
            </form>

            {/* List */}
            <section>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                    Existing Products
                </h2>
                {products.length === 0 ? (
                    <p style={{ color: "#6b7280" }}>No products yet.</p>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: 16,
                        }}
                    >
                        {products.map((p) => (
                            <article
                                key={p._id}
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 12,
                                    overflow: "hidden",
                                    background: "#fff",
                                }}
                            >
                                <div style={{ height: 160, overflow: "hidden", background: "#f3f4f6" }}>
                                    {p.imageUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={p.imageUrl}
                                            alt={p.name}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    ) : null}
                                </div>
                                <div style={{ padding: 12 }}>
                                    <div style={{ fontWeight: 700 }}>{p.name}</div>
                                    <div style={{ color: "#6b7280", fontSize: 12 }}>{p.category}</div>
                                    <div style={{ marginTop: 6, fontWeight: 600 }}>
                                        {p.newPrice && p.newPrice > 0 ? (
                                            <>
                                                <span>₹{p.newPrice}</span>
                                                {p.oldPrice && p.oldPrice > 0 && (
                                                    <span style={{ color: "#6b7280", marginLeft: 8, textDecoration: "line-through", fontWeight: 400 }}>
                                                        ₹{p.oldPrice}
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <span>₹{p.price}</span>
                                        )}
                                    </div>
                                    {p.features?.length ? (
                                        <ul style={{ marginTop: 6, color: "#374151", fontSize: 12 }}>
                                            {p.features.slice(0, 3).map((f, idx) => (
                                                <li key={idx}>• {f}</li>
                                            ))}
                                            {p.features.length > 3 && <li>…</li>}
                                        </ul>
                                    ) : null}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "10px 12px",
    outline: "none",
};
