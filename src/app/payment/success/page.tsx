'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderData {
  customer: any;
  items: any[];
  total: number;
  sessionId: string;
  createdAt: string;
}

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    // Get order data from localStorage
    const pendingOrderData = localStorage.getItem('pendingOrder');
    
    if (pendingOrderData) {
      try {
        const orderData = JSON.parse(pendingOrderData);
        
        if (orderData.sessionId === sessionId) {
          setOrder(orderData);
          
          // Clear the cart and pending order data
          localStorage.removeItem('pendingOrder');
          localStorage.removeItem('cart'); // Clear cart after successful payment
          
          // Store order in order history
          const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
          const completedOrder = {
            ...orderData,
            status: 'paid',
            paymentMethod: 'stripe',
            stripeSessionId: sessionId,
          };
          orderHistory.push(completedOrder);
          localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
        } else {
          setError('Session ID mismatch');
        }
      } catch (e) {
        setError('Failed to parse order data');
      }
    } else {
      setError('No pending order found');
    }
    
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="success-page">
        <div className="success-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="success-page">
        <div className="success-container">
          <div className="error-state">
            <div className="error-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2>Error</h2>
            <p>{error || 'Order not found'}</p>
            <Link href="/" className="success-btn">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-content">
          <div className="success-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="success-title">
            Payment Successful!
          </h1>
          <p className="success-message">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>

          <div className="order-summary-card">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-header">
              <div className="customer-info">
                <h3>Customer Information</h3>
                <p className="customer-name">{order.customer.fullName}</p>
                <p className="customer-email">{order.customer.email}</p>
              </div>
              <div className="order-total">
                <h3>Order Total</h3>
                <p className="total-amount">${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="items-section">
              <h3 className="items-title">Items Ordered</h3>
              <div className="items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="item-card">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h4 className="item-name">{item.product.name}</h4>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${((item.product.newPrice && item.product.newPrice > 0 ? item.product.newPrice : item.product.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="success-actions">
            <Link href="/products" className="primary-btn">
              Continue Shopping
            </Link>
            <Link href="/" className="secondary-btn">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
