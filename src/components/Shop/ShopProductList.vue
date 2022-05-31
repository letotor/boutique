<script setup lang="ts">
import type { ProductInterface } from '@/interfaces/product.interface';
import ShopProduct from './ShopProduct.vue';

defineProps<{
    products: ProductInterface[]
}>()



</script>

<template>
<div class="grid p-20">
   <ShopProduct v-for="product of products" :product="product" />
</div>
</template>

<style lang ="scss" scoped>
    .grid{
        display:grid;
        grid-template-columns: repeat(4,1fr);
        grid-auto-rows: 300px;
        gap:20px;
    }

</style>
