<script setup>
import { defineProps, ref, onMounted } from "vue";
import { version } from "../version/Version.vue";
import TypePokemon from "../components/TypePokemon.vue";
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

let pokemonList = ref([]);
let pokemonType = ref();
let couleurBackground = ref();
const isLoading = ref(true);
const error = ref(null);

async function fetchPokemonList() {
  let donnees_localstorage = JSON.parse(localStorage.getItem("pokemon"));
  let version_localstorage = JSON.parse(localStorage.getItem("version"));
  const typeCouleur = {
    grass: {
      image: "../../public/image/types/plante.png",
      couleur: "bg-green-600",
    },
    bug: {
      image: "../../public/image/types/plante.png",
      couleur: "bg-green-600",
    },
    fire: {
      image: "../../public/image/types/feu.png",
      couleur: "bg-red-600",
    },
    water: {
      image: "../../public/image/types/eau.png",
      couleur: "bg-cyan-500",
    },
    ice: {
      image: "../../public/image/types/eau.png",
      couleur: "bg-cyan-500",
    },
    fighting: {
      image: "../../public/image/types/combat.png",
      couleur: "bg-yellow-700",
    },
    rock: {
      image: "../../public/image/types/combat.png",
      couleur: "bg-yellow-700",
    },
    ground: {
      image: "../../public/image/types/combat.png",
      couleur: "bg-yellow-700",
    },
    dragon: {
      image: "../../public/image/types/dragon.png",
      couleur: "bg-yellow-600",
    },
    electric: {
      image: "../../public/image/types/electricite.png",
      couleur: "bg-yellow-400",
    },
    metal: {
      image: "../../public/image/types/metal.png",
      couleur: "bg-gray-600",
    },
    psychic: {
      image: "../../public/image/types/psy.png",
      couleur: "bg-purple-500",
    },
    dark: {
      image: "../../public/image/types/tenebre.png",
      couleur: "bg-gray-500",
    },
    normal: {
      image: "../../public/image/types/normal.png",
      couleur: "bg-gray-300",
    },
    poison: {
      image: "../../public/image/types/psy.png",
      couleur: "bg-purple-500",
    },
  };

  console.log(donnees_localstorage[pokemon_id - 1].type);

  // console.log(donnees_localstorage[pokemon_id]);

  if (
    donnees_localstorage !== null &&
    donnees_localstorage[pokemon_id - 1].weight &&
    version_localstorage == version_actuelle
  ) {
    console.log("1");
    isLoading.value = false;
    pokemonList.value = donnees_localstorage[pokemon_id - 1];

    let imageType1 =
      typeCouleur[donnees_localstorage[pokemon_id - 1].type[0]]?.image;
    let imageType2 =
      typeCouleur[donnees_localstorage[pokemon_id - 1].type[1]]?.image;
    pokemonType.value = imageType1 || imageType2;

    let ColorType1 =
      typeCouleur[donnees_localstorage[pokemon_id - 1].type[0]]?.couleur;
    let ColorType2 =
      typeCouleur[donnees_localstorage[pokemon_id - 1].type[1]]?.couleur;
    couleurBackground = ColorType1 || ColorType2;
    console.log(couleurBackground);
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
      let new_weight = "";

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
      console.log(data.types[0].type.name);

      donnees_localstorage[pokemon_id - 1] = {
        id: pokemon_id,
        name: data.name,
        weight: new_weight,
        type: [data.types[0].type.name, data.types[1]?.type.name].filter(
          Boolean
        ),
      };

      // DONNEE STORAGE
      localStorage.setItem("version", JSON.stringify(version_actuelle));

      localStorage.setItem("pokemon", JSON.stringify(donnees_localstorage));

      //DONNEE A AFFICHER
      pokemonList.value = donnees_localstorage[pokemon_id - 1];

      let imageType1 =
        typeCouleur[donnees_localstorage[pokemon_id - 1].type[0]]?.image;
      let imageType2 =
        typeCouleur[donnees_localstorage[pokemon_id - 1].type[1]]?.image;
      pokemonType.value = imageType1 || imageType2;

      let ColorType1 =
        typeCouleur[donnees_localstorage[pokemon_id - 1].type[0]]?.couleur;
      let ColorType2 =
        typeCouleur[donnees_localstorage[pokemon_id - 1].type[1]]?.couleur;
      couleurBackground = ColorType1 || ColorType2;
      console.log(couleurBackground);
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  }
}

onMounted(() => {
  fetchPokemonList();

  console.log(pokemonType.value);
});

// ../../public/image/types/plante.png
</script>

<template>
  <h1>Pokedex</h1>
  <div>
    <div v-if="isLoading"></div>
    <div v-else-if="error">Une erreur est survenue : {{ error.message }}</div>
    <ul v-else>
      <article
        :class="`${couleurBackground}`"
        class="m-2 border-8 border-black w-56 flex flex-col items-center rounded-lg"
      >
        <section class="flex space-x-1 items-center">
          <p>
            {{
              pokemonList.id < 10
                ? "000" + pokemonList.id
                : pokemonList.id < 100
                ? "00" + pokemonList.id
                : pokemonList.id < 1000
                ? "0" + pokemonList.id
                : pokemonList.id
            }}
          </p>
          <p class="font-bold p-0.5">{{ pokemonList.name }}</p>

          <figure class="">
            <img
              class="w-7 bg-black rounded-full p-0.5"
              :src="`${pokemonType}`"
              alt=""
            />
          </figure>
          <!-- <TypePokemon></TypePokemon> -->
        </section>
        <!-- <figure class="border-2 border-black"> -->

        <figure class="">
          <img
            class="w-36"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonList.id}.png`"
            :alt="pokemonList.name"
          />
        </figure>
      </article>

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
