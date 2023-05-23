<template>
  <div class="boutique-container" :class="{ 'grid-empty': cartEmpty }">
    <Shop
      class="shop"
      @update-filter="updateFilter"
      :products="filteredProducts"
      :filters="state.filters"
      @add-product-to-cart="addProductToCart"
    />

    <Cart
      v-if="!cartEmpty"
      class="cart"
      :cart="state.cart"
      @remove-product-from-cart="removeProductFromCart"
    />
  </div>
</template>

<script setup lang="ts">
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';

import data from '../../data/product';
import { ref, computed, reactive, watchEffect } from 'vue';
import { DEFAULT_FILTERS } from './data/filters';
//eslint-disable-next-line
import { faker } from '@faker-js/faker';

import type { ProductCartInterface, ProductInterface } from './interfaces';
import type {
  FiltersInterface,
  FilterUpdate,
} from '../../interfaces/Filter.interface';

const displayTest = ref<string | null>('');
const state = reactive<{
  products: ProductInterface[];
  cart: ProductCartInterface[];
  filters: FiltersInterface;
}>({
  // products: data,
  products: data,
  cart: [],
  // on cree une copy de default filters pour ne pas modifier la constante puisque filter est une reference object et non une copie donc si on modifie filter on modifie aussi DEFAULT_FILTERS et on ne veut pas ca
  filters: { ...DEFAULT_FILTERS },
});

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

/**
 * Update filters with a filter update object (search, priceRange, category)
 * Update filters
 * @param filterUpdate - Filter update object (search, priceRange, category)
 */
const updateFilter = (filterUpdate: FilterUpdate): void => {
  displayTest.value = filterUpdate.search!;
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search;
  } else if (filterUpdate.priceRange) {
    state.filters.priceRange = filterUpdate.priceRange;
  } else if (filterUpdate.category) {
    state.filters.category = filterUpdate.category;
  } else {
    state.filters = { ...DEFAULT_FILTERS };
  }
  console.debug('state.filters', state.filters);
};

// cardEmpy est une computed property qui retourne un boolean pour  savoir si le panier est vide ou non ce qui permet de ne pas afficher le panier si il est vide et  d apposer la classe gridEmpty sur le div app-container pour que le shop prenne toute la largeur de la page
const cartEmpty = computed(() => state.cart.length === 0);

const filteredProducts = computed(() =>
  state.products.filter((product) => {
    if (
      product.title
        .toLowerCase()
        .startsWith(state.filters.search.toLowerCase()) &&
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1] &&
      (product.category === state.filters.category ||
        state.filters.category === 'all')
    ) {
      return true;
    } else {
      return false;
    }
  }),
);

// state.products.forEach((product, index) => {
//   product.image = `https://picsum.photos/200.webp?technology=${index}`;
// });
watchEffect(async () => {
  try {
    const { data } = await (
      await fetch('http://energieteam.dgweb.fr:8157/items/projetproducts')
    ).json();

    console.log('Données des produits récupérées :', data);

    if (Array.isArray(data)) {
      state.products = data;
    } else {
      state.products = [data];
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped lang="scss">
.boutique-container {
  display: grid;
  grid-template-areas: 'shop cart';
  grid-template-columns: 75% 25%;
}
.grid-empty {
  grid-template-areas: 'shop ';
  grid-template-columns: 100%;
}

.cart {
  grid-area: cart;
  border-left: var(--border);
  background-color: white;
}
</style>
