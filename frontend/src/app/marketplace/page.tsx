"use client";
import React, { useState } from "react";
import { Box, Typography, Chip, Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { exampleMarketplaceProducts } from "../../data/exampleMarketplaceProducts";

const categories = [
  { id: "board-games", name: "Board Games" },
  { id: "strategy", name: "Strategy" },
  { id: "family", name: "Family" },
  { id: "classic", name: "Classic" },
  { id: "expansion", name: "Expansion" },
  { id: "cooperative", name: "Cooperative" },
  { id: "campaign", name: "Campaign" },
];

export default function MarketplacePage() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);

  const filtered = exampleMarketplaceProducts.filter(p =>
    (!selectedCat || p.category === selectedCat) &&
    (!condition || p.condition === condition)
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h4" gutterBottom>Marketplace</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Chip
          label="All Categories"
          color={!selectedCat ? "primary" : "default"}
          onClick={() => setSelectedCat(null)}
        />
        {categories.map(cat => (
          <Chip
            key={cat.id}
            label={cat.name}
            color={selectedCat === cat.id ? "primary" : "default"}
            onClick={() => setSelectedCat(cat.id)}
          />
        ))}
        <Chip
          label="New"
          color={condition === "new" ? "secondary" : "default"}
          onClick={() => setCondition(condition === "new" ? null : "new")}
        />
        <Chip
          label="Used"
          color={condition === "used" ? "secondary" : "default"}
          onClick={() => setCondition(condition === "used" ? null : "used")}
        />
      </Box>
      <Grid container spacing={3}>
        {filtered.length ? filtered.map((p: any) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <ProductCard product={p} onAddToCart={() => {}} />
            <Box sx={{ mt: 1, fontSize: 13, color: '#888' }}>
              Seller: {p.user.name} ({p.condition})
            </Box>
          </Grid>
        )) : (
          <Typography sx={{ mt: 4, width: '100%' }}>No products found.</Typography>
        )}
      </Grid>
    </Box>
  );
}
