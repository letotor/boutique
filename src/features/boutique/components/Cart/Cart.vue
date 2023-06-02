<template>
  <div class="cart-container">
    <Transition mode="out-in">
      <div
        v-if="!state.openCart"
        @click="state.openCart = !state.openCart"
        class="cart-holder d-flex justify-content-center align-items-center"
      >
        <span class="tag">
          {{ props.cart.length }}
        </span>
        <i class="m-10 fa-solid fa-basket-shopping"></i>
      </div>
      <div v-else>
        <Teleport to="body">
          <div @click="state.openCart = false" class="calc"></div>
        </Teleport>
        <div class="p-20 d-flex flex-column card">
          <h2 class="mb-10">Panier</h2>
          <CartProductList
            :cart="cart"
            @remove-product-from-cart="emit('removeProductFromCart', $event)"
          />
          <button
            @lick="validate"
            class="align-items-center btn btn-success mt-10"
          >
            Commander ({{ totalPrice }}
            <span class="ml-10">€</span>
            )
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import CartProductList from './CartProductList.vue';
import type { ProductCartInterface } from '../../interfaces';

const state = reactive<{
  openCart: boolean;
}>({
  openCart: false,
});

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

<style lang="scss" scoped>
.cart-container {
  position: fixed;
  bottom: 50px;
  right: 40px;
  z-index: 2;
}

.tag {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 15px;
  font-size: 10px;
  line-height: 15px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  background-color: var(--danger-1);
  color: var(--text-primary-color);
}
.cart-holder {
  position: relative;
  background-color: var(--primary-1);
  cursor: pointer;

  transition: background-color 0.2s;
  &:hover {
    background-color: var(--primary-2);
  }
  border-radius: 50%;
}
i {
  font-size: 1.6rem;
  color: var(--text-primary-color);
  margin: 15px;
}
.card {
  background-color: white;
  color: var(--white);
  border-radius: 10px;
  width: 450px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding-bottom: 80px;
}
.calc {
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.311);
  width: 100%;
  height: 100vh;
  z-index: 1;
}

.v-leave-to,
.v-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.v-enter-active,.v-leave-active {
  transition: all 0.2s;
}
</style>
