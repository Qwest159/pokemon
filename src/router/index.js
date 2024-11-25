import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Pokedex from "../views/Pokedex.vue";
import ShowView from "@/views/ShowView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/pokedex",
      name: "Pokedex",
      component: Pokedex,
    },
    {
      path: "/show/:id",
      name: "pokemon",
      component: ShowView,
      props: true,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
