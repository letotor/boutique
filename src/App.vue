<template>
  <div class="app-container">
    <TheHeader class="header" />
    <div class="body">
      <Component :is="Boutique">
        <Boutique />
        <Admin />
      </Component>
    </div>
    <TheFooter class="footer" />
  </div>
</template>

<script setup lang="ts">
import TheHeader from './components/HeaderHome.vue';
import TheFooter from './components/FooterHome.vue';
import Boutique from './features/boutique/Boutique.vue';
import Admin from './features/admin/Admin.vue';
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
