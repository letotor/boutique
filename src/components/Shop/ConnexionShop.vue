<template>
  <div>
    Bienveneu sur axios

    <p v-if="error">{{ error }}</p>

    <div v-else>
      <div class="flex">
        <button
          class="btn btn-primary"
          :class="{ active: state.filterPrice }"
          @click="state.filterPrice = !state.filterPrice"
        >
          trie produit par prix
        </button>
        <button
          class="btn btn-primary"
          :class="{ active: state.filterTitle }"
          @click="state.filterTitle = !state.filterTitle"
        >
          trie produit par title
        </button>

        <button
          class="btn btn-primary"
          :class="{ active: state.filterCategorie }"
          @click="state.filterCategorie = !state.filterCategorie"
        >
          trie produit par category
        </button>
        <button
          class="btn btn-primary"
          :class="{ active: state.filterId }"
          @click="state.filterId = !state.filterId"
        >
          trie produit par id
        </button>
      </div>
      {{ JSON.stringify('1') }}
      <!-- {{JSON.stringify(filtered)}} -->
      <div class="produit-container">
        <div class="produit" v-for="(produit, index) in filtered" :key="index">
          <img :src="produit.image!" alt="test" />

          <div class="description">
            <p>{{ produit.id as number }}</p>
            <h2>{{ produit.title }}</h2>
            <p class="price">{{ produit.price }} €</p>
            <p>{{ produit.description }}</p>
            <h3>{{ produit.category }}</h3>
            <div v-if="produit.rating?.rate">
              <!-- <div v-for="(item, index) in produit.rating" :key="index">
                <p>{{ item.rate}}</p>
                <p>{{ item.count}}</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />

    <div>
      <h2>Connexion</h2>
      <div class="users-container">
        <div v-for="(user, index) in users" :key="index" class="user">
          <div class="user-desc">
            <p>{{ user.userId }}</p>
            <!-- <p>{{ user.avatar }}</p> -->
            <p>{{ user.email }}</p>
            <p>{{ user.password }}</p>
            <p>{{ user.birthdate }}</p>
            <button :click="deleteUser">Delete</button>
          </div>
          <img :src="user.avatar" />
        </div>
      </div>
    </div>
    <!-- <pre>{{ JSON.stringify(data, null, 2) }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import { watchEffect, reactive, ref, toRefs, pushScopeId } from 'vue';
import axios from 'axios';
import { faker } from '@faker-js/faker';

import type { ProdInterface } from '../../interfaces/prod.interface';
import type { UserInterface } from '../../interfaces/user.interface';
import type { FilterInterface } from '../../interfaces/Filter.interface';
import { computed } from '@vue/reactivity';
// const props = defineProps<{
//   cart: ProductInterface[];
// }>();
// const produits = ref<ProdInterface[]>([]);

const state = reactive<any>({
  filterCategorie: false,
  filterPrice: false,
  filterTitle: false,
  filterId: false,
});

const error = ref<string | undefined>();
const produits = reactive<ProdInterface[]>([]);
const filterProduits = reactive<ProdInterface[]>([]);
const users = reactive<UserInterface[]>([
  {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  },
]);

console.log('2');

const setFilter = (filter: string) => {
  console.log('3');
  filter == 'category' && (state.filterCategorie = !state.filterCategorie);
  filter == 'price' && (state.filterPrice = !state.filterPrice);
  filter == 'title' && (state.filterTitle = !state.filterTitle);
  filter == 'id' && (state.filterId = !state.filterId);
  console.log(filter);
  console.log(state);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void;
}>();

const createRandomUser = (): UserInterface => {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
};

Array.from({ length: 30 }).forEach(() => {
  users.push(createRandomUser());
});

// console.log("users", users);

const getData = async () => {
  console.log('4');
  try {
    const response = await (
      await axios.get('https://fakestoreapi.com/products/')
    ).data;
    console.log('response', response);
    // produit.push(...response);
    return response;
  } catch (error) {
    console.log(error);
  }

  // console.log(response.data);
};
console.log('5');
watchEffect(async () => {
  console.log('6');
  try {
    const result = await getData();
    produits.push(...result); // to reactive array
    filterProduits.push(...result);
    // console.log(result);
    console.log('data', result);
  } catch (erreur: Error | any) {
    error.value = erreur.message;
  }
});

const filterReset = (): void => {
  filterProduits.splice(0, filterProduits.length);
  filterProduits.push(...produits);
};

const filtered = computed(() => {
  console.log('filterProduits', state, filterProduits);
  if (
    !state.filterCategorie &&
    !state.filterPrice &&
    !state.filterId &&
    !state.filterTitle
  ) {
    filterReset();
  } else {
    if (state.filterCategorie) {
      state.filterPrice = false;
      state.filterId = false;
      state.filterTitle = false;
      filterProduits.sort((a: ProdInterface, b: ProdInterface) => {
        // console.log("a", Object.keys(a),typefilter,a[typefilter]);
        return a['category']! > b['category']! ? 1 : -1;
      });
    }

    if (state.filterPrice) {
      state.filterCategorie = false;
      state.filterId = false;
      state.filterTitle = false;
      filterProduits.sort((a: ProdInterface, b: ProdInterface) => {
        // console.log("a", Object.keys(a),typefilter,a[typefilter]);
        return a['price']! > b['price']! ? 1 : -1;
      });
    }

    if (state.filterTitle) {
      state.filterPrice = false;
      state.filterId = false;
      state.filterCategorie = false;
      // state.filterTitle = !state.filterTitle;
      filterProduits.sort((a: ProdInterface, b: ProdInterface) => {
        // console.log("a", Object.keys(a),typefilter,a[typefilter]);
        return a['title']! > b['title']! ? 1 : -1;
      });
    }
    if (state.filterId) {
      state.filterPrice = false;
      state.filterCategorie = false;
      state.filterTitle = false;
      // state.filterId = !state.filterId;
      filterProduits.sort((a: ProdInterface, b: ProdInterface) => {
        // console.log("a", Object.keys(a),typefilter,a[typefilter]);
        return a['id']! > b['id']! ? 1 : -1;
      });
    }
  }
  return filterProduits;
});

console.log('7');

const deleteUser = (userId: string): void => {
  users.splice(
    users.findIndex((user) => user.userId === userId),
    1,
  );
};
</script>

<style lang="scss" scoped>
.active {
  background-color: #f76c6c;
  border: 2px dotted white;
  transform: all 0.3s ease-in-out;
}

.produit-container {
  color: grey;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 450px;
  overflow: hidden;
  grid-gap: 20px;
  margin: 1rem;
}

.flex {
  display: flex;
  width: 500px;
  margin: 10px;
  button {
    margin: 10px;
  }
}

.produit {
  background: #999;
  border-radius: 7px;

  border: 1px solid orange;
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  background: #fff;
  color: blue;
  box-shadow: 0px 0px 8px rgba(0.2, 0.2, 0.2, 0.5),
    0px 0px 8px rgba(0, 0, 0, 0.5);

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: coral;
  }

  #id {
    display: hidden;
  }

  .price {
    border: solid 1px #ccc;
    border-radius: 5px;
    background: #eee;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: coral;
  }
}
.produit img {
  flex: 0 0 200px;
  object-fit: contain;
  background: white;
  width: 100%;
  overflow: hidden;
}

.produit .description {
  padding: 1rem;
  flex: 1 1 auto;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
.users-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 20px;
  margin: 1rem;
  .user {
    border: solid 1px #ccc;
    display: flex;
    flex-flow: row wrap;
    justify-content: start;
    align-items: start;
    border: 2px solid red;
    border-radius: 7px;
    background: #ffebeb;
    box-shadow: 0px 0px 8px #f76c6c, 0px 0px 8px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in-out;
    .user-desc {
      padding: 1rem;
      flex: 1 1 auto;
      width: 50%;
    }

    img {
      object-fit: contain;
      height: 100%;
      border-radius: 0 7px 7px 0;
      border: 2px solid #e8d486;
    }
  }

  .user:hover {
    box-shadow: 0px 0px 8px #f76c6c, 0px 0px 8px rgba(0, 0, 0, 0.5);
  }

  button {
    margin: 1rem;
    background: red;
    border: 2px dotted transparent;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s ease-in-out;
    border: 2px solid transparent;
    &:hover {
      background: #f76c6c;
      border-color: white;
    }
  }
}
</style>
