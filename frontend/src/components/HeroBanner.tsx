import { Box, Typography, Button } from '@mui/material';
import React from 'react';

export default function HeroBanner() {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/hero-group-boardgame.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 420,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textShadow: '0 2px 4px rgba(0,0,0,0.7)',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: '2.5rem', fontWeight: 700 }}>
        Don&apos;t be bored, play a board game!
      </Typography>
      <Button variant="contained" color="secondary" size="large" href="#products" sx={{ px: 4, py: 1, fontSize: '1rem', textTransform: 'none' }}>
        Shop Now
      </Button>
    </Box>
  );
}
