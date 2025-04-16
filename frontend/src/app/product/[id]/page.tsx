"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id?: string;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(setProduct)
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>{error || "Product not found"}</div>;

  return (
    <main style={{ maxWidth: 600, margin: "32px auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 12px #eee", padding: 32 }}>
      <button onClick={() => router.back()} style={{ marginBottom: 20, background: "#eee", border: "none", borderRadius: 4, padding: "6px 14px", cursor: "pointer" }}>&larr; Back</button>
      <div style={{ display: "flex", gap: 32 }}>
        <img src={product.image_url} alt={product.name} style={{ width: 220, height: 220, objectFit: "cover", borderRadius: 8 }} />
        <div>
          <h1>{product.name}</h1>
          <p style={{ color: "#555", fontSize: 16 }}>{product.description}</p>
          <div style={{ fontWeight: 700, fontSize: 22, margin: "18px 0" }}>${product.price.toFixed(2)}</div>
          <button onClick={() => addToCart(product)} style={{ padding: "10px 28px", background: "#16A085", color: "#fff", border: "none", borderRadius: 4, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
