'use client';

import React from 'react';
import Navigation from '@/components/shared/product/Navigation';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
