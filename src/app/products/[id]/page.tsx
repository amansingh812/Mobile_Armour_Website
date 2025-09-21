'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useCart } from '@/hooks/useCart';
import './ProductDetail.css';

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: product, error } = useSWR(id ? `/api/products/${id}` : null, fetcher);

  if (error) {
    return (
      <div className="product-not-found">
        <h2>Failed to load product</h2>
        <button onClick={() => router.push('/products')} className="back-btn">
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Loading...</h2>
        <button onClick={() => router.push('/products')} className="back-btn">
          Back to Products
        </button>
      </div>
    );
  }

  const showPrice: number = product?.newPrice && product.newPrice > 0 ? product.newPrice : product.price;
  const inStock: boolean = typeof product.stock === 'number' ? product.stock > 0 : true;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => router.back()} className="back-btn">
          ← Back
        </button>

        <div className="product-detail-content">
          <div className="product-image-section">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="product-detail-image"
            />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <div className="product-price-large">
              ₹{showPrice}
              {product.oldPrice && product.newPrice && (
                <span style={{ marginLeft: 8, textDecoration: 'line-through', color: '#6b7280', fontWeight: 400 }}>
                  ₹{product.oldPrice}
                </span>
              )}
            </div>
            
            <div className="stock-status">
              {inStock ? (
                <span className="in-stock">✓ In Stock</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {inStock && (
              <div className="purchase-section">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      id="quantity"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      min="1"
                      className="quantity-input"
                    />
                    <button 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="add-to-cart-btn"
                >
                  Add to Cart - ₹{(showPrice * quantity).toFixed(2)}
                </button>

                {showSuccess && (
                  <div className="success-message">
                    ✓ Added to cart successfully!
                  </div>
                )}
              </div>
            )}
            {!!(product.features?.length) && (
              <div style={{ marginTop: 16 }}>
                <h3>Features</h3>
                <ul>
                  {product.features.slice(0, 10).map((f: string, idx: number) => (
                    <li key={idx}>• {f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
