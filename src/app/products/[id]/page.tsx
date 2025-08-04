'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import './ProductDetail.css';

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <button onClick={() => router.push('/products')} className="back-btn">
          Back to Products
        </button>
      </div>
    );
  }

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
              src={product.image} 
              alt={product.name}
              className="product-detail-image"
            />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <div className="product-price-large">${product.price.toFixed(2)}</div>
            
            <div className="stock-status">
              {product.inStock ? (
                <span className="in-stock">✓ In Stock</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {product.inStock && (
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
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>

                {showSuccess && (
                  <div className="success-message">
                    ✓ Added to cart successfully!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
