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

  if (donnees_localstorage !== null || donnees_localstorage[0].id === "1") {
    console.log("1");
    isLoading.value = false;
    pokemonList.value = donnees_localstorage;
  } else {
    try {
      console.log("2");
      // 1) si tu a quelque chose , alors affiche local storage
      // 2) si tu n'as pas alors recupere de 'API'

      // "https://pokeapi.co/api/v2/pokemon?limit=1025"

      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1025"
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
        <!-- pokemon.names.language == fr language.name -->
      </li>

      <!-- <img src="{{pokemon.url}}" alt="" /> -->
    </ul>
  </div>
</template>
