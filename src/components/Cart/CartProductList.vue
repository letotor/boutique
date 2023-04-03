<template>
  <div class="d-flex flex-column">
    <CartProduct
      :key="product.id"
      v-for="product of cart"
      :product="product"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import CartProduct from './CartProduct.vue';
import type { ProductCartInterface } from '../../interfaces';

const props = defineProps<{
  cart: ProductCartInterface[];
}>();

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void;
}>();
</script>

<style lang="scss" scoped></style>
