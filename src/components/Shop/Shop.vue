<template>
  <div class="d-flex flex-row">
    <ShopFilters
      :filters="filters"
      @update-filter="emit('updateFilter', $event)"
      class="shop-filter m-20"
    />
    <ShopProductList
      class="flex-fill"
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
.shop-filter {
  flex: 0 0 200px;
}
</style>
