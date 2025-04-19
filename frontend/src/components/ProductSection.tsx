import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
  title: string;
  products: any[];
}

export default function ProductSection({ title, products }: ProductSectionProps) {
  if (!products.length) return null;
  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Grid container spacing={2}>
        {products.map((p: any) => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <ProductCard product={p} onAddToCart={() => {}} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
