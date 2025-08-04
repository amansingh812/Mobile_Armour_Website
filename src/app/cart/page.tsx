'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import './Cart.css';

const CartPage = () => {
  const { state, updateQuantity, removeItem } = useCart();
  const router = useRouter();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart-page">
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button onClick={() => router.back()} className="back-btn">
            ← Continue Shopping
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Action</span>
            </div>

            {state.items.map((item) => (
              <div key={item.product.id} className="cart-item-row">
                <div className="product-info">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="product-thumbnail"
                  />
                  <div className="product-details">
                    <h3>{item.product.name}</h3>
                    <p className="product-category">{item.product.category}</p>
                  </div>
                </div>

                <div className="price-cell">
                  ${item.product.price.toFixed(2)}
                </div>

                <div className="quantity-cell">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                      min="1"
                      className="quantity-input"
                    />
                    <button 
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="total-cell">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>

                <div className="action-cell">
                  <button 
                    onClick={() => removeItem(item.product.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Items ({state.items.reduce((count, item) => count + item.quantity, 0)}):</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              
              <div className="summary-row total-row">
                <span>Total:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
