"use client";
import React from 'react';
import { Box, Button } from '@mui/material';

interface CategoryFilterProps {
  categories: { id: string; name: string }[];
  selected: string | null;
  onChange: (id: string | null) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', my: 4 }}>
      <Button variant={selected === null ? 'contained' : 'outlined'} onClick={() => onChange(null)}>
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selected === cat.id ? 'contained' : 'outlined'}
          onClick={() => onChange(cat.id)}
        >
          {cat.name}
        </Button>
      ))}
    </Box>
  );
}
