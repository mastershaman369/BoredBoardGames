"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Box, Typography, Button } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import { getProduct } from "../../../utils/api";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    getProduct(slug)
      .then(setProduct)
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Container>Loading...</Container>;
  if (error || !product) return <Container>{error || "Product not found"}</Container>;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Button onClick={() => router.back()} sx={{ mb: 2 }}>
        &larr; Back
      </Button>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        <Box component="img" src={product.images[0] ?? "/placeholder.png"} alt={product.name} sx={{ maxWidth: 400, width: "100%", borderRadius: 2 }} />
        <Box>
          <Typography variant="h3">{product.name}</Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, my: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Button variant="contained" onClick={() => addToCart(product)} sx={{ px: 4, py: 1 }}>
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
