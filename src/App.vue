<template>
  <div class="app-container">
    <TheHeader @navigate="navigate" class="header" />
    <div class="body">
      <Component :is="pages[state.page]" :page="state.page">
        <Boutique />
        <Admin />
      </Component>
    </div>
    <TheFooter class="footer" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import TheHeader from './components/HeaderHome.vue';
import TheFooter from './components/FooterHome.vue';
import Boutique from './features/boutique/Boutique.vue';
import Admin from './features/admin/Admin.vue';
import type { Component as C} from 'vue';
import type { Page } from './interfaces';

const state = reactive<{ page: Page }>({
  page: 'admin',
});

const pages: { [key: string]: C } = {
  boutique: Boutique,
  admin: Admin,
};

function navigate(page: Page): void {
  state.page = page;
}
</script>

<style lang="scss">
@import './assets/scss/base.scss';
@import './assets/scss/debug.scss';

.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'header' 'body' 'footer';
  grid-template-columns: 100%;
  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}

.body {
  grid-area: body;
}

.footer {
  grid-area: footer;
}
</style>
