<script setup>
import { defineProps, ref, onMounted } from "vue";

// let count_uptade = 1025

// DOIS FAIRE ATTENTION POUR LA MISE A JOUR => SI LOCAL STORAGE COUNT == COUNT DU donnees_localstorage[0].id === "1"

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const pokemon_id = props.id - 1;

let pokemonList = ref([]);

const isLoading = ref(true);
const error = ref(null);

async function fetchPokemonList() {
  let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));
  // console.log(donnees_localstorage[pokemon_id]);

  if (donnees_localstorage !== null && donnees_localstorage[0].id == "1") {
    // if (donnees_localstorage !== null) {
    console.log("1");
    isLoading.value = false;
    console.log(donnees_localstorage[pokemon_id]);

    pokemonList.value = donnees_localstorage[pokemon_id];

    // console.log(pokemonList);
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
      let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));
      pokemonList.value = donnees_localstorage[pokemon_id];
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  }
  // console.log("test");
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
      {{
        pokemonList.id < 10
          ? "000" + pokemonList.id
          : pokemonList.id < 100
          ? "00" + pokemonList.id
          : pokemonList.id < 1000
          ? "0" + pokemonList.id
          : pokemonList.id
      }}
      {{
        pokemonList.name
      }}
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonList.id}.png`"
        :alt="pokemonList.name"
      />
      <!-- pokemon.names.language == fr language.name -->

      <!-- <img src="{{pokemon.url}}" alt="" /> -->
    </ul>
  </div>
</template>
