'use client';

import { useState } from 'react';
import Link from 'next/link';
import AddToCartButton, { type CartProduct } from '@/components/store/AddToCartButton';

export default function BuyBox({
  product,
  price,
  inStock,
}: {
  product: CartProduct;
  price: number;
  inStock: boolean;
}) {
  const [qty, setQty] = useState(1);
  if (!inStock) {
    return (
      <div className="ma-buy">
        <Link href="/contact" className="ma-btn ma-btn--dark ma-add-full">
          Contact us to order
        </Link>
      </div>
    );
  }
  return (
    <div className="ma-buy">
      <div className="ma-qty" role="group" aria-label="Quantity">
        <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>
          −
        </button>
        <span aria-live="polite">{qty}</span>
        <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(20, q + 1))}>
          +
        </button>
      </div>
      <AddToCartButton product={product} quantity={qty} variant="full" label={`Add to cart · $${(price * qty).toFixed(2)}`} />
    </div>
  );
}
