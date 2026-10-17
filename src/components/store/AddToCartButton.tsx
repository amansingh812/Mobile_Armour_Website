"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";

export type CartProduct = Pick<
  Product,
  "_id" | "name" | "category" | "imageUrl" | "price" | "newPrice" | "oldPrice" | "deviceCompatibility"
>;

export function toCartProduct(p: CartProduct): Product {
  return {
    _id: p._id,
    name: p.name,
    description: "",
    category: p.category,
    imageUrl: p.imageUrl,
    price: p.price,
    newPrice: p.newPrice,
    oldPrice: p.oldPrice,
    deviceCompatibility: p.deviceCompatibility,
  };
}

/** Tells the header to show the "Added to cart" toast. */
export function announceAdded(name: string, count = 1) {
  window.dispatchEvent(new CustomEvent("ma-cart-added", { detail: { name, count } }));
}

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = "icon",
  disabled,
  label,
}: {
  product: CartProduct;
  quantity?: number;
  variant?: "icon" | "full";
  disabled?: boolean;
  label?: string;
}) {
  const { addItem } = useCart();
  const [done, setDone] = useState(false);

  const add = () => {
    addItem(toCartProduct(product), quantity);
    announceAdded(product.name, quantity);
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        className="ma-add-icon"
        onClick={add}
        disabled={disabled}
        aria-label={disabled ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
      >
        {done ? (
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
            <path d="M5 12l5 5 9-10" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M12 5v14M5 12h14" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button type="button" className="ma-btn ma-btn--primary ma-add-full" onClick={add} disabled={disabled}>
      {disabled ? "Out of stock" : done ? "Added to cart ✓" : label || "Add to cart"}
    </button>
  );
}
