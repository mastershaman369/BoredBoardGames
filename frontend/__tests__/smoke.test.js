import React from 'react';
import { render } from '@testing-library/react';
import Home from '../src/app/page';
import { CartProvider } from '../src/context/CartContext';
import { ToastProvider } from '../src/context/ToastContext';

test('renders homepage without crashing', () => {
  render(
    <ToastProvider>
      <CartProvider>
        <Home />
      </CartProvider>
    </ToastProvider>
  );
});
