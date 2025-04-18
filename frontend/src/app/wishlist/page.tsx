"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from "@mui/material";

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/wishlist")
      .then(res => res.json())
      .then(setItems)
      .catch(() => setError("Failed to load wishlist"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 6, p: 3, background: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>My Wishlist</Typography>
      {loading ? <CircularProgress /> : (
        <List>
          {items.length ? items.map((item: any) => (
            <ListItem key={item.product_id}>
              <ListItemText primary={`Product ${item.product_id}`} />
            </ListItem>
          )) : <Typography>No wishlist items.</Typography>}
        </List>
      )}
      {error && <Typography color="error.main" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
}
