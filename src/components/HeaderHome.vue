<template>
  <header class="px-20 d-flex flex-row align-item-center">
    <a href="#" class="d-flex flex-row align-items-center mr-20">
      <img src="../assets/images/Logo_fusee_un_peu_penchee.png" alt="logo" />
      <span class="logo">DGweb</span>
    </a>
    <div class="d-flex flex-row align-items-center flex-fill actions-container">
      <ul class="d-flex flex-row align-items-center flex-fill hide-xs">
        <li class="mr-20">
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
      <ul class="d-flex flex-row hide-xs">
        <li class="mr-20"><a href="#"> Inscription </a></li>
        <li><a href="#"> Connexion </a></li>
      </ul>
      <div class="menu-xs-container">
        <i @click="state.open = !state.open" class="fa-solid fa-bars show-xs" />
        <Transition>
          <ul @click="state.open = false" v-if="state.open" class="menu card">
            <li>
              <a
                :class="{ actives: page === 'boutique' }"
                @click="emit('navigate', 'boutique')"
                href=" #"
                >Boutique</a
              >
            </li>
            <li>
              <a
                :class="{ actives: page === 'admin' }"
                @click="emit('navigate', 'admin')"
                href=" #"
                >Admin</a
              >
            </li>
            <li><a href="#"> Inscription </a></li>
            <li><a href="#"> Connexion </a></li>
          </ul>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { Page } from '../interfaces';

const state = reactive<{ open: boolean }>({
  open: false,
});

const emit = defineEmits<{
  (e: 'navigate', page: Page): void;
}>();
</script>

<style lang="scss" scoped>
@use '../assets/scss/mixins';
header {
  background-color: var(--primary-1);
  a {
    color: var(--text-color);
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
  i {
    color: white;
    font-size: 20px;
    cursor: pointer;

    @include mixins.sm {
      display: none;
    }
  }
  .actions-container {
    @include mixins.xs {
      justify-content: flex-end;
    }
  }
  .menu-xs-container {
    position: relative;
  }
  .menu {
    position: absolute;
    top: 20px;
    right: 0;
    li {
      padding: 10px;
    }
    a {
      color: #444;
    }
  }
  .v-leave-to,
  .v-enter-from {
    transform: translateY(-10px);
    opacity: 0;
  }
  .v-leave-active,
  .v-enter-active {
    transition: all 0.3s;
  }
}
</style>
