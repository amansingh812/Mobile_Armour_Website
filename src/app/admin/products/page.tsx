"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { categories } from "@/data/categories";
import { ALL_FILTER_OPTIONS } from "@/data/filterOptions";

// Who can open this page. The API routes enforce the real check (ADMIN_EMAILS
// in src/lib/auth.ts); this only decides whether to show the editor.
const ADMIN_EMAILS = ['dromperfectly125@gmail.com', 'niraj3438@gmail.com'];
const isAdminEmail = (email?: string | null) => !!email && ADMIN_EMAILS.includes(email.toLowerCase());

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
    images?: string[];
    
    // New filter fields
    deviceCompatibility: string[];
    brand: string;
    accessoryTypes: string[];
    caseTypes: string[];
    chargerTypes: string[];
    mountTypes: string[];
    cableTypes: string[];
    screenProtectorTypes: string[];
    tags: string[];
    specifications: Record<string, string>;
    
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
    images: [],
    
    // New filter fields
    deviceCompatibility: [],
    brand: "",
    accessoryTypes: [],
    caseTypes: [],
    chargerTypes: [],
    mountTypes: [],
    cableTypes: [],
    screenProtectorTypes: [],
    tags: [],
    specifications: {},
};

// Sort options for the product list
type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc' | 'date-newest' | 'date-oldest';

// View modes for the product list
type ViewMode = 'grouped' | 'flat';

export default function AdminProductsPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [form, setForm] = useState<Product>(initialForm);
    const [featuresText, setFeaturesText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [imagesText, setImagesText] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    
    // State for new filter fields (as text for multi-select)
    const [tagsText, setTagsText] = useState("");
    const [specificationsText, setSpecificationsText] = useState("");

    // ─── Sorting / Filtering / Grouping state ───────────────────────────
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("name-asc");
    const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<ViewMode>("grouped");

    // Check if user is admin and redirect if not
    useEffect(() => {
        if (status === "loading") return; // Still loading

        if (!session?.user) {
            router.push("/account/login");
            return;
        }

        if (!isAdminEmail(session.user.email)) {
            router.push("/");
            return;
        }
    }, [session, status, router]);


    // Derive features array from text (comma or newline separated)
    const parsedFeatures = useMemo(() => {
        return featuresText
            .split(/\n|,/)
            .map((f) => f.trim())
            .filter(Boolean);
    }, [featuresText]);

    const parsedImages = useMemo(() => {
        return imagesText
            .split(/\n|,/)
            .map((u) => u.trim())
            .filter(Boolean);
    }, [imagesText]);

    const parsedTags = useMemo(() => {
        return tagsText
            .split(/\n|,/)
            .map((t) => t.trim())
            .filter(Boolean);
    }, [tagsText]);

    const parsedSpecifications = useMemo(() => {
        const specs: Record<string, string> = {};
        specificationsText
            .split(/\n/)
            .map((line) => line.trim())
            .filter(Boolean)
            .forEach((line) => {
                const [key, ...valueParts] = line.split(':');
                if (key && valueParts.length > 0) {
                    specs[key.trim()] = valueParts.join(':').trim();
                }
            });
        return specs;
    }, [specificationsText]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products?full=1", { cache: "no-store" });
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

    // ─── Filtered, sorted, and grouped products ─────────────────────────
    const getProductPrice = useCallback((p: Product) => {
        return p.newPrice && p.newPrice > 0 ? p.newPrice : p.price;
    }, []);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.brand?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            );
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'price-asc':
                    return getProductPrice(a) - getProductPrice(b);
                case 'price-desc':
                    return getProductPrice(b) - getProductPrice(a);
                case 'stock-asc':
                    return a.stock - b.stock;
                case 'stock-desc':
                    return b.stock - a.stock;
                case 'date-newest':
                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                case 'date-oldest':
                    return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
                default:
                    return 0;
            }
        });

        return filtered;
    }, [products, selectedCategory, searchQuery, sortBy, getProductPrice]);

    // Group products by category (for grouped view)
    const groupedProducts = useMemo(() => {
        const groups: Record<string, Product[]> = {};
        filteredAndSortedProducts.forEach(p => {
            const cat = p.category || "Uncategorized";
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(p);
        });
        // Sort the group keys: known categories first (in order), then unknowns alphabetically
        const categoryOrder = categories.map(c => c.name);
        const sortedKeys = Object.keys(groups).sort((a, b) => {
            const idxA = categoryOrder.indexOf(a);
            const idxB = categoryOrder.indexOf(b);
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return a.localeCompare(b);
        });
        return sortedKeys.map(key => ({ category: key, products: groups[key] }));
    }, [filteredAndSortedProducts]);

    // Category counts for the sidebar/filter
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        products.forEach(p => {
            const cat = p.category || "Uncategorized";
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    }, [products]);

    const toggleCategoryCollapse = (category: string) => {
        setCollapsedCategories(prev => {
            const next = new Set(prev);
            if (next.has(category)) {
                next.delete(category);
            } else {
                next.add(category);
            }
            return next;
        });
    };

    const collapseAll = () => {
        setCollapsedCategories(new Set(groupedProducts.map(g => g.category)));
    };

    const expandAll = () => {
        setCollapsedCategories(new Set());
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (
            name === "price" ||
            name === "stock" ||
            name === "oldPrice" ||
            name === "newPrice"
        ) {
            // For optional prices, treat 0 as empty
            if ((name === 'oldPrice' || name === 'newPrice')) {
                setForm((prev) => ({ ...prev, [name]: value === "" || Number(value) === 0 ? Number.NaN : Number(value) }));
            } else {
                setForm((prev) => ({ ...prev, [name]: value === "" ? Number.NaN : Number(value) }));
            }
        } else {
            setForm((prev) => ({ ...prev, [name]: value } as Product));
        }
    };

    // Clear the field if it's 0 when focused
    const clearIfZero = (name: keyof Pick<Product, 'price' | 'oldPrice' | 'newPrice'>) => () => {
        setForm((prev) => {
            const current = (prev as any)[name] ?? 0;
            return { ...prev, [name]: current === 0 ? Number.NaN : current } as Product;
        });
    };

    // If left empty (NaN), restore based on field: price -> 0, old/new price -> undefined
    const restoreIfEmpty = (name: keyof Pick<Product, 'price' | 'oldPrice' | 'newPrice'>) => () => {
        setForm((prev) => {
            const current = (prev as any)[name];
            if (Number.isNaN(current)) {
                const restored = name === 'price' ? 0 : undefined;
                return { ...prev, [name]: restored } as Product;
            }
            return { ...prev } as Product;
        });
    };

    // Basic client-side validation for required fields
    const validateForm = (): Record<string, string> => {
        const errors: Record<string, string> = {};
        if (!form.name?.trim()) errors.name = "Name is required";
        if (!form.description?.trim()) errors.description = "Description is required";
        if (!form.category?.trim()) errors.category = "Category is required";
        if (!form.brand?.trim()) errors.brand = "Brand is required";
        const mainPrice = form.newPrice && form.newPrice > 0 ? form.newPrice : form.price;
        if (!mainPrice || Number(mainPrice) <= 0) errors.price = "Price must be greater than 0";
        if (form.stock === undefined || form.stock === null || Number(form.stock) < 0) errors.stock = "Stock cannot be negative";
        if (!form.imageUrl?.trim()) {
            errors.imageUrl = "Image URL is required";
        } else if (!/^https?:\/\//i.test(form.imageUrl.trim())) {
            errors.imageUrl = "Image URL must start with http or https";
        }
        return errors;
    };

    const styleFor = (name: string): React.CSSProperties => ({
        ...inputStyle,
        border: fieldErrors[name] ? "1px solid #ef4444" : inputStyle.border,
        background: fieldErrors[name] ? "#fef2f2" : (inputStyle as any).background,
    });

    const errorText = (name: string) => (
        fieldErrors[name] ? (
            <div style={{ color: "#b91c1c", fontSize: 12, marginTop: 6 }}>{fieldErrors[name]}</div>
        ) : null
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        // Run validation before submit
        const clientErrors = validateForm();
        if (Object.keys(clientErrors).length > 0) {
            setFieldErrors(clientErrors);
            setError("Please fix the highlighted fields");
            setLoading(false);
            return;
        }
        setFieldErrors({});
        try {
            const payload: any = {
                ...form,
                features: parsedFeatures,
                tags: parsedTags,
                specifications: parsedSpecifications,
                // Keep compatibility: default main price to newPrice if provided
                price: form.newPrice && form.newPrice > 0 ? form.newPrice : form.price,
            };

            // Only send images if provided (keeps backward compatibility)
            if (parsedImages.length > 0) {
                payload.images = parsedImages;
            } else {
                payload.images = undefined;
            }

            const isEditing = editingId !== null;
            const method = isEditing ? "PUT" : "POST";
            const url = "/api/products";

            if (isEditing) {
                payload._id = editingId;
            }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                // Attempt to infer field errors if backend sends details
                const backendErrors: Record<string, string> = (err && err.fieldErrors) || {};
                // Fallback: rerun client validation to highlight likely fields
                const fallback = Object.keys(backendErrors).length ? backendErrors : validateForm();
                setFieldErrors(fallback);
                throw new Error(err?.error || `Failed to ${isEditing ? 'update' : 'create'} product`);
            }

            setSuccess(`Product ${isEditing ? 'updated' : 'created'} successfully`);
            handleReset();
            setRefreshKey((k) => k + 1);
        } catch (e: any) {
            setError(e.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setForm(product);
        setFeaturesText(product.features?.join('\n') || '');
        setImagesText(product.images?.join('\n') || '');
        setTagsText(product.tags?.join('\n') || '');
        
        // Convert specifications object to text format
        const specsText = Object.entries(product.specifications || {})
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
        setSpecificationsText(specsText);
        
        setEditingId(product._id || null);
        setError(null);
        setSuccess(null);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        const ok = window.confirm('Are you sure you want to delete this product?');
        if (!ok) return;
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.error || 'Failed to delete product');
            }
            setSuccess('Product deleted successfully');
            setRefreshKey((k) => k + 1);
        } catch (e: any) {
            setError(e.message ?? 'Failed to delete product');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setForm(initialForm);
        setFeaturesText("");
        setImagesText("");
        setTagsText("");
        setSpecificationsText("");
        setEditingId(null);
        setError(null);
        setSuccess(null);
    };

    // Auth gates come after every hook above: returning early before a hook
    // changes the hook count between renders and crashes the page.
    // Don't render anything until auth is checked
    if (status === "loading") {
        return (
            <div style={{ padding: "24px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
                <p>Loading...</p>
            </div>
        );
    }

    // Don't render if not admin
    if (!session?.user || !isAdminEmail(session.user.email)) {
        return null;
    }

    // ─── Render a single product card (reused in both views) ────────────
    const renderProductCard = (p: Product) => (
        <article
            key={p._id}
            style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
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
                <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>{p.category}</div>
                {p.brand && (
                    <div style={{
                        display: "inline-block",
                        background: "#f0f4ff",
                        color: "#3b5998",
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: 4,
                        marginTop: 4,
                    }}>
                        {p.brand}
                    </div>
                )}
                <div style={{ marginTop: 6, fontWeight: 600 }}>
                    {p.newPrice && p.newPrice > 0 ? (
                        <>
                            <span>${p.newPrice}</span>
                            {p.oldPrice && p.oldPrice > 0 && (
                                <span style={{ color: "#6b7280", marginLeft: 8, textDecoration: "line-through", fontWeight: 400 }}>
                                    ${p.oldPrice}
                                </span>
                            )}
                        </>
                    ) : (
                        <span>${p.price}</span>
                    )}
                </div>
                <div style={{
                    marginTop: 4,
                    fontSize: 11,
                    color: p.stock > 0 ? "#059669" : "#dc2626",
                    fontWeight: 500,
                }}>
                    {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                </div>
                {p.features?.length ? (
                    <ul style={{ marginTop: 6, color: "#374151", fontSize: 12, paddingLeft: 0, listStyle: "none" }}>
                        {p.features.slice(0, 3).map((f, idx) => (
                            <li key={idx}>• {f}</li>
                        ))}
                        {p.features.length > 3 && <li style={{ color: "#9ca3af" }}>… +{p.features.length - 3} more</li>}
                    </ul>
                ) : null}
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <button
                        onClick={() => handleEdit(p)}
                        style={{
                            background: "#3b82f6",
                            color: "#fff",
                            padding: "6px 12px",
                            borderRadius: 6,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 12,
                            fontWeight: 500,
                        }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(p._id)}
                        style={{
                            background: "#ef4444",
                            color: "#fff",
                            padding: "6px 12px",
                            borderRadius: 6,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 12,
                            fontWeight: 500,
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );

    return (
        <div style={{ padding: "24px", maxWidth: 1000, margin: "0 auto" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
                Admin • Products
            </h1>
            <p style={{ marginTop: -8, marginBottom: 16 }}>
                <a href="/admin/orders" style={{ color: "#1f6feb" }}>View orders →</a>
            </p>

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
                        style={styleFor('name')}
                    />
                    {errorText('name')}
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
                        style={{ ...styleFor('description'), resize: "vertical" }}
                    />
                    {errorText('description')}
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={Number.isNaN(form.price) ? "" : form.price}
                        min={0}
                        step={0.01}
                        onChange={handleChange}
                        onFocus={clearIfZero('price')}
                        onBlur={restoreIfEmpty('price')}
                        required
                        placeholder="0.00"
                        style={styleFor('price')}
                    />
                    {errorText('price')}
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
                        style={styleFor('stock')}
                    />
                    {errorText('stock')}
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Old Price (MRP)
                    </label>
                    <input
                        type="number"
                        name="oldPrice"
                        value={Number.isNaN(form.oldPrice as number) ? "" : (form.oldPrice ?? 0)}
                        onChange={handleChange}
                        onFocus={clearIfZero('oldPrice')}
                        onBlur={restoreIfEmpty('oldPrice')}
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
                        value={Number.isNaN(form.newPrice as number) ? "" : (form.newPrice ?? 0)}
                        onChange={handleChange}
                        onFocus={clearIfZero('newPrice')}
                        onBlur={restoreIfEmpty('newPrice')}
                        placeholder="0.00"
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Category
                    </label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        style={styleFor('category')}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errorText('category')}
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
                        style={styleFor('imageUrl')}
                    />
                    {errorText('imageUrl')}
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Additional Images (one per line or comma separated)
                    </label>
                    <textarea
                        name="images"
                        value={imagesText}
                        onChange={(e) => setImagesText(e.target.value)}
                        placeholder="https://example.com/img1.jpg\nhttps://example.com/img2.jpg"
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical" }}
                    />
                    <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>
                        The first image from this list will be shown as thumbnails along with the main Image URL.
                    </div>
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

                {/* Brand Selection */}
                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Brand
                    </label>
                    <select
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        style={styleFor('brand')}
                    >
                        <option value="">Select a brand</option>
                        {ALL_FILTER_OPTIONS.brand.map((brand) => (
                            <option key={brand.id} value={brand.value}>
                                {brand.label}
                            </option>
                        ))}
                    </select>
                    {errorText('brand')}
                </div>

                {/* Device Compatibility */}
                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Device Compatibility
                    </label>
                    <div style={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                        {ALL_FILTER_OPTIONS.device.map((device) => (
                            <label key={device.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 4, cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.deviceCompatibility.includes(device.value)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setForm(prev => ({
                                            ...prev,
                                            deviceCompatibility: checked
                                                ? [...prev.deviceCompatibility, device.value]
                                                : prev.deviceCompatibility.filter(d => d !== device.value)
                                        }));
                                    }}
                                    style={{ marginRight: 8 }}
                                />
                                <span style={{ fontSize: 14 }}>{device.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Accessory Types */}
                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Accessory Types
                    </label>
                    <div style={{ maxHeight: 120, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                        {ALL_FILTER_OPTIONS.accessory.map((accessory) => (
                            <label key={accessory.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 4, cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.accessoryTypes.includes(accessory.value)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setForm(prev => ({
                                            ...prev,
                                            accessoryTypes: checked
                                                ? [...prev.accessoryTypes, accessory.value]
                                                : prev.accessoryTypes.filter(a => a !== accessory.value)
                                        }));
                                    }}
                                    style={{ marginRight: 8 }}
                                />
                                <span style={{ fontSize: 14 }}>{accessory.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Case Types */}
                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Case Types
                    </label>
                    <div style={{ maxHeight: 120, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                        {ALL_FILTER_OPTIONS.cases.map((caseType) => (
                            <label key={caseType.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 4, cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.caseTypes.includes(caseType.value)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setForm(prev => ({
                                            ...prev,
                                            caseTypes: checked
                                                ? [...prev.caseTypes, caseType.value]
                                                : prev.caseTypes.filter(c => c !== caseType.value)
                                        }));
                                    }}
                                    style={{ marginRight: 8 }}
                                />
                                <span style={{ fontSize: 14 }}>{caseType.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Charger Types */}
                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Charger Types
                    </label>
                    <div style={{ maxHeight: 120, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                        {ALL_FILTER_OPTIONS.chargers.map((charger) => (
                            <label key={charger.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 4, cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.chargerTypes.includes(charger.value)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setForm(prev => ({
                                            ...prev,
                                            chargerTypes: checked
                                                ? [...prev.chargerTypes, charger.value]
                                                : prev.chargerTypes.filter(c => c !== charger.value)
                                        }));
                                    }}
                                    style={{ marginRight: 8 }}
                                />
                                <span style={{ fontSize: 14 }}>{charger.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Mount Types */}
                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Mount Types
                    </label>
                    <div style={{ maxHeight: 120, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                        {ALL_FILTER_OPTIONS.mounts.map((mount) => (
                            <label key={mount.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 4, cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.mountTypes.includes(mount.value)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setForm(prev => ({
                                            ...prev,
                                            mountTypes: checked
                                                ? [...prev.mountTypes, mount.value]
                                                : prev.mountTypes.filter(m => m !== mount.value)
                                        }));
                                    }}
                                    style={{ marginRight: 8 }}
                                />
                                <span style={{ fontSize: 14 }}>{mount.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Cable Types */}
                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Cable Types
                    </label>
                    <div style={{ maxHeight: 120, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                        {ALL_FILTER_OPTIONS.cables.map((cable) => (
                            <label key={cable.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 4, cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.cableTypes.includes(cable.value)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setForm(prev => ({
                                            ...prev,
                                            cableTypes: checked
                                                ? [...prev.cableTypes, cable.value]
                                                : prev.cableTypes.filter(c => c !== cable.value)
                                        }));
                                    }}
                                    style={{ marginRight: 8 }}
                                />
                                <span style={{ fontSize: 14 }}>{cable.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Screen Protector Types */}
                <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Screen Protector Types
                    </label>
                    <div style={{ maxHeight: 120, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                        {ALL_FILTER_OPTIONS.screenProtectors.map((protector) => (
                            <label key={protector.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 4, cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.screenProtectorTypes.includes(protector.value)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setForm(prev => ({
                                            ...prev,
                                            screenProtectorTypes: checked
                                                ? [...prev.screenProtectorTypes, protector.value]
                                                : prev.screenProtectorTypes.filter(s => s !== protector.value)
                                        }));
                                    }}
                                    style={{ marginRight: 8 }}
                                />
                                <span style={{ fontSize: 14 }}>{protector.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Tags (comma or newline separated)
                    </label>
                    <textarea
                        name="tags"
                        value={tagsText}
                        onChange={(e) => setTagsText(e.target.value)}
                        placeholder="premium, bestseller, new-arrival, ..."
                        rows={2}
                        style={{ ...inputStyle, resize: "vertical" }}
                    />
                </div>

                {/* Specifications */}
                <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        Specifications (key: value format, one per line)
                    </label>
                    <textarea
                        name="specifications"
                        value={specificationsText}
                        onChange={(e) => setSpecificationsText(e.target.value)}
                        placeholder="Material: TPU&#10;Weight: 50g&#10;Dimensions: 15x8x1cm"
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical" }}
                    />
                    <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>
                        Format: "Key: Value" on each line. Example: "Material: TPU"
                    </div>
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
                        {loading ? "Saving..." : (editingId ? "Update Product" : "Add Product")}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        style={{
                            background: "#fff",
                            color: "#111827",
                            padding: "10px 14px",
                            borderRadius: 8,
                            border: "1px solid #e5e7eb",
                            cursor: "pointer",
                        }}
                    >
                        {editingId ? "Cancel Edit" : "Reset"}
                    </button>
                </div>
            </form>

            {/* ─── Product List with Sorting & Category Grouping ──────────── */}
            <section>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
                    Existing Products
                    <span style={{ fontWeight: 400, fontSize: 14, color: "#6b7280", marginLeft: 8 }}>
                        ({filteredAndSortedProducts.length} of {products.length})
                    </span>
                </h2>

                {/* ─── Filter / Sort / Search Toolbar ─────────────────────── */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 20,
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: "12px 16px",
                }}>
                    {/* Search */}
                    <div style={{ flex: "1 1 220px", minWidth: 180 }}>
                        <input
                            type="text"
                            placeholder="🔍 Search products by name, category, brand…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                ...inputStyle,
                                background: "#fff",
                                fontSize: 13,
                            }}
                        />
                    </div>

                    {/* Category Filter */}
                    <div style={{ flex: "0 0 auto" }}>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{
                                ...inputStyle,
                                background: "#fff",
                                fontSize: 13,
                                width: "auto",
                                minWidth: 160,
                                cursor: "pointer",
                            }}
                        >
                            <option value="all">All Categories ({products.length})</option>
                            {categories.map((cat) => (
                                <option key={cat.name} value={cat.name}>
                                    {cat.name} ({categoryCounts[cat.name] || 0})
                                </option>
                            ))}
                            {/* Show any categories in data that aren't in the known list */}
                            {Object.keys(categoryCounts)
                                .filter(c => !categories.find(k => k.name === c))
                                .map(c => (
                                    <option key={c} value={c}>
                                        {c} ({categoryCounts[c]})
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Sort */}
                    <div style={{ flex: "0 0 auto" }}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            style={{
                                ...inputStyle,
                                background: "#fff",
                                fontSize: 13,
                                width: "auto",
                                minWidth: 150,
                                cursor: "pointer",
                            }}
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
                    </div>

                    {/* View Mode Toggle */}
                    <div style={{ flex: "0 0 auto", display: "flex", gap: 4 }}>
                        <button
                            onClick={() => setViewMode("grouped")}
                            style={{
                                padding: "8px 12px",
                                borderRadius: "8px 0 0 8px",
                                border: "1px solid #e5e7eb",
                                background: viewMode === "grouped" ? "#111827" : "#fff",
                                color: viewMode === "grouped" ? "#fff" : "#374151",
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                            title="Group by Category"
                        >
                            📂 Grouped
                        </button>
                        <button
                            onClick={() => setViewMode("flat")}
                            style={{
                                padding: "8px 12px",
                                borderRadius: "0 8px 8px 0",
                                border: "1px solid #e5e7eb",
                                borderLeft: "none",
                                background: viewMode === "flat" ? "#111827" : "#fff",
                                color: viewMode === "flat" ? "#fff" : "#374151",
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                            title="Flat List"
                        >
                            📋 Flat
                        </button>
                    </div>
                </div>

                {/* ─── Collapse/Expand All (only in grouped mode) ─────────── */}
                {viewMode === "grouped" && groupedProducts.length > 1 && (
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                        <button
                            onClick={expandAll}
                            style={{
                                padding: "6px 12px",
                                borderRadius: 6,
                                border: "1px solid #e5e7eb",
                                background: "#fff",
                                color: "#374151",
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                        >
                            ▼ Expand All
                        </button>
                        <button
                            onClick={collapseAll}
                            style={{
                                padding: "6px 12px",
                                borderRadius: 6,
                                border: "1px solid #e5e7eb",
                                background: "#fff",
                                color: "#374151",
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                        >
                            ▶ Collapse All
                        </button>
                    </div>
                )}

                {/* ─── Product Display ────────────────────────────────────── */}
                {filteredAndSortedProducts.length === 0 ? (
                    <div style={{
                        textAlign: "center",
                        padding: "40px 20px",
                        color: "#6b7280",
                        background: "#f9fafb",
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
                                style={{
                                    marginTop: 12,
                                    padding: "8px 16px",
                                    borderRadius: 8,
                                    border: "1px solid #e5e7eb",
                                    background: "#fff",
                                    color: "#374151",
                                    cursor: "pointer",
                                    fontSize: 13,
                                }}
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : viewMode === "flat" ? (
                    /* ─── Flat View ───────────────────────────────────────── */
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: 16,
                        }}
                    >
                        {filteredAndSortedProducts.map(renderProductCard)}
                    </div>
                ) : (
                    /* ─── Grouped View ────────────────────────────────────── */
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {groupedProducts.map(({ category, products: catProducts }) => {
                            const isCollapsed = collapsedCategories.has(category);
                            return (
                                <div
                                    key={category}
                                    style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 12,
                                        overflow: "hidden",
                                        background: "#fff",
                                    }}
                                >
                                    {/* Category Header (clickable to collapse/expand) */}
                                    <button
                                        onClick={() => toggleCategoryCollapse(category)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "100%",
                                            padding: "14px 20px",
                                            border: "none",
                                            background: isCollapsed ? "#f9fafb" : "#f0f4ff",
                                            cursor: "pointer",
                                            textAlign: "left",
                                            transition: "background 0.2s ease",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <span style={{
                                                fontSize: 13,
                                                color: "#6b7280",
                                                transition: "transform 0.2s ease",
                                                display: "inline-block",
                                                transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                                            }}>
                                                ▼
                                            </span>
                                            <span style={{
                                                fontSize: 16,
                                                fontWeight: 700,
                                                color: "#111827",
                                            }}>
                                                {category}
                                            </span>
                                            <span style={{
                                                background: "#e0e7ff",
                                                color: "#3730a3",
                                                fontSize: 12,
                                                fontWeight: 600,
                                                padding: "2px 8px",
                                                borderRadius: 10,
                                            }}>
                                                {catProducts.length} {catProducts.length === 1 ? 'product' : 'products'}
                                            </span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <span style={{ fontSize: 12, color: "#6b7280" }}>
                                                Total value: ${catProducts.reduce((sum, p) => sum + getProductPrice(p), 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </button>

                                    {/* Products Grid (collapsible) */}
                                    {!isCollapsed && (
                                        <div style={{ padding: 16 }}>
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                                                    gap: 16,
                                                }}
                                            >
                                                {catProducts.map(renderProductCard)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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
