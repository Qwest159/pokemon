<script setup>
import { ref, onMounted } from "vue";
import { version } from "../version/Version.vue";
import gen1 from "../stockage/gen1.json";
// import rechercher from "./Recherche.vue";

// let count_uptade = 1025

// DOIS FAIRE ATTENTION POUR LA MISE A JOUR => SI LOCAL STORAGE COUNT == COUNT DU donnees_localstorage[0].id === "1"

let pokemonRecherche = ref([]);

function function_rechercher() {
  pokemonRecherche.value = pokemonList.value;

  pokemonRecherche.value = pokemonList.value.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(search.value.toLowerCase());
  });

  // for (let index = 0; index < pokemonRecherche.length; index++) {
  //   const element = array[index];
  // }

  // let pokemongood = pokemonRecherche.filter(search.value).name;
  // console.log(pokemongood);
}

const version_actuelle = version;

let pokemonList = ref([]);
const isLoading = ref(true);
const error = ref(null);

async function fetchPokemonList() {
  let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));
  let version_localstorage = JSON.parse(localStorage.getItem("version"));

  // console.log(donnees_localstorage);

  if (
    donnees_localstorage !== null &&
    donnees_localstorage[0].id == "1" &&
    version_localstorage == version_actuelle
  ) {
    // if (donnees_localstorage !== null) {
    console.log("1");
    isLoading.value = false;
    pokemonList.value = donnees_localstorage;
    pokemonRecherche.value = donnees_localstorage;
  } else {
    try {
      console.log("2");

      const response = await fetch(
        // "https://pokeapi.co/api/v2/pokemon?limit=1025"
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      // 1 boucle par pokemon
      // recup les elements
      let generation1 = 151;
      // const response_details = await fetch(
      //   `https://pokeapi.co/api/v2/pokemon/${pokemon_id}/`
      // );
      const data = await response.json();
      // const data_details = await response_details.json();

      // for (let index = 0; index <= generation1; index++) {
      //   const element = array[index];

      // }
      //
      for (let index = 0; index < data.results.length; index++) {
        pokemonList.value.push({
          id: index + 1,
          name: gen1[index].name,
        });
      }

      localStorage.setItem("version", JSON.stringify(version_actuelle));
      localStorage.setItem("pokemon", JSON.stringify(pokemonList.value));

      let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));
      pokemonList.value = donnees_localstorage;
      pokemonRecherche.value = donnees_localstorage;
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

  <!-- <rechercher :rechercher_pokemon="pokemonList" /> -->
  <label class="mx-4 font-bold">Recherche : </label
  ><input
    class="mr-5 w-64"
    type="search"
    name="search"
    id="search"
    placeholder="Recherche ton pokémon"
    @input="function_rechercher"
  />
  <div class="my-10">
    <div v-if="isLoading"></div>
    <div v-else-if="error">Une erreur est survenue : {{ error.message }}</div>
    <!-- bordure du cadre -->
    <ul v-else class="flex flex-wrap gap-4 justify-evenly">
      <!-- cadre intérieur -->
      <li
        class="border-2 grid grid-flow-col rounded-lg p-3 w-44 drop-shadow-2xl"
        v-for="pokemon in pokemonRecherche"
        :key="pokemon.name"
      >
        <router-link :to="`/show/${pokemon.id}`">
          <!-- <a :href="`/show/${pokemon.id}`"> -->
          <p class="">
            {{
              pokemon.id < 10
                ? "000" + pokemon.id
                : pokemon.id < 100
                ? "00" + pokemon.id
                : pokemon.id < 1000
                ? "0" + pokemon.id
                : pokemon.id
            }}
          </p>
          <h1 class="font-semibold">{{ pokemon.name }}</h1>
          <figure class="justify-items-center">
            <img
              class="w-28"
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
              :alt="pokemon.name"
            />
          </figure>
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
<style></style>
