"use client";
import React from 'react';
import { Box } from '@mui/material';

interface CategoryFilterProps {
  categories: { id: string; name: string }[];
  selected: string | null;
  onChange: (id: string | null) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', my: 4 }}>
      <button
        style={{
          background: selected === null ? '#16A085' : '#fff',
          color: selected === null ? '#fff' : '#22223B',
          border: '1.5px solid #16A085',
          borderRadius: 0,
          padding: '8px 20px',
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: selected === null ? '0 2px 8px rgba(34,34,34,0.10)' : 'none',
          outline: 'none',
          transition: 'background 0.15s, color 0.15s',
          marginBottom: 4,
        }}
        onClick={() => onChange(null)}
        onMouseOver={e => { if (selected !== null) { e.currentTarget.style.background = '#f7f7f7'; }}}
        onMouseOut={e => { if (selected !== null) { e.currentTarget.style.background = '#fff'; }}}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          style={{
            background: selected === cat.id ? '#16A085' : '#fff',
            color: selected === cat.id ? '#fff' : '#22223B',
            border: '1.5px solid #16A085',
            borderRadius: 0,
            padding: '8px 20px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: selected === cat.id ? '0 2px 8px rgba(34,34,34,0.10)' : 'none',
            outline: 'none',
            transition: 'background 0.15s, color 0.15s',
            marginBottom: 4,
          }}
          onClick={() => onChange(cat.id)}
          onMouseOver={e => { if (selected !== cat.id) { e.currentTarget.style.background = '#f7f7f7'; }}}
          onMouseOut={e => { if (selected !== cat.id) { e.currentTarget.style.background = '#fff'; }}}
        >
          {cat.name}
        </button>
      ))}
    </Box>
  );
}
