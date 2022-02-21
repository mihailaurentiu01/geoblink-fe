import VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./pages/States/index.vue")
  }
];

const router = new VueRouter({ mode: "history", routes });

export default router;
