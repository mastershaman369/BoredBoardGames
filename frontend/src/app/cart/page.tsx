"use client";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (idx: number) => {
    const item = cart[idx];
    removeFromCart(idx);
    showToast(`Removed ${item.name} from cart.`);
  };

  const handleClear = () => {
    clearCart();
    showToast("Cart cleared.");
  };

  return (
    <main style={{ maxWidth: 600, margin: "32px auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 12px #eee", padding: 32 }}>
      <h1>Your Cart</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.length === 0 && <li style={{ color: '#888', margin: '24px 0' }}>Your cart is empty.</li>}
        {cart.map((item, idx) => (
          <li key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: "10px 0" }}>
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>
            <button onClick={() => handleRemove(idx)} style={{ marginLeft: 8, background: "#E67E22", color: "#fff", border: "none", borderRadius: 4, padding: "2px 8px", cursor: "pointer" }}>Remove</button>
          </li>
        ))}
      </ul>
      <div style={{ margin: "24px 0", fontWeight: 700 }}>Total: ${total.toFixed(2)}</div>
      <div style={{ display: 'flex', gap: 16 }}>
        <button onClick={() => router.push("/")} style={{ background: "#eee", color: "#333", border: "none", borderRadius: 4, padding: "8px 18px", fontWeight: 600, cursor: "pointer" }}>
          Continue Shopping
        </button>
        <button onClick={handleClear} disabled={cart.length === 0} style={{ background: "#c0392b", color: "#fff", border: "none", borderRadius: 4, padding: "8px 18px", fontWeight: 600, cursor: cart.length === 0 ? 'not-allowed' : 'pointer' }}>
          Clear Cart
        </button>
        <button onClick={() => router.push("/checkout")} disabled={cart.length === 0} style={{ background: "#16A085", color: "#fff", border: "none", borderRadius: 4, padding: "8px 18px", fontWeight: 600, cursor: cart.length === 0 ? 'not-allowed' : 'pointer' }}>
          Checkout
        </button>
      </div>
    </main>
  );
}
