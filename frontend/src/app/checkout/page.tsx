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
  const [paymentMethod, setPaymentMethod] = useState("layaway");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleConfirmOrder = async () => {
    setLoading(true);
    setError("");
    try {
      if (paymentMethod === "layaway") {
        const order = {
          items: cart,
          user_email: email,
          status: "pending_layaway",
        };
        await createLayawayOrder(order);
        clearCart();
        showToast("Layaway order placed!");
        router.push("/");
      } else if (paymentMethod === "credit") {
        // Placeholder: In production, show real card input and call Stripe
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
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Checkout failed");
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
      <div style={{ margin: "18px 0" }}>
        <label htmlFor="payment-method" style={{ fontWeight: 600, marginRight: 12 }}>Payment Method:</label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", width: 160 }}
        >
          <option value="layaway">Layaway</option>
          <option value="credit">Credit Card</option>
        </select>
      </div>
      {paymentMethod === "credit" && (
        <div style={{ margin: "18px 0", color: '#888' }}>
          {/* Placeholder for credit card input */}
          <p>Credit card payment coming soon. (Stripe integration stub)</p>
        </div>
      )}
      <div style={{ display: 'flex', marginTop: 24 }}>
        <button
          onClick={handleConfirmOrder}
          disabled={cart.length === 0 || !email || loading}
          style={{ flex: 1, padding: 12, background: "#1A1A2E", color: "#fff", border: "none", borderRadius: 4, fontWeight: 700, fontSize: 16, cursor: cart.length === 0 || !email || loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </div>
      {error && <p style={{ marginTop: 20, color: "#c0392b" }}>{error}</p>}
    </main>
  );
}
