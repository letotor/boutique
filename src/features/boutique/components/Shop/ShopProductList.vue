<template>
  <div class="grid p-20">
    <ShopProduct
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-product-to-cart="emit('addProductToCart', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '../../../../interfaces/Product.interface';
import ShopProduct from './ShopProduct.vue';

defineProps<{
  products: ProductInterface[];
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void;
}>();
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 400px;
  gap: 20px;
}
</style>
