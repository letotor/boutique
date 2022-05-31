<script setup lang="ts">
  import TheHeader from './components/Header.vue'
  import TheFooter from './components/Footer.vue'
  import { reactive } from 'vue'
  import Cart from './components/Cart/Cart.vue'
  import Shop from './components/Shop/Shop.vue'
  import data from './data/product'
  import type { ProductInterface } from './interfaces/product.interface'


const products = reactive<ProductInterface[]>(data);


</script>

<template>
<div class="app-container">
  <TheHeader class="header" />
    <Cart class="cart" />
    <Shop :products="products" class="shop" />
  <TheFooter class="footer" />

</div>
</template>

<style lang ="scss">
@import './assets/base.scss';
@import './assets/debug.scss';
</style>
