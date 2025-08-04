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
              Cart ({getItemCount()})
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
