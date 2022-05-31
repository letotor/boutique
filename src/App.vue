<script setup lang="ts">
  import TheHeader from './components/Header.vue'
  import TheFooter from './components/Footer.vue'
  import Cart from './components/Cart/Cart.vue'
  import Shop from './components/Shop/Shop.vue'

</script>

<template>
<div class="app-container">
  <TheHeader class="header" />
    <Cart class="cart" />
    <Shop class="shop" />
  <TheFooter class="footer" />

</div>
</template>

<style lang ="scss">
@import './assets/base.scss';
@import './assets/debug.scss';
</style>
