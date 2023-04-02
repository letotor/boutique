<template>
    <div>
      <ShopProductList
        @add-product-to-cart="emit('addProductToCart', $event)"
        :products="products"
      />
      <!-- <ConnexionShop /> -->
    </div>
  </template>
  <script setup lang="ts">
import ShopProductList from "./ShopProductList.vue";
import ConnexionShop from "./ConnexionShop.vue";
import { ProductInterface } from "../../interfaces";

defineProps<{
  products: ProductInterface[];
}>();

const emit = defineEmits<{
  (e: "addProductToCart", productId: number): void;
}>();
</script>



<style lang="scss" scoped></style>
