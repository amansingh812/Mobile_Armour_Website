'use client';

import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
// import './ProductCard.css';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-names">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        <Link href={`/products/${product.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductList: React.FC = () => {
  const { data: products, error } = useSWR('/api/products', fetcher);

  if (error) return <div>Failed to load products</div>;
  if (!products) return <div>Loading...</div>;

  return (
    <div className="product-list">
      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
