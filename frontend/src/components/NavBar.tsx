"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";

export default function NavBar({ categories }: { categories: any[] }) {
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catDropdown, setCatDropdown] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
  const showDropdown = categories.length > 5;

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      width: "100%",
      background: "#000",
      color: "#FFD600",
      padding: "0 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2.5px 12px rgba(34,34,34,0.10)",
      zIndex: 1200,
      borderBottom: '2px solid #FFD600',
      fontFamily: "inherit"
    }}>
      <div style={{ width: "100%", maxWidth: "var(--max-width)", margin: "0 auto", display: "flex", gap: 32, alignItems: "center", position: 'relative', height: 60 }}>
        <Link href="/" style={{ color: "#FFD600", textDecoration: "none", display: "flex", alignItems: "center", fontWeight: 700, fontSize: 24, height: '100%', letterSpacing: 2 }}>
          <img src="/images/logo.png" alt="Bored Board Games" style={{ height: 40, marginRight: 12, verticalAlign: 'middle' }} />
          Bored Board Games
        </Link>
        <div style={{ display: isMobile ? 'none' : 'flex', gap: 24, alignItems: 'center', flex: 1 }}>
          <Link href="/" style={{ color: "#FFD600", textDecoration: "none", fontWeight: 500, fontSize: 16, padding: '8px 0', transition: 'background 0.13s', borderBottom: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.borderBottom = '#FFD600 2px solid'} onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}>Home</Link>
          <Link href="/contact" style={{ color: "#FFD600", textDecoration: "none", fontWeight: 500, fontSize: 16, padding: '8px 0', transition: 'background 0.13s', borderBottom: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.borderBottom = '#FFD600 2px solid'} onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}>Contact</Link>
          <Link href="/privacy" style={{ color: "#FFD600", textDecoration: "none", fontWeight: 500, fontSize: 16, padding: '8px 0', transition: 'background 0.13s', borderBottom: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.borderBottom = '#FFD600 2px solid'} onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}>Privacy</Link>
          <Link href="/marketplace" style={{ color: "#FFD600", textDecoration: "none", fontWeight: 500, fontSize: 16, padding: '8px 0', transition: 'background 0.13s', borderBottom: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.borderBottom = '#FFD600 2px solid'} onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}>Marketplace</Link>
          <Link href="/community" style={{ color: "#FFD600", textDecoration: "none", fontWeight: 500, fontSize: 16, padding: '8px 0', transition: 'background 0.13s', borderBottom: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.borderBottom = '#FFD600 2px solid'} onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}>Community</Link>
          {showDropdown ? (
            <div style={{ position: 'relative' }} onMouseEnter={() => setCatDropdown(true)} onMouseLeave={() => setCatDropdown(false) }>
              <span style={{ color: "#FFD600", fontWeight: 500, fontSize: 16, cursor: 'pointer', padding: '8px 0', borderBottom: catDropdown ? '#FFD600 2px solid' : '2px solid transparent', transition: 'border-bottom 0.13s' }}>Categories ▾</span>
              {catDropdown && (
                <div style={{ position: 'absolute', top: 32, left: 0, background: '#000', boxShadow: '0 6px 20px rgba(34,34,34,0.10)', border: '1px solid #FFD600', minWidth: 200, zIndex: 10 }}>
                  {categories.map((cat) => (
                    <Link key={cat.slug} href={`/collections/${cat.slug}`} style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 500, fontSize: 16, padding: '10px 18px', borderBottom: '1px solid #333', background: 'none', transition: 'background 0.13s' }} onMouseOver={e => e.currentTarget.style.background = '#333'} onMouseOut={e => e.currentTarget.style.background = 'none'}>{cat.name}</Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                style={{ color: "#FFD600", textDecoration: "none", fontWeight: 500, fontSize: 16, padding: '8px 0', borderBottom: '2px solid transparent', transition: 'border-bottom 0.13s' }}
                onMouseOver={e => e.currentTarget.style.borderBottom = '#FFD600 2px solid'}
                onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}
              >
                {cat.name}
              </Link>
            ))
          )}
        </div>
        <div style={{ display: isMobile ? 'none' : 'flex', gap: 18, alignItems: 'center' }}>
          <Link href="/cart" style={{ color: "#FFD600", textDecoration: "none", fontWeight: 600, fontSize: 16, position: "relative", padding: '8px 0' }}>
            Cart
            <span style={{
              position: "absolute",
              top: -8,
              right: -18,
              background: "#FFD600",
              color: "#000",
              padding: "2px 8px",
              fontSize: 13,
              fontWeight: 700
            }}>{cart.length}</span>
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/admin" style={{ color: "#FFD600", textDecoration: "none", fontWeight: 500, fontSize: 16, padding: '8px 0', borderBottom: '2px solid transparent', transition: 'border-bottom 0.13s' }} onMouseOver={e => e.currentTarget.style.borderBottom = '#FFD600 2px solid'} onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}>Admin</Link>
              <button onClick={logout} style={{ background: "none", border: "none", color: "#FFD600", cursor: "pointer", fontWeight: 500, fontSize: 16, padding: '8px 0', borderBottom: '2px solid transparent', transition: 'border-bottom 0.13s' }} onMouseOver={e => e.currentTarget.style.borderBottom = '#FFD600 2px solid'} onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ color: "#FFD600", textDecoration: "none", fontWeight: 500, fontSize: 16, padding: '8px 0', borderBottom: '2px solid transparent', transition: 'border-bottom 0.13s' }} onMouseOver={e => e.currentTarget.style.borderBottom = '#FFD600 2px solid'} onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}>Login</Link>
              <Link href="/register" style={{ color: "#FFD600", textDecoration: "none", fontWeight: 500, fontSize: 16, padding: '8px 0', borderBottom: '2px solid transparent', transition: 'border-bottom 0.13s' }} onMouseOver={e => e.currentTarget.style.borderBottom = '#FFD600 2px solid'} onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}>Register</Link>
            </>
          )}
        </div>
        {/* Hamburger for mobile */}
        <div style={{ display: isMobile ? 'block' : 'none', marginLeft: 'auto' }}>
          <button aria-label="Open Menu" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <span style={{ display: 'block', width: 28, height: 3, background: '#FFD600', margin: '5px 0' }}></span>
            <span style={{ display: 'block', width: 28, height: 3, background: '#FFD600', margin: '5px 0' }}></span>
            <span style={{ display: 'block', width: 28, height: 3, background: '#FFD600', margin: '5px 0' }}></span>
          </button>
          {menuOpen && (
            <div style={{ position: 'absolute', top: 60, right: 0, background: '#000', boxShadow: '0 8px 28px rgba(34,34,34,0.13)', border: '1px solid #FFD600', minWidth: 220, zIndex: 99, padding: 16 }}>
              <Link href="/" style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 500, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333' }}>Home</Link>
              <Link href="/contact" style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 500, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333' }}>Contact</Link>
              <Link href="/privacy" style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 500, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333' }}>Privacy</Link>
              <Link href="/marketplace" style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 500, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333' }}>Marketplace</Link>
              <Link href="/community" style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 500, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333' }}>Community</Link>
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/collections/${cat.slug}`} style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 500, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333' }}>{cat.name}</Link>
              ))}
              <Link href="/cart" style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 600, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333' }}>Cart</Link>
              {isAuthenticated ? (
                <>
                  <Link href="/admin" style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 500, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333' }}>Admin</Link>
                  <button onClick={logout} style={{ background: "none", border: "none", color: "#FFD600", cursor: "pointer", fontWeight: 500, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333', width: '100%', textAlign: 'left' }}>Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 500, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333' }}>Login</Link>
                  <Link href="/register" style={{ display: 'block', color: '#FFD600', textDecoration: 'none', fontWeight: 500, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #333' }}>Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
