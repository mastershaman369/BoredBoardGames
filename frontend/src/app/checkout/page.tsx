"use client";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLayawayOrder, createStripeCheckoutSession } from "../../utils/api";

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleLayaway = async () => {
    setLoading(true);
    setError("");
    try {
      const order = {
        items: cart,
        user_email: email,
        status: "pending_layaway",
      };
      const res = await createLayawayOrder(order);
      clearCart();
      showToast("Layaway order placed!");
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Layaway failed");
    }
    setLoading(false);
  };

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError("");
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
      setError(err.response?.data?.detail || "Stripe checkout failed");
    }
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 600, margin: "32px auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 12px #eee", padding: 32 }}>
      <h1>Checkout</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.length === 0 && <li style={{ color: '#888', margin: '24px 0' }}>Your cart is empty.</li>}
        {cart.map((item, idx) => (
          <li key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: "10px 0" }}>
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>
            <button onClick={() => removeFromCart(idx)} style={{ marginLeft: 8, background: "#E67E22", color: "#fff", border: "none", borderRadius: 4, padding: "2px 8px", cursor: "pointer" }}>Remove</button>
          </li>
        ))}
      </ul>
      <div style={{ margin: "24px 0", fontWeight: 700 }}>Total: ${total.toFixed(2)}</div>
      <div style={{ margin: "18px 0" }}>
        <label htmlFor="email" style={{ fontWeight: 600 }}>Email for order confirmation:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginLeft: 12, padding: 8, borderRadius: 4, border: "1px solid #ccc", width: 220 }}
          placeholder="you@email.com"
        />
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
        <button
          onClick={handleLayaway}
          disabled={cart.length === 0 || !email || loading}
          style={{ flex: 1, padding: 12, background: "#1A1A2E", color: "#fff", border: "none", borderRadius: 4, fontWeight: 700, fontSize: 16, cursor: cart.length === 0 || !email || loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? "Processing..." : "Checkout with Layaway"}
        </button>
        <button
          onClick={handleStripeCheckout}
          disabled={cart.length === 0 || !email || loading}
          style={{ flex: 1, padding: 12, background: "#00ADB5", color: "#fff", border: "none", borderRadius: 4, fontWeight: 700, fontSize: 16, cursor: cart.length === 0 || !email || loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? "Processing..." : "Checkout with Stripe"}
        </button>
      </div>
      {error && <p style={{ marginTop: 20, color: "#c0392b" }}>{error}</p>}
    </main>
  );
}
