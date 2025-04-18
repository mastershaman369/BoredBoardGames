"use client";
import React, { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import { Container, Box } from "@mui/material";
import { getProducts, getCategories } from "../utils/api";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    getCategories().then(setCategories);
    getProducts().then(setProducts);
  }, []);

  const handleCategoryChange = (catId: string | null) => {
    setSelectedCategory(catId);
    getProducts(catId || undefined).then(setProducts);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showToast(`Added "${product.name}" to cart!`);
  };

  return (
    <>
      <HeroBanner />
      <Container sx={{ backgroundColor: '#ffffff', mt: 4, mb: 4, p: 4, borderRadius: 2 }} id="products">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={handleCategoryChange}
        />
        <Box component="div" sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        }}>
          {products.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
