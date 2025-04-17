import { Box, Typography, Button } from '@mui/material';
import React from 'react';

export default function HeroBanner() {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/catan.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textShadow: '0 2px 4px rgba(0,0,0,0.7)',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Don&apos;t be bored, play a board game!
      </Typography>
      <Button variant="contained" color="secondary" size="large" href="#products">
        Shop Now
      </Button>
    </Box>
  );
}
