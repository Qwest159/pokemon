<script setup>
import { defineProps, ref, onMounted } from "vue";
import { version } from "../version/Version.vue";
// let count_uptade = 1025

// DOIS FAIRE ATTENTION POUR LA MISE A JOUR => SI LOCAL STORAGE COUNT == COUNT DU donnees_localstorage[0].id === "1"

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// ATTENTION ID -1 (met +1 par rapport au lien)
const pokemon_id = props.id;
const version_actuelle = version;
console.log(version_actuelle);

let pokemonList = ref([]);
const isLoading = ref(true);
const error = ref(null);

async function fetchPokemonList() {
  let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));
  let version_localstorage = JSON.parse(localStorage.getItem("version"));
  // console.log(donnees_localstorage[pokemon_id]);

  if (
    donnees_localstorage !== null &&
    donnees_localstorage[pokemon_id - 1].weight &&
    version_localstorage == version_actuelle
  ) {
    console.log("1");
    isLoading.value = false;

    pokemonList.value = donnees_localstorage[pokemon_id - 1];

    // console.log(pokemonList);
  } else {
    try {
      console.log("2");
      // 1) si tu a quelque chose , alors affiche local storage
      // 2) si tu n'as pas alors recupere de 'API'

      // "https://pokeapi.co/api/v2/pokemon?limit=1025"

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon_id}/`
      );
      const data = await response.json();

      // let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));
      // console.log(donnees_localstorage[pokemon_id]);
      // console.log(pokemon_id);

      const transformweight = String(data.weight);
      console.log(transformweight);
      let new_weight = "";
      console.log(transformweight.length);

      for (let index = 0; index < transformweight.length; index++) {
        if (
          transformweight.length - 1 === index &&
          transformweight.length != 1
        ) {
          new_weight += ",";
        }
        if (transformweight.length === 1) {
          new_weight += "0,";
        }
        new_weight += transformweight[index];
      }

      console.log(new_weight);

      donnees_localstorage[pokemon_id - 1] = {
        id: pokemon_id,
        name: data.name,
        weight: new_weight,
      };

      // console.log(pokemonList.value);

      // DONNEE STORAGE
      localStorage.setItem("version", JSON.stringify(version_actuelle));

      localStorage.setItem("pokemon", JSON.stringify(donnees_localstorage));
      pokemonList.value = donnees_localstorage[pokemon_id - 1];
      // console.log(donnees_localstorage);
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
      <div>
        <h2>Version originale</h2>
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonList.id}.png`"
          :alt="pokemonList.name"
        />
      </div>
      <div>
        <h2>Version chromatique</h2>
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonList.id}.png`"
          :alt="pokemonList.name"
        />
      </div>
      Poids:
      {{
        pokemonList.weight
      }}
      kg
      <!-- pokemon.names.language == fr language.name -->

      <!-- <img src="{{pokemon.url}}" alt="" /> -->
    </ul>
  </div>
</template>
