import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap";

// import './style.css'
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Factorial from "./pages/Factorial.vue";
import GuessAge from "./pages/GuessAge.vue";
import HelloWorld from "./pages/HelloWorld.vue";
import Question from "./pages/Question.vue";

import {
  RouteLocationNormalized,
  createRouter,
  createWebHashHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    component: HelloWorld,
    name: "home",
    props: (route: RouteLocationNormalized) => ({
      msg: route.query.msg || "Vite + Vue",
    }),
  },
  { path: "/fact", component: Factorial, name: "factorial" },
  { path: "/guess", component: GuessAge, name: "guess" },
  { path: "/question", component: Question, name: "question" },
  { path: "/:pathMatch(.*)", component: Question, name: "404" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
