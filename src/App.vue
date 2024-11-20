<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/pokedex">Pokedex</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>

<style scoped></style>
