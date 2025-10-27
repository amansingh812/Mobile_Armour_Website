'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Customer } from '@/types/product';
import './Checkout.css';
// Removed Stripe Elements imports since we're using Payment Links

const CheckoutPage = () => {
  const { state, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const [customer, setCustomer] = useState<Customer>({
    fullName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const [paymentMethod, setPaymentMethod] = useState('stripe'); // Default to Stripe payment
  const [isCreatingPaymentLink, setIsCreatingPaymentLink] = useState(false);

  // Removed PaymentIntent initialization since we're using Payment Links

  const handlePaymentLinkRedirect = async () => {
    // Basic client-side checks before creating payment link
    if (state.items.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    
    const allGood = validateForm();
    if (!allGood) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsCreatingPaymentLink(true);

    try {
      // Create payment link
      const response = await fetch('/api/payments/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items.map((item) => ({
            name: item.product.name,
            price: item.product.newPrice && item.product.newPrice > 0 ? item.product.newPrice : item.product.price,
            quantity: item.quantity,
            imageUrl: item.product.imageUrl,
          })),
          customerEmail: customer.email,
          customerName: customer.fullName,
          totalAmount: state.total,
          orderId: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment link');
      }

      // Store customer and order info in localStorage for success page
      const orderData = {
        customer,
        items: state.items,
        total: state.total,
        sessionId: data.sessionId,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));

      // Redirect to Stripe payment page
      window.location.href = data.url;
    } catch (error: any) {
      console.error('Error creating payment link:', error);
      alert(error.message || 'Failed to create payment link. Please try again.');
    } finally {
      setIsCreatingPaymentLink(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setCustomer(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setCustomer(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const validateForm = () => {
    const required = [
      customer.fullName,
      customer.email,
      customer.phone,
      customer.address.street,
      customer.address.city,
      customer.address.state,
      customer.address.zipCode,
      customer.address.country,
    ];

    return required.every(field => field.trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return;
    }

    if (state.items.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items: state.items.map((ci) => ({
            productId: ci.product._id,
            quantity: ci.quantity,
            price: (ci.product.newPrice && ci.product.newPrice > 0 ? ci.product.newPrice : ci.product.price),
          })),
          total: state.total,
          paymentMethod,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create order');
      }

      const data = await res.json();

      const orderData = {
        id: data.id,
        customer,
        items: state.items,
        total: state.total,
        paymentMethod,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      clearCart();
      router.push('/order-confirmation');
    } catch (error: any) {
      alert(error.message || 'Something went wrong while placing your order.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Simple fixed tax calculation (10% of subtotal)
  const TAX_RATE = 0.10;
  const taxAmount = state.total * TAX_RATE;

  if (state.items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h1>Your cart is empty</h1>
            <p>Add some items to your cart before proceeding to checkout.</p>
            <button onClick={() => router.push('/products')} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <button onClick={() => router.back()} className="back-btn">
            ← Back to Cart
          </button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-content">
            <div className="checkout-details">
              <div className="section">
                <h2>Contact Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      value={customer.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      value={customer.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      value={customer.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="section">
                <h2>Shipping Address</h2>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label htmlFor="street">Street Address *</label>
                    <input
                      type="text"
                      id="street"
                      value={customer.address.street}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      value={customer.address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State/Province *</label>
                    <input
                      type="text"
                      id="state"
                      value={customer.address.state}
                      onChange={(e) => handleInputChange('address.state', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP/Postal Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      value={customer.address.zipCode}
                      onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <input
                      type="text"
                      id="country"
                      value={customer.address.country}
                      onChange={(e) => handleInputChange('address.country', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="section">
                <h2>Payment Method</h2>
                <div className="payment-options">
                  <div className="payment-option selected">
                    <span className="payment-label">
                      <strong>Secure Card Payment</strong>
                      <small>Pay by card, Apple Pay, or Google Pay</small>
                    </span>
                    <div className="payment-icons">
                      <i className="las la-credit-card"></i>
                      <i className="lab la-apple-pay"></i>
                      <i className="lab la-google-pay"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>

                <div className="order-items">
                  {state.items.map((item) => (
                    <div key={item.product._id} className="order-item">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="order-item-image"
                      />
                      <div className="order-item-details">
                        <h4>{item.product.name}</h4>
                        <p>Qty: {item.quantity}</p>
                        <p className="item-price">${(((item.product.newPrice && item.product.newPrice > 0 ? item.product.newPrice : item.product.price) * item.quantity)).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-totals">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (10%):</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total:</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                </div>


                <div style={{ marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={handlePaymentLinkRedirect}
                    className="place-order-btn"
                    disabled={isCreatingPaymentLink}
                  >
                    {isCreatingPaymentLink ? 'Creating Payment Link...' : 'Pay & Place Order'}
                  </button>
                  <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem', textAlign: 'center' }}>
                    You will be redirected to Stripe's secure payment page
                  </p>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default CheckoutPage;
