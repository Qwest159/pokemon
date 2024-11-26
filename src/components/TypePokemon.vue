<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({
  id: {
    type: String,
  },
});
let pokemonList = ref([]);
const pokemon_id = props.id;

let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));

pokemonList.value = donnees_localstorage[pokemon_id - 1];
console.log(pokemon_id);

console.log(donnees_localstorage[pokemon_id - 1]);
</script>
<template>
  <figure class="">
    <img class="w-6" src="../../public/image/types/plante.png" alt="" />
  </figure>
</template>
