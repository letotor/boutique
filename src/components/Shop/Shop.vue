<script setup lang="ts">
import type { ProductInterface } from "@/interfaces";
import ShopProductList from "./ShopProductList.vue";
import ConnexionShop from "./ConnexionShop.vue";

defineProps<{
  products: ProductInterface[];
}>();

const emit = defineEmits<{
  (e: "addProductToCart", productId: number): void;
}>();
</script>

<template>
  <div>
    <ShopProductList
      @add-product-to-cart="emit('addProductToCart', $event)"
      :products="products"
    />
    <!-- <ConnexionShop /> -->
  </div>
</template>

<style lang="scss" scoped></style>
