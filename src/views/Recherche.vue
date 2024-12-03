<script setup>
import { ref, onMounted } from "vue";
import { version } from "../version/Version.vue";
import gen1 from "../stockage/gen1.json";

const props = defineProps({
  rechercher_pokemon: {
    type: Array,
    default: [],
  },
});

const version_actuelle = version;

let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));
let version_localstorage = JSON.parse(localStorage.getItem("version"));

// console.log(donnees_localstorage);
</script>

<template></template>

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
