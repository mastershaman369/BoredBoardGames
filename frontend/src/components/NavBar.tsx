"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function NavBar() {
  const { cart } = useCart();
  return (
    <nav style={{
      width: "100%",
      background: "#22223B",
      color: "#fff",
      padding: "14px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 10px #eee",
      marginBottom: 32,
      fontFamily: "inherit"
    }}>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 20 }}>
          Bored Board Games
        </Link>
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 500, fontSize: 16 }}>
          Home
        </Link>
        <Link href="/cart" style={{ color: "#fff", textDecoration: "none", fontWeight: 500, fontSize: 16, position: "relative" }}>
          Cart
          <span style={{
            position: "absolute",
            top: -8,
            right: -18,
            background: "#E07A5F",
            color: "#fff",
            borderRadius: "50%",
            padding: "2px 8px",
            fontSize: 13,
            fontWeight: 700
          }}>{cart.length}</span>
        </Link>
        <Link href="/admin" style={{ color: "#fff", textDecoration: "none", fontWeight: 500, fontSize: 16 }}>
          Admin
        </Link>
      </div>
    </nav>
  );
}
