import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={product.image_url}
        alt={product.name}
        sx={{ height: 140 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onAddToCart(product)} variant="contained">
          Add to Cart
        </Button>
        <Button size="small" href={`/product/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
