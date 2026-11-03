"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { categories } from "@/data/categories";
import { Product, isAdminEmail, getProductPrice, inputStyle } from "@/components/admin/types";

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "stock-asc" | "stock-desc" | "date-newest" | "date-oldest";
type ViewMode = "grouped" | "table";

export default function AdminProductsPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Filtering & sorting
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("name-asc");
    const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<ViewMode>("grouped");

    // Auth guard
    useEffect(() => {
        if (status === "loading") return;
        if (!session?.user) { router.push("/account/login"); return; }
        if (!isAdminEmail(session.user.email)) { router.push("/"); return; }
    }, [session, status, router]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/products?full=1", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch products");
                setProducts(await res.json());
            } catch (e: any) {
                setError(e.message ?? "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        if (status !== "loading" && session?.user && isAdminEmail(session.user.email)) {
            fetchProducts();
        }
    }, [status, session]);

    // Delete handler
    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete product");
            setProducts((prev) => prev.filter((p) => p._id !== id));
            setSuccess("Product deleted successfully");
            setTimeout(() => setSuccess(null), 3000);
        } catch (e: any) {
            setError(e.message);
        }
    };

    // Filtered & sorted
    const filteredProducts = useMemo(() => {
        let filtered = [...products];
        if (selectedCategory !== "all") filtered = filtered.filter((p) => p.category === selectedCategory);
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.brand?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            );
        }
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name-asc": return a.name.localeCompare(b.name);
                case "name-desc": return b.name.localeCompare(a.name);
                case "price-asc": return getProductPrice(a) - getProductPrice(b);
                case "price-desc": return getProductPrice(b) - getProductPrice(a);
                case "stock-asc": return a.stock - b.stock;
                case "stock-desc": return b.stock - a.stock;
                case "date-newest": return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                case "date-oldest": return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
                default: return 0;
            }
        });
        return filtered;
    }, [products, selectedCategory, searchQuery, sortBy]);

    // Grouped by category
    const groupedProducts = useMemo(() => {
        const groups: Record<string, Product[]> = {};
        filteredProducts.forEach((p) => {
            const cat = p.category || "Uncategorized";
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(p);
        });
        const order = categories.map((c) => c.name);
        return Object.keys(groups)
            .sort((a, b) => {
                const iA = order.indexOf(a), iB = order.indexOf(b);
                if (iA !== -1 && iB !== -1) return iA - iB;
                if (iA !== -1) return -1;
                if (iB !== -1) return 1;
                return a.localeCompare(b);
            })
            .map((key) => ({ category: key, products: groups[key] }));
    }, [filteredProducts]);

    // Category counts
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        products.forEach((p) => {
            const cat = p.category || "Uncategorized";
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    }, [products]);

    // Collapse helpers
    const toggleCollapse = (cat: string) => {
        setCollapsedCategories((prev) => {
            const next = new Set(prev);
            next.has(cat) ? next.delete(cat) : next.add(cat);
            return next;
        });
    };
    const collapseAll = () => setCollapsedCategories(new Set(groupedProducts.map((g) => g.category)));
    const expandAll = () => setCollapsedCategories(new Set());

    // Stats
    const totalValue = products.reduce((sum, p) => sum + getProductPrice(p), 0);
    const outOfStock = products.filter((p) => p.stock <= 0).length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

    if (status === "loading" || !session?.user || !isAdminEmail(session.user.email)) {
        return null;
    }

    return (
        <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Page Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, color: "#111827" }}>Products</h1>
                    <p style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>Manage your product catalog</p>
                </div>
                <Link
                    href="/admin/products/add"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#111827",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: 8,
                        textDecoration: "none",
                        fontSize: 14,
                        fontWeight: 600,
                        transition: "background 0.15s",
                    }}
                >
                    ＋ Add Product
                </Link>
            </div>

            {/* Alerts */}
            {success && (
                <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
                    ✓ {success}
                </div>
            )}
            {error && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
                    {error}
                </div>
            )}

            {/* Stats Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
                <StatCard label="Total Products" value={products.length} icon="📦" color="#3b82f6" />
                <StatCard label="Categories" value={Object.keys(categoryCounts).length} icon="📂" color="#8b5cf6" />
                <StatCard label="Total Stock" value={totalStock} icon="📊" color="#10b981" />
                <StatCard label="Out of Stock" value={outOfStock} icon="⚠️" color={outOfStock > 0 ? "#ef4444" : "#6b7280"} />
                <StatCard label="Total Value" value={`$${totalValue.toFixed(0)}`} icon="💰" color="#f59e0b" />
            </div>

            {/* Toolbar */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                alignItems: "center",
                marginBottom: 20,
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: "12px 16px",
            }}>
                {/* Search */}
                <div style={{ flex: "1 1 220px", minWidth: 180 }}>
                    <input
                        type="text"
                        placeholder="🔍  Search by name, category, brand…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ ...inputStyle, background: "#f9fafb", fontSize: 13 }}
                    />
                </div>

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ ...inputStyle, width: "auto", minWidth: 170, fontSize: 13, cursor: "pointer", background: "#f9fafb" }}
                >
                    <option value="all">All Categories ({products.length})</option>
                    {categories.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                            {cat.name} ({categoryCounts[cat.name] || 0})
                        </option>
                    ))}
                    {Object.keys(categoryCounts)
                        .filter((c) => !categories.find((k) => k.name === c))
                        .map((c) => (
                            <option key={c} value={c}>{c} ({categoryCounts[c]})</option>
                        ))}
                </select>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    style={{ ...inputStyle, width: "auto", minWidth: 155, fontSize: 13, cursor: "pointer", background: "#f9fafb" }}
                >
                    <option value="name-asc">Name A → Z</option>
                    <option value="name-desc">Name Z → A</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="stock-asc">Stock: Low → High</option>
                    <option value="stock-desc">Stock: High → Low</option>
                    <option value="date-newest">Newest First</option>
                    <option value="date-oldest">Oldest First</option>
                </select>

                {/* View Toggle */}
                <div style={{ display: "flex", gap: 0 }}>
                    {(["grouped", "table"] as const).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            style={{
                                padding: "8px 14px",
                                border: "1px solid #e5e7eb",
                                borderRadius: mode === "grouped" ? "8px 0 0 8px" : "0 8px 8px 0",
                                borderLeft: mode === "table" ? "none" : undefined,
                                background: viewMode === mode ? "#111827" : "#fff",
                                color: viewMode === mode ? "#fff" : "#374151",
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                        >
                            {mode === "grouped" ? "📂 Grouped" : "📋 Table"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Info + Collapse Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>
                    Showing {filteredProducts.length} of {products.length} products
                </span>
                {viewMode === "grouped" && groupedProducts.length > 1 && (
                    <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={expandAll} style={smallBtnStyle}>▼ Expand All</button>
                        <button onClick={collapseAll} style={smallBtnStyle}>▶ Collapse All</button>
                    </div>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7280" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
                    <p>Loading products...</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredProducts.length === 0 && (
                <div style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    color: "#6b7280",
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px dashed #d1d5db",
                }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                    <p style={{ fontSize: 16, fontWeight: 500 }}>No products found</p>
                    <p style={{ fontSize: 13, marginTop: 4 }}>
                        {searchQuery ? `No results for "${searchQuery}"` : "No products in this category yet."}
                    </p>
                    {(searchQuery || selectedCategory !== "all") && (
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                            style={{ marginTop: 12, padding: "8px 16px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer", fontSize: 13 }}
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            )}

            {/* Table View */}
            {!loading && filteredProducts.length > 0 && viewMode === "table" && (
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                                    <th style={thStyle}>Image</th>
                                    <th style={{ ...thStyle, textAlign: "left" }}>Product</th>
                                    <th style={{ ...thStyle, textAlign: "left" }}>Category</th>
                                    <th style={thStyle}>Price</th>
                                    <th style={thStyle}>Stock</th>
                                    <th style={thStyle}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((p) => (
                                    <tr key={p._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                        <td style={{ ...tdStyle, width: 60 }}>
                                            {p.imageUrl ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={p.imageUrl} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6 }} />
                                            ) : (
                                                <div style={{ width: 44, height: 44, background: "#f3f4f6", borderRadius: 6 }} />
                                            )}
                                        </td>
                                        <td style={{ ...tdStyle, textAlign: "left" }}>
                                            <div style={{ fontWeight: 600, color: "#111827" }}>{p.name}</div>
                                            {p.brand && <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{p.brand}</div>}
                                        </td>
                                        <td style={{ ...tdStyle, textAlign: "left" }}>
                                            <span style={{ background: "#f0f4ff", color: "#3730a3", fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 6 }}>
                                                {p.category}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>
                                            <span style={{ fontWeight: 600 }}>${getProductPrice(p).toFixed(2)}</span>
                                            {p.oldPrice && p.oldPrice > 0 && (
                                                <div style={{ fontSize: 11, color: "#9ca3af", textDecoration: "line-through" }}>${p.oldPrice}</div>
                                            )}
                                        </td>
                                        <td style={tdStyle}>
                                            <span style={{ color: p.stock > 0 ? "#059669" : "#dc2626", fontWeight: 500 }}>
                                                {p.stock > 0 ? p.stock : "Out"}
                                            </span>
                                        </td>
                                        <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                                            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                                                <Link href={`/admin/products/${p._id}`} style={actionBtnStyle("#3b82f6")}>View</Link>
                                                <Link href={`/admin/products/${p._id}/edit`} style={actionBtnStyle("#f59e0b")}>Edit</Link>
                                                <button onClick={() => handleDelete(p._id)} style={{ ...actionBtnStyleBtn("#ef4444"), border: "none" }}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Grouped View */}
            {!loading && filteredProducts.length > 0 && viewMode === "grouped" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {groupedProducts.map(({ category, products: catProducts }) => {
                        const collapsed = collapsedCategories.has(category);
                        return (
                            <div key={category} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCollapse(category)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        padding: "14px 20px",
                                        border: "none",
                                        background: collapsed ? "#f9fafb" : "#f0f4ff",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        transition: "background 0.2s ease",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <span style={{
                                            fontSize: 12,
                                            color: "#6b7280",
                                            display: "inline-block",
                                            transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
                                            transition: "transform 0.2s ease",
                                        }}>▼</span>
                                        <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{category}</span>
                                        <span style={{
                                            background: "#e0e7ff",
                                            color: "#3730a3",
                                            fontSize: 11,
                                            fontWeight: 600,
                                            padding: "2px 8px",
                                            borderRadius: 10,
                                        }}>
                                            {catProducts.length} {catProducts.length === 1 ? "product" : "products"}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: 12, color: "#6b7280" }}>
                                        Total: ${catProducts.reduce((s, p) => s + getProductPrice(p), 0).toFixed(2)}
                                    </span>
                                </button>

                                {/* Products Grid */}
                                {!collapsed && (
                                    <div style={{ padding: 16 }}>
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                                            gap: 14,
                                        }}>
                                            {catProducts.map((p) => (
                                                <article
                                                    key={p._id}
                                                    style={{
                                                        border: "1px solid #e5e7eb",
                                                        borderRadius: 10,
                                                        overflow: "hidden",
                                                        background: "#fff",
                                                        transition: "box-shadow 0.2s ease, transform 0.15s ease",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                                                        e.currentTarget.style.transform = "translateY(-1px)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.boxShadow = "none";
                                                        e.currentTarget.style.transform = "translateY(0)";
                                                    }}
                                                >
                                                    {/* Image */}
                                                    <div style={{ height: 140, overflow: "hidden", background: "#f3f4f6", position: "relative" }}>
                                                        {p.imageUrl ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                        ) : null}
                                                        {p.stock <= 0 && (
                                                            <div style={{
                                                                position: "absolute",
                                                                top: 8,
                                                                right: 8,
                                                                background: "#ef4444",
                                                                color: "#fff",
                                                                fontSize: 10,
                                                                fontWeight: 600,
                                                                padding: "2px 8px",
                                                                borderRadius: 4,
                                                            }}>
                                                                OUT OF STOCK
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Info */}
                                                    <div style={{ padding: "10px 12px" }}>
                                                        <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3, color: "#111827" }}>{p.name}</div>
                                                        {p.brand && (
                                                            <span style={{ display: "inline-block", background: "#f0f4ff", color: "#3b5998", fontSize: 10, fontWeight: 600, padding: "1px 6px", borderRadius: 4, marginTop: 3 }}>
                                                                {p.brand}
                                                            </span>
                                                        )}
                                                        <div style={{ marginTop: 6, fontWeight: 600, fontSize: 14 }}>
                                                            ${getProductPrice(p).toFixed(2)}
                                                            {p.oldPrice && p.oldPrice > 0 && (
                                                                <span style={{ color: "#9ca3af", marginLeft: 6, textDecoration: "line-through", fontWeight: 400, fontSize: 12 }}>
                                                                    ${p.oldPrice}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div style={{ marginTop: 3, fontSize: 11, color: p.stock > 0 ? "#059669" : "#dc2626", fontWeight: 500 }}>
                                                            {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                                                            <Link href={`/admin/products/${p._id}`} style={cardActionStyle("#3b82f6")}>View</Link>
                                                            <Link href={`/admin/products/${p._id}/edit`} style={cardActionStyle("#f59e0b")}>Edit</Link>
                                                            <button onClick={() => handleDelete(p._id)} style={{ ...cardActionStyleBtn("#ef4444"), border: "none" }}>Delete</button>
                                                        </div>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ─── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }: { label: string; value: number | string; icon: string; color: string }) {
    return (
        <div style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
        }}>
            <div style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: color + "14",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
            }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{value}</div>
                <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{label}</div>
            </div>
        </div>
    );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const smallBtnStyle: React.CSSProperties = {
    padding: "5px 10px",
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#374151",
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 500,
};

const thStyle: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: 11,
    fontWeight: 600,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    textAlign: "center",
};

const tdStyle: React.CSSProperties = {
    padding: "10px 12px",
    verticalAlign: "middle",
    textAlign: "center",
};

const actionBtnStyle = (bg: string): React.CSSProperties => ({
    background: bg,
    color: "#fff",
    padding: "4px 10px",
    borderRadius: 5,
    fontSize: 11,
    fontWeight: 500,
    textDecoration: "none",
    display: "inline-block",
});

const actionBtnStyleBtn = (bg: string): React.CSSProperties => ({
    ...actionBtnStyle(bg),
    cursor: "pointer",
});

const cardActionStyle = (bg: string): React.CSSProperties => ({
    background: bg,
    color: "#fff",
    padding: "5px 10px",
    borderRadius: 5,
    fontSize: 11,
    fontWeight: 500,
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center",
});

const cardActionStyleBtn = (bg: string): React.CSSProperties => ({
    ...cardActionStyle(bg),
    cursor: "pointer",
});
