"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { categories } from "@/data/categories";
import { ALL_FILTER_OPTIONS } from "@/data/filterOptions";

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

    // Check if user is admin and redirect if not
    useEffect(() => {
        if (status === "loading") return; // Still loading

        if (!session?.user) {
            router.push("/account/login");
            return;
        }

        if (session.user.email !== 'dromperfectly125@gmail.com') {
            router.push("/");
            return;
        }
    }, [session, status, router]);

    // Don't render anything until auth is checked
    if (status === "loading") {
        return (
            <div style={{ padding: "24px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
                <p>Loading...</p>
            </div>
        );
    }

    // Don't render if not admin
    if (!session?.user || session.user.email !== 'dromperfectly125@gmail.com') {
        return null;
    }

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
                                    {p.features?.length ? (
                                        <ul style={{ marginTop: 6, color: "#374151", fontSize: 12 }}>
                                            {p.features.slice(0, 3).map((f, idx) => (
                                                <li key={idx}>• {f}</li>
                                            ))}
                                            {p.features.length > 3 && <li>…</li>}
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
