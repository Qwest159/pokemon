<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper bg-orange-300 p-3 mb-5">
    <nav class="flex items-center">
      <img
        class="w-20 mr-3"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/83.png"
        alt="Canarticho"
      />
      <p>
        <RouterLink to="/">Home</RouterLink>
      </p>
      <p><RouterLink to="/pokedex">Pokedex</RouterLink></p>

      <!-- <RouterLink to="/show/2">Pokedex</RouterLink> -->
    </nav>
  </div>

  <RouterView />
</template>

<style scoped>
p {
  @apply text-lg;
  @apply text-slate-950;
}
</style>
