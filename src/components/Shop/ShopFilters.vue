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
      <h3 class="mb-10">Categorie</h3>
      <p
        v-for="category in ([ 'all','desktop','laptop','accessories'] as Category[])"
        :key="category!"
        @click="emit('updateFilter', { category })"
        class="mt-20 category"
        :class="{ selected: category === filters.category }"
      >
        {{ category }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Category } from '../../interfaces';
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

<style style="scss" scoped>
.category {
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 5px;
  background-color: var(--gray-1);
  transition: background-color 0.2s ease;
}
.category.selected {
  background-color: var(--gray-2);
  text-decoration: underline;
  font-weight: bold;
}
</style>
