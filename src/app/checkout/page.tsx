'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Customer } from '@/types/product';
import './Checkout.css';
import { Elements, PaymentElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { loadStripe, PaymentRequest } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

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

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [initializingPayment, setInitializingPayment] = useState(false);

  useEffect(() => {
    // Initialize PaymentIntent when user selects the Stripe Payment Element option
    const init = async () => {
      if (paymentMethod !== 'apple') {
        setClientSecret(null);
        return;
      }
      try {
        setInitializingPayment(true);
        const res = await fetch('/api/payments/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: Math.round(state.total * 100), currency: 'inr' }),
        });
        const data = await res.json();
        if (!res.ok || !data.clientSecret) {
          throw new Error(data.error || 'Failed to create payment intent');
        }
        setClientSecret(data.clientSecret);
      } catch (e) {
        console.error(e);
        alert('Could not initialize payment. Please try again.');
      } finally {
        setInitializingPayment(false);
      }
    };
    init();
  }, [paymentMethod, state.total]);

  function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [submitting, setSubmitting] = useState(false);
    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
    const [canUsePaymentRequest, setCanUsePaymentRequest] = useState(false);

    // IMPORTANT: currency must match your PaymentIntent currency set on the server.
    // You are displaying INR (₹); ensure your /api/payments/create-intent uses `currency: 'inr'`.
    const CURRENCY = 'inr';

    useEffect(() => {
      let mounted = true;
      const initPR = async () => {
        if (!stripe || !clientSecret) return;
        const pr = stripe.paymentRequest({
          country: 'IN',
          currency: CURRENCY,
          total: {
            label: 'Order Total',
            amount: Math.round(state.total * 100), // smallest currency unit
          },
          requestPayerName: true,
          requestPayerEmail: true,
          requestPayerPhone: true,
        });

        const result = await pr.canMakePayment();
        if (mounted && result) {
          setPaymentRequest(pr);
          setCanUsePaymentRequest(true);

          pr.on('paymentmethod', async (ev) => {
            try {
              // Confirm the PaymentIntent with the payment method from Google Pay / Apple Pay
              const { error, paymentIntent } = await stripe.confirmPayment({
                clientSecret,
                confirmParams: {
                  payment_method: ev.paymentMethod.id,
                },
                redirect: 'if_required',
              });

              if (error) {
                ev.complete('fail');
                throw new Error(error.message || 'Payment failed');
              }

              if (!paymentIntent) {
                ev.complete('fail');
                throw new Error('Payment not completed');
              }

              const okStatuses = ['succeeded', 'processing', 'requires_capture'] as const;
              if (!okStatuses.includes(paymentIntent.status as any)) {
                ev.complete('fail');
                throw new Error(`Payment status: ${paymentIntent.status}`);
              }

              ev.complete('success');

              // Proceed to create order after successful payment
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
                  totalAmount: state.total,
                  payment: {
                    method: 'wallet',
                    status: paymentIntent.status,
                    intentId: paymentIntent.id,
                  },
                }),
              });

              if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error((data as any).error || 'Failed to create order');
              }

              clearCart();
              router.push('/order-success');
            } catch (err: any) {
              console.error(err);
              alert(err.message || 'Payment failed. Please try again.');
            }
          });
        }
      };
      initPR();
      return () => {
        mounted = false;
      };
    }, [stripe, clientSecret, state.total]);

    const onSubmitPayment = async (e?: React.FormEvent | React.MouseEvent) => {
      if (e) e.preventDefault?.();
      if (!stripe || !elements) return;
      // Basic client-side checks before attempting payment
      if (state.items.length === 0) {
        alert('Your cart is empty.');
        return;
      }
      const allGood = validateForm();
      if (!allGood) {
        alert('Please fill in all required fields.');
        return;
      }
      setSubmitting(true);
      try {
        const billingName = (customer.fullName && customer.fullName.trim())
          || (((customer as any)?.firstName && (customer as any)?.lastName)
                ? `${(customer as any).firstName} ${(customer as any).lastName}`.trim()
                : ((customer as any)?.name as string | undefined));

        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            payment_method_data: {
              billing_details: {
                name: billingName,
                email: customer.email,
                phone: customer.phone,
              },
            },
          },
          redirect: 'if_required',
        });

        if (error) {
          throw new Error(error.message || 'Payment failed');
        }
        if (!paymentIntent) {
          throw new Error('Payment not completed');
        }
        const okStatuses = ['succeeded', 'processing', 'requires_capture'] as const;
        if (!okStatuses.includes(paymentIntent.status as any)) {
          throw new Error(`Payment status: ${paymentIntent.status}`);
        }

        // Create order after successful payment
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
            paymentMethod: 'card_wallet',
            paymentIntentId: paymentIntent.id,
          }),
        });
        if (!res.ok) throw new Error('Failed to create order');
        const data = await res.json();
        const orderData = {
          id: data.id,
          customer,
          items: state.items,
          total: state.total,
          paymentMethod: 'card_wallet',
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        // Do NOT clear the cart here — it can trigger a redirect away from checkout before we push.
        // The cart will be cleared on the order confirmation page after loading the order.
        router.push('/order-confirmation');
      } catch (err: any) {
        alert(err.message || 'Payment failed');
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div>
        {/* Google Pay / Apple Pay (Payment Request Button) when supported */}
        {canUsePaymentRequest && paymentRequest ? (
          <div style={{ marginBottom: '12px' }}>
            <PaymentRequestButtonElement
              options={{
                paymentRequest,
                style: {
                  paymentRequestButton: {
                    type: 'default',
                    theme: 'dark',
                    height: '44px',
                  },
                },
              }}
            />
            <div style={{ textAlign: 'center', margin: '8px 0', color: '#666', fontSize: 12 }}>
              Or pay with card
            </div>
          </div>
        ) : null}
        <div style={{ marginTop: '12px', marginBottom: '12px' }}>
          <PaymentElement options={{ layout: 'tabs' }} />
        </div>
        <button
          type="button"
          onClick={onSubmitPayment}
          className="place-order-btn"
          disabled={submitting || !stripe || !elements || !clientSecret}
        >
          {submitting ? 'Processing...' : 'Pay & Place Order'}
        </button>
      </div>
    );
  }

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
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-label">
                      <strong>Cash on Delivery</strong>
                      <small>Pay when you receive your order</small>
                    </span>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="apple"
                      checked={paymentMethod === 'apple'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-label">
                      <strong>Card / Wallets (Apple Pay)</strong>
                      <small>Pay by card or Apple Pay when available</small>
                    </span>
                  </label>
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
                        <p className="item-price">₹{(((item.product.newPrice && item.product.newPrice > 0 ? item.product.newPrice : item.product.price) * item.quantity)).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-totals">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{state.total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total:</span>
                    <span>₹{state.total.toFixed(2)}</span>
                  </div>
                </div>


                <div style={{ marginTop: '1rem' }}>
                  {initializingPayment && !clientSecret && (
                    <div>Preparing payment...</div>
                  )}
                  {
                    clientSecret && (
                      <Elements stripe={stripePromise!} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                        <PaymentForm />
                      </Elements>
                    )
                  }
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
