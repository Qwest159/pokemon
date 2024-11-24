<script setup>
import { ref, onMounted } from "vue";

// let count_uptade = 1025

// DOIS FAIRE ATTENTION POUR LA MISE A JOUR => SI LOCAL STORAGE COUNT == COUNT DU donnees_localstorage[0].id === "1"

let pokemonList = ref([]);
let pokemonImageList = ref([]);
const isLoading = ref(true);
const error = ref(null);

async function fetchPokemonList() {
  let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));
  console.log(donnees_localstorage);

  if (donnees_localstorage !== null && donnees_localstorage[0].id == "1") {
    // if (donnees_localstorage !== null) {
    console.log("1");
    isLoading.value = false;
    pokemonList.value = donnees_localstorage;
  } else {
    try {
      console.log("2");

      const response = await fetch(
        // "https://pokeapi.co/api/v2/pokemon?limit=1025"

        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();

      //
      for (let index = 0; index < data.results.length; index++) {
        pokemonList.value.push({
          id: index + 1,
          name: data.results[index].name,
        });
      }

      localStorage.setItem("pokemon", JSON.stringify(pokemonList.value));
      let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));
      pokemonList.value = donnees_localstorage;
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  }
}
onMounted(() => {
  fetchPokemonList();
});
</script>

<template>
  <h1>Pokedex</h1>
  <div>
    <div v-if="isLoading">Chargement en cours...</div>
    <div v-else-if="error">Une erreur est survenue : {{ error.message }}</div>
    <ul v-else>
      <li v-for="(pokemon, index) in pokemonList" :key="pokemon.name">
        <router-link :to="`/show/${pokemon.id}`">
          <!-- <a :href="`/show/${pokemon.id}`"> -->
          {{
            pokemon.id < 10
              ? "000" + pokemon.id
              : pokemon.id < 100
              ? "00" + pokemon.id
              : pokemon.id < 1000
              ? "0" + pokemon.id
              : pokemon.id
          }}
          {{ pokemon.name }}
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
            :alt="pokemon.name"
          />
          <!-- <\a> -->
        </router-link>
        <!-- pokemon.names.language == fr language.name -->
      </li>

      <!-- <img src="{{pokemon.url}}" alt="" /> -->
    </ul>
  </div>
</template>

<!-- const results = [];
for (let id = 1; id <= 1025; id++) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}/?limit=1025&offset=0`
  );

  const data = await response.json();

  console.log(id);
  console.log(data);

  pokemonList.value.push({
    id: id,
    name: data.name,
    weight: data.weight,
  });
} -->
