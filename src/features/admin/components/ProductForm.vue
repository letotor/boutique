<template>
  <div class="card">
    <h3 class="mb-10">Ajouter un article</h3>
    <form @submit="trySubmit" action.preventDefault="#">
      <div class="d-flex flex-column mb-20">
        <label class="mb-5" for="title">*Titre</label>
        <input type="text" id="title" v-model="title.value.value" />
        <small class="form-error" v-if="title.errorMessage.value">
          {{ title.errorMessage.value }}
        </small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5" for="image">*Image</label>
        <input type="text" id="image" v-model="image.value.value" />
        <small class="form-error" v-if="image.errorMessage.value">
          {{ image.errorMessage.value }}
        </small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5" for="price">*Prix</label>
        <input type="number" id="price" v-model="price.value.value" />
        <small class="form-error" v-if="price.errorMessage.value">
          {{ price.errorMessage.value }}
        </small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5" for="description">Description</label>
        <textArea
          type="text"
          id="description"
          v-model="description.value.value"
        />
        <small class="form-error" v-if="description.errorMessage.value">
          {{ description.errorMessage.value }}
        </small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5" for="category">*Categorie</label>
        <select type="text" id="category" v-model="category.value.value">
          <option value="">--Choissisez une categorie--</option>
          <option value="gamer">Jeu</option>
          <option value="desktop">Bureau</option>
          <option value="streaming">Stream</option>
        </select>
        <small class="form-error" v-if="category.errorMessage.value">
          {{ category.errorMessage.value }}
        </small>
      </div>

      <button
        class="btn btn-primary"
        :disabled="isSubmitting"
        @click="trySubmit"
      >
        Sauvegarder
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useForm, useField } from 'vee-validate';
import { useFormValues } from 'vee-validate';
import { Ref } from 'vue';

const required = { required_error: 'Veuillez renseigner ce champ' };
const validationSchema = toTypedSchema(
  z.object({
    title: z
      .string(required)
      .min(3, 'Le titre doit contenir au moins 3 caractères')
      .max(10, 'Le titre doit contenir au plus 10 caractères'),
    image: z.string(required),
    price: z
      .number(required)
      .min(0, { message: 'Le prix doit être positif' })
      .max(15000, { message: 'Le prix doit être inférieur à 15000' }),
    description: z
      .string(required)
      .min(10, {
        message: 'La description doit contenir au moins 10 caractères',
      })
      .max(1000, {
        message: 'La description doit contenir au plus 1000 caractères',
      }),
    category: z.string(required),
  }),
);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
});

const title = useField('title');
const image = useField('image');
const price = useField('price');
const description = useField('description');
const category = useField('category');

const trySubmit = handleSubmit((formValues: any) => console.log(formValues));
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 500px;
}
</style>
