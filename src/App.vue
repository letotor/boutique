<script setup lang="ts">
  import TheHeader from './components/Header.vue'
  import TheFooter from './components/Footer.vue'
  import Cart from './components/Cart.vue'
  import Shop from './components/Shop.vue'

</script>

<template>
<div class="app-container">
  <TheHeader class="header b1" />
    <Cart class="shop b2" />
    <Shop class="cart b3" />
  <TheFooter class="footer b4" />

</div>
</template>

<style lang ="scss">
@import './assets/base.scss';
@import './assets/debug.scss';
</style>
