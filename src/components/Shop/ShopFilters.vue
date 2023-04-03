<template>
  <div class="p-10">
    <section>
      <h3>Recherche</h3>
      <!-- icic on renvoie un objet avec la cle search et la valeur de l'input -->
      <input
        @input="
          emit('updateFilter', {
            search: ($event.target as HTMLInputElement).value,
          })
        "
        :value="filters.search"
        class="mt-10"
        type="text"
        placeholder="Rechercher"
      />
      <!-- 
      <h3 class="mt-10">Prix</h3>
      <input
        @input="
          emit('updateFilter', {
            priceRange: ($event.target as HTMLInputElement).value,
          })
        "
        :value="filters.priceRange"
        class="mt-10"
        type="range"
        min="0"
        max="10000"
      />
      <h3 class="">Categorie</h3>
      <select
        @change="
          emit('updateFilter', {
            category: ($event.target as HTMLInputElement).value,
          })
        "
        :value="filters.category"
        class="mt-20"
      >
        <option value="all">Toutes</option>
        <option value="furniture">Meubles</option>
        <option value="decoration">Décoration</option>
        <option value="lighting">Eclairage</option> 
      </select> -->
    </section>
  </div>
</template>

<script setup lang="ts">
import type {
  FiltersInterface,
  FilterUpdate,
} from '../../interfaces/Filter.interface';

defineProps<{
  filters: FiltersInterface;
}>();

const emit = defineEmits<{
  (e: 'updateFilter', updateFilter: FilterUpdate): void;
}>();
</script>

<style scoped style="scss"></style>
