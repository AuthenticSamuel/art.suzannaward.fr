import { type RouterOptions, createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Paintings from "@/views/Paintings.vue";

const routes: RouterOptions["routes"] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/peintures",
    name: "paintings",
    component: Paintings,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
