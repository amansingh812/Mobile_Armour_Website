"use client";

import React, { useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { ALL_FILTER_OPTIONS } from "@/data/filterOptions";
import { Product, initialProduct, inputStyle } from "./types";

interface ProductFormProps {
    /** Initial product data (empty for add, populated for edit) */
    product?: Product;
    /** Called on successful save with the saved product */
    onSave: (product: Product) => void;
    /** Called when user clicks cancel */
    onCancel: () => void;
    /** "add" or "edit" mode */
    mode: "add" | "edit";
}

export default function ProductForm({ product, onSave, onCancel, mode }: ProductFormProps) {
    const [form, setForm] = useState<Product>(product || initialProduct);
    const [featuresText, setFeaturesText] = useState(product?.features?.join("\n") || "");
    const [imagesText, setImagesText] = useState(product?.images?.join("\n") || "");
    const [tagsText, setTagsText] = useState(product?.tags?.join("\n") || "");
    const [specificationsText, setSpecificationsText] = useState(
        Object.entries(product?.specifications || {})
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const parsedFeatures = useMemo(
        () => featuresText.split(/\n|,/).map((f) => f.trim()).filter(Boolean),
        [featuresText]
    );
    const parsedImages = useMemo(
        () => imagesText.split(/\n|,/).map((u) => u.trim()).filter(Boolean),
        [imagesText]
    );
    const parsedTags = useMemo(
        () => tagsText.split(/\n|,/).map((t) => t.trim()).filter(Boolean),
        [tagsText]
    );
    const parsedSpecifications = useMemo(() => {
        const specs: Record<string, string> = {};
        specificationsText.split(/\n/).map((l) => l.trim()).filter(Boolean).forEach((line) => {
            const [key, ...valueParts] = line.split(":");
            if (key && valueParts.length > 0) specs[key.trim()] = valueParts.join(":").trim();
        });
        return specs;
    }, [specificationsText]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "price" || name === "stock" || name === "oldPrice" || name === "newPrice") {
            if (name === "oldPrice" || name === "newPrice") {
                setForm((prev) => ({ ...prev, [name]: value === "" || Number(value) === 0 ? Number.NaN : Number(value) }));
            } else {
                setForm((prev) => ({ ...prev, [name]: value === "" ? Number.NaN : Number(value) }));
            }
        } else {
            setForm((prev) => ({ ...prev, [name]: value } as Product));
        }
    };

    const clearIfZero = (name: "price" | "oldPrice" | "newPrice") => () => {
        setForm((prev) => {
            const current = (prev as any)[name] ?? 0;
            return { ...prev, [name]: current === 0 ? Number.NaN : current } as Product;
        });
    };

    const restoreIfEmpty = (name: "price" | "oldPrice" | "newPrice") => () => {
        setForm((prev) => {
            const current = (prev as any)[name];
            if (Number.isNaN(current)) {
                const restored = name === "price" ? 0 : undefined;
                return { ...prev, [name]: restored } as Product;
            }
            return { ...prev } as Product;
        });
    };

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
        background: fieldErrors[name] ? "#fef2f2" : undefined,
    });

    const errorText = (name: string) =>
        fieldErrors[name] ? (
            <div style={{ color: "#b91c1c", fontSize: 12, marginTop: 6 }}>{fieldErrors[name]}</div>
        ) : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

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
                price: form.newPrice && form.newPrice > 0 ? form.newPrice : form.price,
            };

            if (parsedImages.length > 0) {
                payload.images = parsedImages;
            } else {
                payload.images = undefined;
            }

            const isEditing = mode === "edit";
            const method = isEditing ? "PUT" : "POST";
            const url = "/api/products";

            if (isEditing && form._id) {
                payload._id = form._id;
            }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                const backendErrors: Record<string, string> = err?.fieldErrors || {};
                const fallback = Object.keys(backendErrors).length ? backendErrors : validateForm();
                setFieldErrors(fallback);
                throw new Error(err?.error || `Failed to ${isEditing ? "update" : "create"} product`);
            }

            const saved = await res.json();
            onSave(saved);
        } catch (e: any) {
            setError(e.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const toggleCheckbox = (field: keyof Product, value: string, checked: boolean) => {
        setForm((prev) => {
            const arr = (prev[field] as string[]) || [];
            return {
                ...prev,
                [field]: checked ? [...arr, value] : arr.filter((v) => v !== value),
            } as Product;
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 24,
            }}
        >
            {/* Header */}
            <div style={{ gridColumn: "1 / -1", marginBottom: 4 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
                    {mode === "edit" ? "Edit Product" : "Add New Product"}
                </h2>
                <p style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>
                    {mode === "edit" ? "Update the details below and save." : "Fill in the details to add a new product."}
                </p>
            </div>

            {/* Alerts */}
            {error && (
                <div style={{
                    gridColumn: "1 / -1",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#991b1b",
                    padding: "10px 14px",
                    borderRadius: 8,
                    fontSize: 13,
                }}>
                    {error}
                </div>
            )}

            {/* Name */}
            <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Product name" style={styleFor("name")} />
                {errorText("name")}
            </div>

            {/* Description */}
            <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the product" rows={4} style={{ ...styleFor("description"), resize: "vertical" }} />
                {errorText("description")}
            </div>

            {/* Price */}
            <div>
                <label style={labelStyle}>Price *</label>
                <input type="number" name="price" value={Number.isNaN(form.price) ? "" : form.price} min={0} step={0.01} onChange={handleChange} onFocus={clearIfZero("price")} onBlur={restoreIfEmpty("price")} required placeholder="0.00" style={styleFor("price")} />
                {errorText("price")}
            </div>

            {/* Stock */}
            <div>
                <label style={labelStyle}>Stock *</label>
                <input type="number" name="stock" value={form.stock} min={0} step={1} onChange={handleChange} required placeholder="0" style={styleFor("stock")} />
                {errorText("stock")}
            </div>

            {/* Old Price */}
            <div>
                <label style={labelStyle}>Old Price (MRP)</label>
                <input type="number" name="oldPrice" value={Number.isNaN(form.oldPrice as number) ? "" : (form.oldPrice ?? 0)} onChange={handleChange} onFocus={clearIfZero("oldPrice")} onBlur={restoreIfEmpty("oldPrice")} placeholder="0.00" style={inputStyle} />
            </div>

            {/* New Price */}
            <div>
                <label style={labelStyle}>New Price (Sale)</label>
                <input type="number" name="newPrice" value={Number.isNaN(form.newPrice as number) ? "" : (form.newPrice ?? 0)} onChange={handleChange} onFocus={clearIfZero("newPrice")} onBlur={restoreIfEmpty("newPrice")} placeholder="0.00" style={inputStyle} />
            </div>

            {/* Category */}
            <div>
                <label style={labelStyle}>Category *</label>
                <select name="category" value={form.category} onChange={handleChange} required style={styleFor("category")}>
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
                {errorText("category")}
            </div>

            {/* Brand */}
            <div>
                <label style={labelStyle}>Brand *</label>
                <select name="brand" value={form.brand} onChange={handleChange} style={styleFor("brand")}>
                    <option value="">Select a brand</option>
                    {ALL_FILTER_OPTIONS.brand.map((b) => (
                        <option key={b.id} value={b.value}>{b.label}</option>
                    ))}
                </select>
                {errorText("brand")}
            </div>

            {/* Image URL */}
            <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Image URL *</label>
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required placeholder="https://..." style={styleFor("imageUrl")} />
                {errorText("imageUrl")}
                {form.imageUrl && /^https?:\/\//i.test(form.imageUrl) && (
                    <div style={{ marginTop: 8 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={form.imageUrl} alt="Preview" style={{ height: 80, borderRadius: 8, border: "1px solid #e5e7eb", objectFit: "cover" }} />
                    </div>
                )}
            </div>

            {/* Additional Images */}
            <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Additional Images (one per line or comma separated)</label>
                <textarea name="images" value={imagesText} onChange={(e) => setImagesText(e.target.value)} placeholder={"https://example.com/img1.jpg\nhttps://example.com/img2.jpg"} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>
                    The first image from this list will be shown as thumbnails along with the main Image URL.
                </div>
            </div>

            {/* Features */}
            <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Features (comma or newline separated)</label>
                <textarea name="features" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder="Waterproof, Shockproof, ..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            {/* Device Compatibility */}
            <div>
                <label style={labelStyle}>Device Compatibility</label>
                <div style={checkboxContainerStyle}>
                    {ALL_FILTER_OPTIONS.device.map((d) => (
                        <label key={d.id} style={checkboxLabelStyle}>
                            <input type="checkbox" checked={form.deviceCompatibility.includes(d.value)} onChange={(e) => toggleCheckbox("deviceCompatibility", d.value, e.target.checked)} style={{ marginRight: 8 }} />
                            <span style={{ fontSize: 13 }}>{d.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Accessory Types */}
            <div>
                <label style={labelStyle}>Accessory Types</label>
                <div style={checkboxContainerStyle}>
                    {ALL_FILTER_OPTIONS.accessory.map((a) => (
                        <label key={a.id} style={checkboxLabelStyle}>
                            <input type="checkbox" checked={form.accessoryTypes.includes(a.value)} onChange={(e) => toggleCheckbox("accessoryTypes", a.value, e.target.checked)} style={{ marginRight: 8 }} />
                            <span style={{ fontSize: 13 }}>{a.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Case Types */}
            <div>
                <label style={labelStyle}>Case Types</label>
                <div style={checkboxContainerStyle}>
                    {ALL_FILTER_OPTIONS.cases.map((c) => (
                        <label key={c.id} style={checkboxLabelStyle}>
                            <input type="checkbox" checked={form.caseTypes.includes(c.value)} onChange={(e) => toggleCheckbox("caseTypes", c.value, e.target.checked)} style={{ marginRight: 8 }} />
                            <span style={{ fontSize: 13 }}>{c.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Charger Types */}
            <div>
                <label style={labelStyle}>Charger Types</label>
                <div style={checkboxContainerStyle}>
                    {ALL_FILTER_OPTIONS.chargers.map((ch) => (
                        <label key={ch.id} style={checkboxLabelStyle}>
                            <input type="checkbox" checked={form.chargerTypes.includes(ch.value)} onChange={(e) => toggleCheckbox("chargerTypes", ch.value, e.target.checked)} style={{ marginRight: 8 }} />
                            <span style={{ fontSize: 13 }}>{ch.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Mount Types */}
            <div>
                <label style={labelStyle}>Mount Types</label>
                <div style={checkboxContainerStyle}>
                    {ALL_FILTER_OPTIONS.mounts.map((m) => (
                        <label key={m.id} style={checkboxLabelStyle}>
                            <input type="checkbox" checked={form.mountTypes.includes(m.value)} onChange={(e) => toggleCheckbox("mountTypes", m.value, e.target.checked)} style={{ marginRight: 8 }} />
                            <span style={{ fontSize: 13 }}>{m.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Cable Types */}
            <div>
                <label style={labelStyle}>Cable Types</label>
                <div style={checkboxContainerStyle}>
                    {ALL_FILTER_OPTIONS.cables.map((cb) => (
                        <label key={cb.id} style={checkboxLabelStyle}>
                            <input type="checkbox" checked={form.cableTypes.includes(cb.value)} onChange={(e) => toggleCheckbox("cableTypes", cb.value, e.target.checked)} style={{ marginRight: 8 }} />
                            <span style={{ fontSize: 13 }}>{cb.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Screen Protector Types */}
            <div>
                <label style={labelStyle}>Screen Protector Types</label>
                <div style={checkboxContainerStyle}>
                    {ALL_FILTER_OPTIONS.screenProtectors.map((sp) => (
                        <label key={sp.id} style={checkboxLabelStyle}>
                            <input type="checkbox" checked={form.screenProtectorTypes.includes(sp.value)} onChange={(e) => toggleCheckbox("screenProtectorTypes", sp.value, e.target.checked)} style={{ marginRight: 8 }} />
                            <span style={{ fontSize: 13 }}>{sp.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Tags (comma or newline separated)</label>
                <textarea name="tags" value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="premium, bestseller, new-arrival, ..." rows={2} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            {/* Specifications */}
            <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Specifications (key: value format, one per line)</label>
                <textarea name="specifications" value={specificationsText} onChange={(e) => setSpecificationsText(e.target.value)} placeholder={"Material: TPU\nWeight: 50g\nDimensions: 15x8x1cm"} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>
                    Format: &quot;Key: Value&quot; on each line. Example: &quot;Material: TPU&quot;
                </div>
            </div>

            {/* Actions */}
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, paddingTop: 8 }}>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: "#111827",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: 8,
                        border: "1px solid #111827",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontSize: 14,
                        fontWeight: 600,
                    }}
                >
                    {loading ? "Saving..." : mode === "edit" ? "Update Product" : "Add Product"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        background: "#fff",
                        color: "#374151",
                        padding: "10px 20px",
                        borderRadius: 8,
                        border: "1px solid #e5e7eb",
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: 500,
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 600,
    marginBottom: 6,
    fontSize: 13,
    color: "#374151",
};

const checkboxContainerStyle: React.CSSProperties = {
    maxHeight: 140,
    overflowY: "auto",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 8,
};

const checkboxLabelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginBottom: 4,
    cursor: "pointer",
};
