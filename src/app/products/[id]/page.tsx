'use client';

import React, { useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import './ProductDetail.css';

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: product, error } = useSWR(id ? `/api/products/${id}` : null, fetcher);
  // Zoom state for main image (must be declared before any early returns)
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

  if (error) {
    return (
      <div className="product-not-found">
        <h2>Failed to load product</h2>
        <button onClick={() => router.push('/products')} className="back-btn">
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Loading...</h2>
        <button onClick={() => router.push('/products')} className="back-btn">
          Back to Products
        </button>
      </div>
    );
  }

  const showPrice: number = product?.newPrice && product.newPrice > 0 ? product.newPrice : product.price;
  const inStock: boolean = typeof product.stock === 'number' ? product.stock > 0 : true;
  const imagesSet = new Set<string>([
    ...(product.imageUrl ? [product.imageUrl] : []),
    ...(Array.isArray(product.images) ? product.images.filter(Boolean) : []),
  ]);
  const images: string[] = Array.from(imagesSet);
  const mainImage = images[selectedImageIndex] || images[0];

  

  const handleAddToCart = () => {
    // Require login before adding to cart
    if (!session?.user) {
      const callbackUrl = encodeURIComponent(pathname || '/products');
      router.push(`/account/login?callbackUrl=${callbackUrl}`);
      return;
    }
    addItem(product, quantity);
    // Open the cart drawer globally
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-cart'));
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => router.back()} className="back-btn">
          ← Back
        </button>

        <div className="product-detail-content">
          <div className="product-image-section">
            <div className="product-gallery">
              {/* Main Image - Using Next/Image for automatic optimization */}
              <div
                className="product-image-wrapper"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomStyle({
                    // @ts-ignore: CSS custom props
                    "--ox": `${x}%`,
                    // @ts-ignore
                    "--oy": `${y}%`,
                  } as React.CSSProperties);
                }}
              >
                <Image
                  src={mainImage}
                  alt={`${product.name} - Buy at Mobile Armour Heidelberg`}
                  width={600}
                  height={600}
                  className={`product-detail-image ${isZoomed ? 'zoomed' : ''}`}
                  style={zoomStyle}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="product-thumbs">
                  {images.map((img: string, idx: number) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`${product.name} view ${idx + 1} - Mobile Armour`}
                      width={100}
                      height={100}
                      className={`product-thumb ${idx === selectedImageIndex ? 'active' : ''}`}
                      onClick={() => setSelectedImageIndex(idx)}
                      sizes="100px"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <div className="product-price-large">
              ${showPrice}
              {product.oldPrice && product.newPrice && (
                <span style={{ marginLeft: 8, textDecoration: 'line-through', color: '#6b7280', fontWeight: 400 }}>
                  ${product.oldPrice}
                </span>
              )}
            </div>
            
            <div className="stock-status">
              {inStock ? (
                <span className="in-stock">✓ In Stock</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {inStock && (
              <div className="purchase-section">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      id="quantity"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      min="1"
                      className="quantity-input"
                    />
                    <button 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="add-to-cart-btn"
                  title={!session?.user ? 'Login required to add items' : undefined}
                  aria-label={!session?.user ? 'Login required to add items' : 'Add to Cart'}
                >
                  {!session?.user ? 'Login required to add items' : `Add to Cart - ${(showPrice * quantity).toFixed(2)}`}
                </button>

                {!session?.user && (
                  <div style={{ marginTop: 8, color: '#6b7280', fontSize: 12 }}>
                    You must be logged in to add products to your cart.
                  </div>
                )}

                {showSuccess && (
                  <div className="success-message">
                    ✓ Added to cart successfully!
                  </div>
                )}
              </div>
            )}
            {!!(product.features?.length) && (
              <div style={{ marginTop: 16 }}>
                <h3>Features</h3>
                <ul>
                  {product.features.slice(0, 10).map((f: string, idx: number) => (
                    <li key={idx}>• {f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

