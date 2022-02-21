import Vue from "vue";
import Vuex from "vuex";
// modules
import countries from "./modules/countries";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    countries
  }
});
