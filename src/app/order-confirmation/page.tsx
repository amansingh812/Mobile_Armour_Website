'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Order } from '@/types/product';
import './OrderConfirmation.css';

const OrderConfirmationPage = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  useEffect(() => {
    const orderData = localStorage.getItem('lastOrder');
    if (orderData) {
      setOrder(JSON.parse(orderData));
    } else {
      // If no order data, redirect to products
      router.push('/products');
    }
  }, [router]);

  if (!order) {
    return (
      <div className="order-confirmation-page">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cod':
        return 'Cash on Delivery';
      case 'bank':
        return 'Bank Transfer';
      default:
        return method;
    }
  };

  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="success-header">
            <div className="success-icon">✓</div>
            <h1>Thank You for Your Order!</h1>
            <p>Your order has been successfully placed and is being processed.</p>
          </div>

          <div className="order-details-card">
            <div className="order-header">
              <h2>Order Details</h2>
              <div className="order-meta">
                <div className="order-number">
                  <strong>Order #: {order.id}</strong>
                </div>
                <div className="order-date">
                  {formatDate(order.createdAt)}
                </div>
              </div>
            </div>

            <div className="order-sections">
              <div className="customer-info-section">
                <h3>Customer Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name:</label>
                    <span>{order.customer.fullName}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{order.customer.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone:</label>
                    <span>{order.customer.phone}</span>
                  </div>
                  <div className="info-item full-width">
                    <label>Shipping Address:</label>
                    <span>
                      {order.customer.address.street}<br />
                      {order.customer.address.city}, {order.customer.address.state} {order.customer.address.zipCode}<br />
                      {order.customer.address.country}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Payment Method:</label>
                    <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
                  </div>
                  <div className="info-item">
                    <label>Order Status:</label>
                    <span className="status-badge">{order.status}</span>
                  </div>
                </div>
              </div>

              <div className="order-items-section">
                <h3>Order Summary</h3>
                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="order-item">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="item-image"
                      />
                      <div className="item-details">
                        <h4>{item.product.name}</h4>
                        <p className="item-category">{item.product.category}</p>
                        <div className="item-pricing">
                          <span className="item-price">${item.product.price.toFixed(2)} × {item.quantity}</span>
                          <span className="item-total">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="total-row">
                    <span>Tax:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="total-row final-total">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="next-steps">
            <h3>What's Next?</h3>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Order Processing</h4>
                  <p>We'll process your order within 1-2 business days.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Shipping</h4>
                  <p>Your order will be shipped and you'll receive tracking information.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Delivery</h4>
                  <p>Estimated delivery time is 3-5 business days.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link href="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
            <button 
              onClick={() => window.print()} 
              className="print-order-btn"
            >
              Print Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
