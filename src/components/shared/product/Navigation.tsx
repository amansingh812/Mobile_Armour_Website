'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import CartDrawer from './CartDrawer';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { getItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="main-navigation">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            E-Shop
          </Link>
          
          <div className="nav-links">
            <Link href="/products" className="nav-link">
              Products
            </Link>
            <button 
              className="cart-button"
              onClick={() => setIsCartOpen(true)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                  <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zM7.16 14l.94-2h7.72l.94 2H7.16zM6 6h15l-1.5 9h-13.5l-1.5-9zm16-2H5.21l-.94-2H0v2h2l3.6 7.59-1.35 2.44C3.52 16.37 4.48 18 6 18h14v-2H6.42c-.14 0-.25-.11-.25-.25l.03-.12L7.1 14h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1z" fill="currentColor"/>
                </svg>
                <span>({getItemCount()})</span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default Navigation;
