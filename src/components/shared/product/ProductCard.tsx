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
  const showPrice = product.newPrice && product.newPrice > 0 ? product.newPrice : product.price;
  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3 className="product-names">{product.name}</h3>
        <p className="product-price">
          ₹{showPrice}
          {product.oldPrice && product.oldPrice > 0 && product.newPrice && product.newPrice > 0 && (
            <span style={{ marginLeft: 8, textDecoration: 'line-through', color: '#6b7280', fontWeight: 400 }}>
              ₹{product.oldPrice}
            </span>
          )}
        </p>

        <Link href={`/products/${product._id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

