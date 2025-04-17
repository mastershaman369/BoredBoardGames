"use client";
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast("Subscribed!");
      setEmail("");
    }
  };

  return (
    <footer style={{ background: "#22223B", color: "#fff", padding: "20px 0", marginTop: "32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 16 }}>
          <Link href="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link>
          <Link href="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</Link>
          <Link href="/customer-service" style={{ color: "#fff", textDecoration: "none" }}>Customer Service</Link>
          <Link href="/return-policy" style={{ color: "#fff", textDecoration: "none" }}>Return Policy</Link>
          <Link href="/shipping-policy" style={{ color: "#fff", textDecoration: "none" }}>Shipping Policy</Link>
          <Link href="/privacy-policy" style={{ color: "#fff", textDecoration: "none" }}>Privacy Policy</Link>
        </div>
        <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 8, marginTop: "8px" }}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 8, borderRadius: 4, border: "none", minWidth: 200 }}
          />
          <button type="submit" style={{ padding: "8px 16px", background: "#00ADB5", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
            Subscribe
          </button>
        </form>
      </div>
      <div style={{ textAlign: "center", fontSize: 12, marginTop: "12px" }}>
        {new Date().getFullYear()} Bored Board Games. All rights reserved.
      </div>
    </footer>
  );
}
