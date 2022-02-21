// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App";
import VueRouter from "vue-router";
import router from "./routes";
import store from "./store";
import i18n from "./i18n";

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  el: "#app",
  components: { App },
  store,
  template: "<App/>"
});
