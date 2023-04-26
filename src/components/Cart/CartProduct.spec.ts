import { describe, it, expect } from 'vitest';

import Cart from './Cart.vue';

describe('Cart', () => {
  it('renders CartProduct component for each product in cart', () => {
    const cart = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 },
    ];
  });

  it('emits removeProductFromCart event when product is removed', async () => {
    const cart = [{ id: 1, name: 'Product 1', price: 10 }];
  });
});
