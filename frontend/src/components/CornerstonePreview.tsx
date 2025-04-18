"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../utils/api";

// Mock data for preview (replace with real API integration if needed)
const mockUser = { name: "Demo User", loggedIn: true };
const mockCart = { count: 2, total: 129.98 };
const mockProducts = [
  {
    slug: "luxury-wooden-monopoly-board",
    name: "Luxury Wooden Monopoly Board",
    price: 799.99,
    images: [
      "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/monopoly_board.jpg?v=1574351454"
    ]
  },
  {
    slug: "super-rubiks-cube",
    name: "Super Rubik's Cube",
    price: 149.99,
    images: [
      "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/super-rubik-cube-3x3.jpg?v=1574233225"
    ]
  }
];

// Enhanced mock data for mega menu and featured products
const mockMegaMenu: Record<string, { name: string; img: string }[]> = {
  "classic-games": [
    { name: "Chess Set Deluxe", img: "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/chess_set.jpg?v=1574351454" },
    { name: "Classic Checkers", img: "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/checkers.jpg?v=1574351454" }
  ],
  "puzzles": [
    { name: "3D Crystal Puzzle", img: "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/crystal_puzzle.jpg?v=1574351454" },
    { name: "Jigsaw 1000pc", img: "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/jigsaw.jpg?v=1574351454" }
  ],
  "board-games": [
    { name: "Luxury Monopoly", img: "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/monopoly_board.jpg?v=1574351454" },
    { name: "Catan", img: "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/catan.jpg?v=1574351454" }
  ],
  "card-games": [
    { name: "Poker Set", img: "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/poker_set.jpg?v=1574351454" },
    { name: "Uno Deluxe", img: "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/uno.jpg?v=1574351454" }
  ],
  "premium": [
    { name: "Mahjong Masterpiece", img: "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/mahjong.jpg?v=1574351454" },
    { name: "Go Collector's", img: "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/go.jpg?v=1574351454" }
  ]
};

// Demo hero image and best-sellers
const HERO_IMAGE = "https://via.placeholder.com/1200x380?text=Board+Games+Hero";
const bestSellers = mockProducts;

// Site assets
const LOGO_SRC = "https://via.placeholder.com/100x28?text=BBG";
// Category images
const categoryImages: Record<string, string> = {
  "classic-games": "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/chess_set.jpg?v=1574351454",
  "puzzles": "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/crystal_puzzle.jpg?v=1574351454",
  "board-games": "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/monopoly_board.jpg?v=1574351454",
  "card-games": "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/poker_set.jpg?v=1574351454",
  "premium": "https://cdn.shopify.com/s/files/1/0274/0797/4503/products/mahjong.jpg?v=1574351454"
};

// PRIMARY COLOR: Red
const PRIMARY_COLOR = "#E53935";
const HOVER_COLOR = "#B71C1C";

export default function CornerstonePreview() {
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const [spinResult, setSpinResult] = useState<{ product: any; discount: number } | null>(null);
  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);
  const handleSpin = () => {
    const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    const discountOptions = [10, 20, 30];
    const discount = discountOptions[Math.floor(Math.random() * discountOptions.length)];
    setSpinResult({ product: randomProduct, discount });
  };

  // Sticky header shadow effect
  React.useEffect(() => {
    const onScroll = () => setShowTopShadow(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f5f6f7", minHeight: "100vh" }}>
      {/* Sticky Header with Nav & Search */}
      <header style={{ position: "sticky", top: 0, zIndex: 99, background: "#fff", borderBottom: "2px solid #e5e5e5", boxShadow: showTopShadow ? "0 6px 32px rgba(229,57,53,0.09)" : "none", display: "flex", alignItems: "center", height: 70, transition: "box-shadow 0.3s" }}>
        <nav style={{ flex: 1, display: "flex", alignItems: "stretch", marginLeft: 16 }}>
          <div style={{ position: "relative", height: "100%" }} onMouseEnter={() => setExpandedMenu("shop")} onMouseLeave={() => setExpandedMenu(null)}>
            <span style={{ fontWeight: 600, fontSize: 17, padding: "0 24px", display: "flex", alignItems: "center", color: expandedMenu === "shop" ? PRIMARY_COLOR : "#22223B", cursor: "pointer", transition: "color 0.18s" }}>
              SHOP <span style={{ marginLeft: 6, fontSize: 13, color: expandedMenu === "shop" ? PRIMARY_COLOR : "#bbb" }}>▼</span>
            </span>
            {expandedMenu === "shop" && (
              <div style={{ position: "absolute", top: "100%", left: 0, background: "#fff", border: `2px solid ${PRIMARY_COLOR}`, boxShadow: "0 16px 48px rgba(229,57,53,0.13)", borderRadius: 12, padding: "12px 16px", marginTop: 4, zIndex: 100 }}>
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/collections/${cat.slug}`} style={{ display: "block", padding: "6px 12px", color: PRIMARY_COLOR, textDecoration: "none", fontWeight: 600 }}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <span style={{ fontWeight: 600, fontSize: 17, padding: "0 24px", display: "flex", alignItems: "center", color: "#888", cursor: "not-allowed" }}>
            Marketplace (Coming Soon)
          </span>
          <span style={{ fontWeight: 600, fontSize: 17, padding: "0 24px", display: "flex", alignItems: "center", color: "#888", cursor: "not-allowed" }}>
            Community (Coming Soon)
          </span>
        </nav>
        <div style={{ marginRight: 32, marginLeft: 16 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{
              padding: "10px 22px",
              border: `2px solid ${PRIMARY_COLOR}`,
              borderRadius: 5,
              fontSize: 16,
              outline: "none",
              minWidth: 220,
              background: "#fafbfc",
              boxShadow: "0 2px 8px rgba(229,57,53,0.04)",
              transition: "border 0.2s"
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {mockUser.loggedIn ? (
            <span style={{ color: "#222", marginRight: 8 }}>Welcome, {mockUser.name}</span>
          ) : (
            <>
              <Link href="/login" style={{ color: "#222", marginRight: 8, textDecoration: "none" }}>Login</Link>
              <Link href="/register" style={{ color: "#222", marginRight: 8, textDecoration: "none" }}>Register</Link>
            </>
          )}
          <Link href="/cart" style={{ color: PRIMARY_COLOR, textDecoration: "none", display: "flex", alignItems: "center", fontWeight: 700, marginRight: 0 }}>
            <span style={{ marginRight: 6 }}>Cart</span>
            <span style={{ background: PRIMARY_COLOR, color: "#fff", borderRadius: 4, padding: "2px 8px", fontSize: 13, fontWeight: 700, marginRight: 6, transition: "background 0.2s" }}>{mockCart.count}</span>
            <span style={{ fontWeight: 600, color: HOVER_COLOR }}>${mockCart.total.toFixed(2)}</span>
          </Link>
        </div>
      </header>
      {/* Expanded Home Page Content */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 64px 24px" }}>
        {/* Hero Section */}
        <section style={{ position: "relative", margin: "40px 0 56px 0", borderRadius: 18, overflow: "hidden", minHeight: 320, background: `linear-gradient(90deg, #fff 60%, #fdeaea 100%)` }}>
          <img src={HERO_IMAGE} alt="Board Games Hero" style={{ width: "100%", height: 380, objectFit: "cover", opacity: 0.88, filter: "blur(0.5px)", borderRadius: 18 }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: 48 }}>
            <div style={{ background: "rgba(229,57,53,0.93)", color: "#fff", fontWeight: 900, fontSize: 40, padding: "20px 48px 14px 24px", borderRadius: 10, boxShadow: "0 4px 32px rgba(229,57,53,0.13)", letterSpacing: 1, marginBottom: 18 }}>Unleash Game Night!</div>
            <div style={{ background: "rgba(255,255,255,0.93)", color: PRIMARY_COLOR, fontWeight: 600, fontSize: 22, padding: "10px 24px", borderRadius: 8, boxShadow: "0 2px 12px rgba(229,57,53,0.11)", marginBottom: 8 }}>Discover, play, and connect with the best board games.</div>
            <button style={{ marginTop: 18, background: PRIMARY_COLOR, color: "#fff", border: "none", borderRadius: 8, padding: "14px 36px", fontWeight: 800, fontSize: 19, boxShadow: "0 2px 8px rgba(229,57,53,0.13)", cursor: "pointer", transition: "background 0.18s" }}>Shop Now</button>
          </div>
        </section>
        {/* Featured Categories Section */}
        <section style={{ margin: "0 0 40px 0" }}>
          <div style={{ fontWeight: 800, fontSize: 27, color: "#22223B", marginBottom: 18, marginLeft: 6 }}>Featured Categories</div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "flex-start" }}>
            {categories.map(cat => (
              <div key={cat.slug} 
                style={{
                  background: "#fff", 
                  border: `2px solid ${PRIMARY_COLOR}`, 
                  borderRadius: 14, 
                  boxShadow: "0 2px 8px rgba(229,57,53,0.06)", 
                  padding: "22px 38px", 
                  fontWeight: 700, 
                  fontSize: 19, 
                  color: PRIMARY_COLOR, 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 10, 
                  cursor: "pointer", 
                  transition: "box-shadow 0.2s, border 0.2s, transform 0.18s", 
                  marginBottom: 18, 
                  minWidth: 180, 
                  justifyContent: "center", 
                  position: "relative"
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(229,57,53,0.13)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(229,57,53,0.06)")}
              >
                <img
                  src={categoryImages[cat.slug]}
                  alt={cat.name}
                  style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, marginBottom: 8 }}
                />
                <div style={{ fontWeight: 700, fontSize: 19, color: PRIMARY_COLOR }}>{cat.name}</div>
              </div>
            ))}
          </div>
        </section>
        {/* Best Sellers Carousel */}
        <section style={{ margin: "0 0 54px 0" }}>
          <div style={{ fontWeight: 800, fontSize: 27, color: "#22223B", marginBottom: 18, marginLeft: 6 }}>Best Sellers</div>
          <div style={{ display: "flex", gap: 38, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "thin" }}>
            {bestSellers.map(product => (
              <div key={product.slug} 
                style={{
                  background: "#fff", 
                  border: `2.5px solid ${PRIMARY_COLOR}`, 
                  borderRadius: 13, 
                  minWidth: 260, 
                  maxWidth: 270, 
                  boxShadow: "0 2px 8px rgba(229,57,53,0.10)", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  transition: "box-shadow 0.2s, border 0.2s, transform 0.18s", 
                  cursor: "pointer", 
                  position: "relative"
                }}
              >
                <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10, marginBottom: 14, marginTop: 12 }} />
                <div style={{ fontWeight: 800, fontSize: 18, color: "#22223B", marginBottom: 6 }}>{product.name}</div>
                <div style={{ fontWeight: 700, fontSize: 17, color: PRIMARY_COLOR, marginBottom: 18 }}>${product.price.toFixed(2)}</div>
                <button style={{ background: PRIMARY_COLOR, color: "#fff", border: "none", borderRadius: 7, padding: "10px 22px", fontWeight: 700, fontSize: 15, cursor: "pointer", marginBottom: 14, transition: "background 0.18s" }}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
        {/* Interactive Game Section */}
        <section style={{ margin: "0 0 54px 0" }}>
          <div style={{ fontWeight: 800, fontSize: 27, color: "#22223B", marginBottom: 18, marginLeft: 6 }}>Spin the Wheel for a Game!</div>
          <div style={{ display: "flex", alignItems: "center", gap: 32, minHeight: 140 }}>
            <div style={{
              background: "#fff", 
              border: `2px solid ${PRIMARY_COLOR}`, 
              borderRadius: "50%", 
              width: 120, 
              height: 120, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: 38, 
              fontWeight: 900, 
              color: PRIMARY_COLOR, 
              boxShadow: "0 2px 8px rgba(229,57,53,0.08)", 
              cursor: "pointer", 
              transition: "box-shadow 0.2s, border 0.2s, transform 0.18s", 
              userSelect: "none"
            }} onClick={handleSpin}>🎡</div>
            <div style={{ fontWeight: 700, fontSize: 19, color: "#22223B" }}>Try your luck! Spin the wheel and get a random board game suggestion.</div>
          </div>
        </section>
        {spinResult && (
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 24 }}>
            <img
              src={spinResult.product.images[0]}
              alt={spinResult.product.name}
              style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }}
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: 20, color: "#22223B" }}>
                {spinResult.product.name}
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: PRIMARY_COLOR, margin: "8px 0" }}>
                Discount: {spinResult.discount}% off
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <Link href={`/products/${spinResult.product.slug}`}>
                  <button style={{ background: "#fff", color: PRIMARY_COLOR, border: `2px solid ${PRIMARY_COLOR}`, borderRadius: 6, padding: "10px 20px", fontWeight: 600, cursor: "pointer" }}>
                    View Product
                  </button>
                </Link>
                <button
                  onClick={() => alert(`🛒 Added "${spinResult.product.name}" with ${spinResult.discount}% off!`)}
                  style={{ background: PRIMARY_COLOR, color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: 600, cursor: "pointer" }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Product Grid (existing) */}
        <section style={{ margin: "0 0 54px 0" }}>
          <div style={{ fontWeight: 800, fontSize: 27, color: "#22223B", marginBottom: 18, marginLeft: 6 }}>All Products</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 36 }}>
            {mockProducts.map((product) => (
              <div
                key={product.slug}
                style={{
                  background: "#fff",
                  border: `2.5px solid ${hovered === product.slug ? PRIMARY_COLOR : "#e5e5e5"}`,
                  boxShadow: hovered === product.slug ? "0 16px 48px rgba(229,57,53,0.17)" : "0 2px 8px rgba(34,34,34,0.05)",
                  borderRadius: 13,
                  transition: "box-shadow 0.22s, border 0.22s, transform 0.18s",
                  cursor: "pointer",
                  transform: hovered === product.slug ? "translateY(-5px) scale(1.025)" : "none",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column"
                }}
                onMouseEnter={() => setHovered(product.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link href={`/products/${product.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ width: "100%", aspectRatio: "1/1", background: "#f6f6f6", position: "relative", overflow: "hidden" }}>
                    <img
                      src={hovered === product.slug && product.images[1] ? product.images[1] : product.images[0]}
                      alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.25s, transform 0.3s", transform: hovered === product.slug ? "scale(1.06)" : "scale(1)" }}
                    />
                    {/* Animated badge */}
                    {hovered === product.slug && (
                      <div style={{
                        position: "absolute", 
                        top: 16, 
                        right: 16, 
                        background: PRIMARY_COLOR, 
                        color: "#fff", 
                        borderRadius: 8, 
                        padding: "6px 18px", 
                        fontWeight: 800, 
                        fontSize: 14, 
                        boxShadow: "0 2px 8px rgba(229,57,53,0.15)", 
                        letterSpacing: 1, 
                        opacity: 0.98, 
                        animation: "fadeInBadge 0.2s"
                      }}>
                        Hot!
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "22px 22px 0 22px" }}>
                    <div style={{ fontWeight: 800, fontSize: 20, margin: "12px 0 0 0", color: "#22223B", textDecoration: hovered === product.slug ? "underline" : "none", transition: "text-decoration 0.2s" }}>{product.name}</div>
                    <div style={{ fontWeight: 700, fontSize: 18, margin: "10px 0 0 0", color: PRIMARY_COLOR }}>${product.price.toFixed(2)}</div>
                  </div>
                </Link>
                <div style={{ padding: "22px 22px 22px 22px", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    style={{
                      background: hovered === product.slug ? HOVER_COLOR : PRIMARY_COLOR,
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "12px 28px",
                      fontWeight: 800,
                      fontSize: 17,
                      cursor: "pointer",
                      boxShadow: hovered === product.slug ? "0 2px 8px rgba(229,57,53,0.16)" : "none",
                      transition: "background 0.17s, box-shadow 0.17s, transform 0.13s",
                      transform: hovered === product.slug ? "scale(1.05)" : "none"
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeInMenu {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInBadge {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 0.98; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
