<template>
  <div class="d-flex flex-row">
    <ShopFilters
      :filters="filters"
      :nbr-of-results="products.length"
      @update-filter="emit('updateFilter', $event)"
      class="shop-filter m-20"
    />
    <ShopProductList
      class="flex-fill scrollable"
      @add-product-to-cart="emit('addProductToCart', $event)"
      :products="products"
    />
    <!-- <ConnexionShop /> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ShopProductList from './ShopProductList.vue';
import {
  FilterUpdate,
  FiltersInterface,
} from '../../interfaces/Filter.interface';
import type { ProductInterface } from '../../interfaces';
import ShopFilters from './ShopFilters.vue';

defineProps<{
  products: ProductInterface[];
  filters: FiltersInterface;
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void;
  (e: 'updateFilter', updateFilter: FilterUpdate): void;
}>();

// console.log('Shop', emit.toString);
</script>

<style lang="scss" scoped>
.scrollable {
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  height: calc(100vh - 96px);
  //scrollbar-color: var(--primary-1);
  &::-webkit-scrollbar {
    background-color: var(--gray-1);
    opacity: 0.8;
    color: grey;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--gray-2);
    
    border-radius: 10px;
  }
}
.shop-filter {
  flex: 0 0 200px;
}
</style>
