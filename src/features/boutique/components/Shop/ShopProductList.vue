<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<template>
  <div ref="scrollablediv" class="d-flex flex-column p-20">
    <div class="grid p-20">
      <ShopProduct
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-product-to-cart="emit('addProductToCart', $event)"
      />
    </div>
    <div
      v-if="moreResults"
      class="d-flex flex-row align-item-center justify-content-center"
    >
      <button class="btn btn-primary" @click="emit('incPage')">
        Charger plus de produits
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '../../../../interfaces/Product.interface';
import ShopProduct from './ShopProduct.vue';
import { inject, ref, watch } from 'vue';
import { pageKey } from '../../../../shared/injectionKeys/pageKey';
defineProps<{
  products: ProductInterface[];
  moreResults: boolean;
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void;
  (e: 'incPage'): void;
}>();

const page = inject(pageKey)!;
console.debug('page', page.value);
const scrollablediv = ref<HTMLDivElement | null>(null);

watch(page, () => {
  if (page.value === 1) {
    scrollablediv.value?.scrollTo(0, 0);
  }
});
</script>

<style lang="scss" scoped>
@use '../../../../assets/scss/mixins' as m;

.grid {
  display: grid;
  grid-template-columns: 1fr;

  @include m.sm {
    grid-template-columns: 1fr;
  }

  @include m.md {
    grid-template-columns: 1fr 1fr;
  }

  @include m.lg {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @include m.xl {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  grid-auto-rows: 400px;
  gap: 20px;
}
</style>
