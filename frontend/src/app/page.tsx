'use client';

import { useEffect, useState } from "react";
import { getProducts, getCategories, createLayawayOrder, createStripeCheckoutSession, getLayawayEnabled } from "../utils/api";
import styles from "./page.module.css";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [layawayEnabled, setLayawayEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    getCategories().then(setCategories);
    fetchProducts();
    getLayawayEnabled().then(setLayawayEnabled);
  }, []);

  const fetchProducts = (categoryId?: string | null) => {
    getProducts(categoryId || undefined).then(setProducts);
  };

  const handleCategoryChange = (catId: string | null) => {
    setSelectedCategory(catId);
    fetchProducts(catId);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast(`Added ${product.name} to cart!`);
  };

  const handleRemoveFromCart = (idx: number) => {
    const item = cart[idx];
    removeFromCart(idx);
    showToast(`Removed ${item.name} from cart.`);
  };

  const handleLayaway = async () => {
    setLoading(true);
    setMessage("");
    try {
      const order = {
        items: cart,
        user_email: "test@example.com", // Replace with real user email in production
        status: "pending_layaway",
      };
      const res = await createLayawayOrder(order);
      setMessage(`Order placed as layaway! Order ID: ${res.order_id}`);
      clearCart();
      showToast("Layaway order placed!");
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Layaway failed");
    }
    setLoading(false);
  };

  const handleStripeCheckout = async () => {
    setLoading(true);
    setMessage("");
    try {
      const line_items = cart.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: { name: product.name },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      }));
      const res = await createStripeCheckoutSession(line_items);
      window.location.href = res.url;
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Stripe checkout failed");
    }
    setLoading(false);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className={styles.main}>
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>Bored Board Games</h1>
      <div style={{ maxWidth: 900, margin: "0 auto 32px", display: "flex", alignItems: "center", gap: 24 }}>
        <label htmlFor="category-select" style={{ fontWeight: 600 }}>Category:</label>
        <select
          id="category-select"
          value={selectedCategory || ""}
          onChange={e => handleCategoryChange(e.target.value || null)}
          style={{ padding: 8, borderRadius: 4 }}
        >
          <option value="">All</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", gap: 48, justifyContent: "center" }}>
        <section>
          <h2>Product Catalog</h2>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {products.map((product) => (
              <div key={product.id} style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8, width: 220, background: "#fff", boxShadow: "0 2px 8px #eee" }}>
                <img src={product.image_url} alt={product.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 4, cursor: "pointer" }} onClick={() => window.location.href = `/product/${product.id}`} />
                <h3 style={{ margin: "12px 0 4px", cursor: "pointer" }} onClick={() => window.location.href = `/product/${product.id}`}>{product.name}</h3>
                <p style={{ fontSize: 14, color: "#444" }}>{product.description}</p>
                <p style={{ fontWeight: 700, margin: "8px 0" }}>${product.price.toFixed(2)}</p>
                <button style={{ width: "100%", padding: 8, background: "#16A085", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }} onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
        <section style={{ minWidth: 320, maxWidth: 400 }}>
          <h2>Cart ({cart.length})</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item, idx) => (
              <li key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: "6px 0" }}>
                <span>
                  {item.name} - ${item.price.toFixed(2)}
                </span>
                <button onClick={() => handleRemoveFromCart(idx)} style={{ marginLeft: 8, background: "#E67E22", color: "#fff", border: "none", borderRadius: 4, padding: "2px 8px", cursor: "pointer" }}>Remove</button>
              </li>
            ))}
          </ul>
          <div style={{ margin: "16px 0", fontWeight: 700 }}>Total: ${total.toFixed(2)}</div>
          {cart.length > 0 && (
            <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
              {layawayEnabled && (
                <button onClick={handleLayaway} disabled={loading} style={{ flex: 1, padding: 10, background: "#1A1A2E", color: "#fff", border: "none", borderRadius: 4, fontWeight: 700, cursor: "pointer" }}>
                  {loading ? "Processing..." : "Checkout with Layaway"}
                </button>
              )}
              <button onClick={handleStripeCheckout} disabled={loading} style={{ flex: 1, padding: 10, background: "#00ADB5", color: "#fff", border: "none", borderRadius: 4, fontWeight: 700, cursor: "pointer" }}>
                {loading ? "Processing..." : "Checkout with Stripe"}
              </button>
            </div>
          )}
          {message && <p style={{ marginTop: 16, color: "green" }}>{message}</p>}
        </section>
      </div>
    </main>
  );
}
