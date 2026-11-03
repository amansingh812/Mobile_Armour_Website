// ─── Shared admin types ─────────────────────────────────────────────────────

export type Product = {
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

    // Filter fields
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

export const initialProduct: Product = {
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

// Who can open admin pages. The API routes enforce the real check
// (ADMIN_EMAILS in src/lib/auth.ts); this only decides whether to show the UI.
export const ADMIN_EMAILS = ['dromperfectly125@gmail.com', 'niraj3438@gmail.com'];
export const isAdminEmail = (email?: string | null) =>
    !!email && ADMIN_EMAILS.includes(email.toLowerCase());

export const getProductPrice = (p: Product) =>
    p.newPrice && p.newPrice > 0 ? p.newPrice : p.price;

export const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "10px 12px",
    outline: "none",
    fontSize: 14,
    fontFamily: "inherit",
};
