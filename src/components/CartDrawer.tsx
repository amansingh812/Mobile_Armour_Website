'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import './CartDrawer.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { state, updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-content">
          {state.items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button onClick={onClose} className="continue-shopping-btn">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {state.items.map((item) => (
                  <div key={item.product.id} className="cart-item">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h4>{item.product.name}</h4>
                      <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                      
                      <div className="cart-item-controls">
                        <div className="quantity-controls">
                          <button 
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="item-total">
                        Total: ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Subtotal: ${state.total.toFixed(2)}</strong>
                </div>
                
                <div className="cart-actions">
                  <Link href="/cart" className="view-cart-btn" onClick={onClose}>
                    View Full Cart
                  </Link>
                  <Link href="/checkout" className="checkout-btn" onClick={onClose}>
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
