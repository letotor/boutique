<template>
  <div clqss="p-20 ">
    <section>
      <h3>Recherche</h3>
      <input
        @input="
          emit('updateFilter', {
            search: ($event.target as HTMLInputElement).value,
          })
        "
        :value="filters.search"
        class="mt-20"
        type="text"
        placeholder="Rechercher"
      />
    </section>

    <!-- <input type="text" v-model="filters.search" />
        <h3>Prix</h3>
        <input type="range" v-model="filters.priceRange" />
        <h3>Categorie</h3>
        <select v-model="filters.category">
            <option value="all">Toutes</option>
            <option value="furniture">Meubles</option>
            <option value="decoration">Décoration</option>
            <option value="lighting">Eclairage</option>
        </select> -->
  </div>
</template>

<script setup lang="ts">
import type {
  FilterInterface,
  FilterUpdate,
} from '../../interfaces/Filter.interface';

defineProps<{
  filters: FilterInterface;
}>();

const emit = defineEmits<{
  (e: 'updateFilter', updateFilter: FilterUpdate): void;
}>();
</script>

<style scoped style="scss"></style>
