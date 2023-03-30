<template>
  <div class="app-container" :class="{gridEmpty : cartEmpty}">
    <TheHeader class="header" />
   

    <Shop
      :products="state.products"
      @add-product-to-cart="addProductToCart"
      class="shop"
    />
    <Cart v-if="!cartEmpty"
      :cart="state.cart"
      class="cart"
      @remove-product-from-cart="removeProductFromCart"
    />

    <TheFooter class="footer" />
  </div>
</template>

<script setup lang="ts">
import TheHeader from "./components/HeaderHome.vue";
import TheFooter from "./components/FooterHome.vue";
import Shop from "./components/Shop/Shop.vue";
import Cart from "./components/Cart/Cart.vue";
import data from "./data/product";

import { computed, reactive } from "vue";
import type { ProductInterface, ProductCartInterface } from "./interfaces";
import axios from "axios";
import { faker } from "@faker-js/faker";

const state = reactive<{
  products: ProductInterface[];
  cart: ProductCartInterface[];
}>({
  // products: data,
  products: data,
  cart: [],
});

const cartEmpty = computed(() => 
  state.cart.length === 0
)

state.products.forEach((product) => {
  product.image = faker.image.abstract(640, 480, true);


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
  
  if (product){

    const productInCart = state.cart.find((product) => product.id === productId);
    if (productInCart) {
      productInCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  }
  else{
    console.log("product not found")
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
  }else{

    
  }


};
</script>

<style lang="scss">
@import "@/assets/scss/base.scss";
@import "@/assets/scss/debug.scss";

.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas: "header header" "shop cart" "footer footer";
  grid-template-columns: 75% 25%;
  grid-template-rows: 48px auto 48px;
}

.gridEmpty{
  grid-template-areas: "header " "shop" "footer ";
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
