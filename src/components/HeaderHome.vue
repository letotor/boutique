<template>
  <header class="px-20 d-flex flex-row align-item-center">
    <a href="#" class="d-flex flex-row align-items-center mr-20">
      <img src="../assets/images/Logo_fusee_un_peu_penchee.png" alt="logo" />
      <span class="logo">DGweb</span>
    </a>

    <ul class="d-flex flex-row align-items-center flex-fill">
      <li class="mr-20">
        <pre>page :{{ props.page }}</pre>
        <a
          :class="{ actives: page === 'boutique' }"
          @click="emit('navigate', 'boutique')"
          href=" #"
          >Boutique</a
        >
      </li>
      <li class="mr-10">
        <a
          :class="{ actives: page === 'admin' }"
          @click="emit('navigate', 'admin')"
          href=" #"
          >Admin</a
        >
      </li>
    </ul>
    <ul class="d-flex flex-row align-items-center">
      <li class="mr-20"><a href="#"> Inscription </a></li>
      <li><a href="#"> Connexion </a></li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import type { Page } from '../interfaces';
const props = defineProps<{ page: Page }>();
const emit = defineEmits<{
  (e: 'navigate', page: Page): void;
}>();
console.log('HeaderHome', props?.page);
</script>

<style lang="scss" scoped>
header {
  background-color: var(--primary-1);
  a {
    color: var(--text-primary-color);
    cursor: pointer;
    img {
      width: 20px;
      margin-right: 5px;
    }

    .logo {
      font-weight: 700;
      font-size: 20px;
    }
  }
  a.active {
    text-decoration: underline;
    background-color: red;
    color: yellow;
  }
}
</style>
