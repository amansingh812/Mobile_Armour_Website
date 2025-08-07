'use client';

import React from 'react';
import { CartProvider } from '@/hooks/useCart';
import Navigation from '@/components/shared/product/Navigation';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navigation />
      {children}
    </CartProvider>
  );
}
