<template>
  <div class="p-20 d-flex flex-column">
    <h2 class="mb-10">Panier</h2>
    <CartProductList
      :cart="cart"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
    <button @lick="validate" class="align-items-center btn btn-success mt-10">
      Commander ({{ totalPrice }}
      <span class="ml-10">€</span>
      )
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CartProductList from './CartProductList.vue';
import type { ProductCartInterface } from '@/interfaces';

const props = defineProps<{
  cart: ProductCartInterface[];
}>();

const totalPrice = computed(() => {
  return props.cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
});

const validate = () => {
  console.log('validate');
};
const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void;
}>();
</script>

<style lang="scss" scoped></style>
