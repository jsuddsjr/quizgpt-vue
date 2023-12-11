import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap";

// import './style.css'
import { createApp } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import GuessAge from "./components/GuessAge.vue";
import Question from "./components/Question.vue";
import { RouteLocationNormalized, createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

const routes = [
  {
    path: "/",
    component: HelloWorld,
    name: "home",
    props: (route: RouteLocationNormalized) => ({ msg: route.query.msg || "Vite + Vue" }),
  },
  { path: "/guess", component: GuessAge, name: "guess" },
  { path: "/question", component: Question, name: "question" },
  { path: "/:pathMatch(.*)", component: Question, name: "404" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
