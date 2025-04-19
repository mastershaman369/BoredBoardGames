import React from "react";
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";

const categories = [
  { id: "board-games", name: "Board Games", image: "/images/monopoly.jpg" },
  { id: "strategy", name: "Strategy Games", image: "/images/catan.jpg" },
  { id: "family", name: "Family Games", image: "/images/placeholder.jpg" },
  { id: "classic", name: "Classic Games", image: "/images/chess.jpg" },
  { id: "expansion", name: "Expansions", image: "/images/wingspan.jpg" },
  { id: "cooperative", name: "Cooperative", image: "/images/pandemic.jpg" },
  { id: "campaign", name: "Campaign", image: "/images/gloomhaven.jpg" },
];

export default function FeaturedCategories() {
  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Featured Categories</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
        {categories.map(cat => (
          <Card key={cat.id}>
            <CardActionArea href={`/marketplace?category=${cat.id}`}>
              <CardMedia component="img" height="120" image={cat.image} alt={cat.name} onError={(e: any) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; }} />
              <CardContent>
                <Typography variant="subtitle1" align="center">{cat.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
