import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const hasSecondImage = product.images && product.images.length > 1;
  const mainImage = product.images?.[0] || "/images/placeholder.jpg";
  return (
    <div
      style={{
        background: '#fff',
        boxShadow: hovered ? '0 4px 16px rgba(34,34,34,0.08)' : '0 1.5px 6px rgba(34,34,34,0.06)',
        borderRadius: 0,
        border: '1px solid #eee',
        transition: 'box-shadow 0.18s, transform 0.18s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        outline: hovered ? '2px solid #16A085' : 'none',
        transform: hovered ? 'translateY(-2px) scale(1.015)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#f7f7f7' }}>
          <img
            src={
              hovered && hasSecondImage ? product.images[1] : mainImage
            }
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'opacity 0.25s',
            }}
            onError={(e: any) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; }}
          />
        </div>
        <div style={{ padding: 16, paddingBottom: 0 }}>
          <div style={{
            fontWeight: 600,
            fontSize: 18,
            margin: '10px 0 0 0',
            letterSpacing: 0.1,
            color: '#22223B',
            textDecoration: hovered ? 'underline' : 'none',
            transition: 'text-decoration 0.2s',
          }}>{product.name}</div>
          <div style={{
            fontWeight: 500,
            fontSize: 16,
            margin: '6px 0 0 0',
            color: '#16A085',
          }}>
            ${product.price.toFixed(2)}
          </div>
        </div>
      </Link>
      <div style={{ padding: 16, paddingTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => onAddToCart(product)}
          style={{
            background: hovered ? '#22223B' : '#16A085',
            color: '#fff',
            border: 'none',
            borderRadius: 0,
            padding: '8px 20px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: hovered ? '0 2px 8px rgba(34,34,34,0.10)' : 'none',
            transition: 'background 0.15s, box-shadow 0.15s',
            outline: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#22223B')}
          onMouseLeave={e => (e.currentTarget.style.background = '#16A085')}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
