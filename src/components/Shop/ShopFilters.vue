<template>
  <div class="p-10">
    <section class="mb-20">
      <h3 class="mb-10">Recherche</h3>
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
    </section>

    <section class="mb-20">
      <h3 class="mb-10 d-flex flex-column">Trier par Prix</h3>

      <div
        v-for="range of ([
          [0, 10000],
          [800, 1000],
          [1000, 1500],
          [1500, 2000],
          [2000, 10000],
        ] as [number, number][])"
        :key="range.at(0)"
        class="mb-5"
      >
        <input
          :checked="range.at(0) === filters.priceRange.at(0)"
          @input="
            emit('updateFilter', {
              priceRange: range,
            })
          "
          type="radio"
          name="priceRange"
          :id="`${range.at(0)}`"
        />
        <label
          :style="{
            marginLeft: '5px',
          }"
          :for="`${range.at(0)}`"
        >
          {{
            range.at(0) === 0
              ? 'Tous les prix'
              : range.at(0) === 2000
              ? 'Plus de 2000 €'
              : `${range.at(0)} - ${range.at(1)} €`
          }}
          <!-- 
          <span v-if="range.at(0) === 0">Tous les prix</span>
          <span v-else-if="range.at(0) === 2000">Plus de 2000 €</span>
          <span v-else class=""> {{ range.at(0) }} - {{ range.at(1) }} € </span> -->
        </label>
      </div>
    </section>

    <section>

      
    </section>
    <!-- 
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
      </section>
      </select> -->
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
