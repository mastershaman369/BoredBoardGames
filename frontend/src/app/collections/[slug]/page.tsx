"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Box, Typography, Button } from "@mui/material";
import ProductCard from "../../../components/ProductCard";
import { getProducts, getCategories } from "../../../utils/api";
import { useCart } from "../../../context/CartContext";

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [current, setCurrent] = useState<any>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getCategories().then((cats) => {
      setCategories(cats);
      const cat = cats.find((c: any) => c.slug === slug);
      setCurrent(cat || { slug: "all", name: "All" });
    });
    getProducts().then((all) => {
      if (slug === "all") setProducts(all);
      else setProducts(all.filter((p: any) => p.categories.includes(slug)));
    });
  }, [slug]);

  if (!current) return <Container>Loading...</Container>;

  return (
    <Container sx={{ mt: 4, mb: 4, p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography variant="h4">{current.name}</Typography>
        <Button variant="outlined" href="/collections/all">
          All
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </Box>
    </Container>
  );
}
