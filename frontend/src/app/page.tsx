"use client";
import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import useAnalytics from "../../hooks/useAnalytics";

export default function Home() {
  const { track } = useAnalytics();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      track("page_view", { page: "home" });
      isFirstLoad.current = false;
    }
    fetch(`/api/products?limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(prev => offset === 0 ? data : [...prev, ...data]);
          setHasMore(data.length === limit);
        } else {
          setError("Failed to load products.");
        }
      })
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [offset]);

  if (loading && offset === 0) return <Box sx={{ mt: 8, textAlign: "center" }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ mt: 8, textAlign: "center", color: "red" }}>{error}</Box>;
  if (!products.length) return <Box sx={{ mt: 8, textAlign: "center" }}>No products found.</Box>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, p: 3, background: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h2" gutterBottom>Marketplace</Typography>
      {products.map((p: any) => (
        <Box key={p.id} sx={{ mb: 3, p: 2, border: "1px solid #eee", borderRadius: 1, cursor: "pointer" }}
          onClick={() => track("product_click", { productId: p.id })}>
          <Typography variant="h5">{p.name}</Typography>
          <Typography>${p.price}</Typography>
        </Box>
      ))}
      {hasMore && (
        <Button variant="outlined" onClick={() => setOffset(offset + limit)} sx={{ mt: 2 }}>Load More</Button>
      )}
    </Box>
  );
}
