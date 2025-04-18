"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

export default function SellerDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/seller/products")
      .then(res => res.json())
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/seller/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add product");
      setOpen(false);
      setForm({ name: "", price: "", description: "" });
      setProducts(await (await fetch("/api/seller/products")).json());
    } catch {
      setError("Failed to add product");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 6, p: 3, background: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>Seller Dashboard</Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>Add Product</Button>
      <List>
        {loading ? <Typography>Loading...</Typography> : products.length ? products.map((prod: any) => (
          <ListItem key={prod.id}>
            <ListItemText primary={prod.name} secondary={`$${prod.price} | ${prod.description}`} />
          </ListItem>
        )) : <Typography>No products found.</Typography>}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Price" name="price" value={form.price} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" type="submit">Add</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      {error && <Typography color="error.main" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
}
