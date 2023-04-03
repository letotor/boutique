<template>
  <div :class="{ gridEmpty: cartEmpty }" class="app-container">
    <TheHeader class="header" />

    <Shop
      @update-filter="updateFilter"
      :products="filteredProducts"
      :filters="state.filters"
      @add-product-to-cart="addProductToCart"
      class="shop"
    />

    <Cart
      v-if="!cartEmpty"
      :cart="state.cart"
      class="cart"
      @remove-product-from-cart="removeProductFromCart"
    />

    <TheFooter class="footer" />
  </div>
</template>

<script setup lang="ts">
import TheHeader from './components/HeaderHome.vue';
import TheFooter from './components/FooterHome.vue';
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';
import data from './data/product';
import { computed, reactive } from 'vue';

import { DEFAUlT_FILTERS as DEFAULT_FILTERS } from './data/filters';
//eslint-disable-next-line
import { faker } from '@faker-js/faker';
import type { ProductCartInterface, ProductInterface } from './interfaces';
import type {
  FilterInterface,
  FilterUpdate,
} from './interfaces/Filter.interface';

const state = reactive<{
  products: ProductInterface[];
  cart: ProductCartInterface[];
  filters: FilterInterface;
}>({
  // products: data,
  products: data,
  cart: [],
  // on cree une copy de default filters pour ne pas modifier la constante puisque filter est une reference object et non une copie donc si on modifie filter on modifie aussi DEFAULT_FILTERS et on ne veut pas ca
  filters: { ...DEFAULT_FILTERS },
});

const cartEmpty = computed(() => state.cart.length === 0);

const filteredProducts = computed(() =>
  state.products.filter((product) => {
    if (
      (product.title
        .toLowerCase()
        .startsWith(state.filters.search.toLowerCase()) &&
        product.price >= state.filters.priceRange[0] &&
        product.price <= state.filters.priceRange[1] &&
        product.category === state.filters.category) ||
      state.filters.category === 'all'
    ) {
      return true;
    } else {
      return false;
    }
  }),
);

/**
 * Update filters with a filter update object (search, priceRange, category)
 * Update filters
 * @param filterUpdate - Filter update object (search, priceRange, category)
 */
const updateFilter = (filterUpdate: FilterUpdate): void => {
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search;
  } else if (filterUpdate.priceRange) {
    state.filters.priceRange = filterUpdate.priceRange;
  } else if (filterUpdate.category) {
    state.filters.category = filterUpdate.category;
  } else {
    state.filters = { ...DEFAULT_FILTERS };
  }
};

state.products.forEach((product, index) => {
  product.image = `https://picsum.photos/200.webp?technology=${index}`;
});
// const products =await( await axios.get("https://restapi.fr/api/projetProducts")).data
// console.log(products)
// if (Array.isArray(products)) {
//   state.products = products;
// }else{
//   state.products = [products];
// }

const addProductToCart = (productId: number): void => {
  const product = state.products.find((product) => product.id === productId);
  // test if product is not already in cart

  if (product) {
    const productInCart = state.cart.find(
      (product) => product.id === productId,
    );
    if (productInCart) {
      productInCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  } else {
    console.log('product not found');
  }
};

const removeProductFromCart = (productId: number): void => {
  // find is mutable
  const productInCart = state.cart.find((product) => product.id === productId);

  if (productInCart) {
    if (productInCart.quantity > 1) {
      productInCart.quantity--;
    } else {
      // filter is immutable
      state.cart = state.cart.filter((product) => product.id !== productId);
    }
  } else {
    console.log('product not found');
  }
};
</script>

<style lang="scss">
@import './assets/scss/base.scss';
@import './assets/scss/debug.scss';

.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'header header' 'shop cart' 'footer footer';
  grid-template-columns: 75% 25%;
  grid-template-rows: 48px auto 48px;
}

.gridEmpty {
  grid-template-areas: 'header ' 'shop' 'footer ';
  grid-template-columns: 100%;
}

.header {
  grid-area: header;
}

.shop {
  grid-area: shop;
}

.cart {
  grid-area: cart;
  border-left: var(--border);
  background-color: white;
}

.footer {
  grid-area: footer;
}
</style>
