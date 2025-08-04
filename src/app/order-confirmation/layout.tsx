'use client';

import React from 'react';
import { CartProvider } from '@/hooks/useCart';
import Navigation from '@/components/Navigation';

export default function OrderConfirmationLayout({
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
