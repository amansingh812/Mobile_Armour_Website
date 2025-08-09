'use client';

import React from 'react';
import Link from 'next/link';
// MongoDB product shape
export type DBProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  newPrice?: number;
  imageUrl: string;
  category: string;
  stock?: number;
  features?: string[];
};

interface ProductCardProps {
  product: DBProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const current = typeof product.newPrice === 'number' && product.newPrice > 0 ? product.newPrice : product.price;
  const old = typeof product.oldPrice === 'number' ? product.oldPrice : undefined;
  const hasDiscount = typeof old === 'number' && old > 0 && old > current;
  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        {hasDiscount && <span className="sale-badge">Sale</span>}
      </div>

      <div className="product-info">
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        <div className="product-price">
          <span className="current-price">₹{current}</span>
          {hasDiscount && (
            <span className="old-price">₹{old}</span>
          )}
        </div>
        <Link href={`/products/${product._id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

