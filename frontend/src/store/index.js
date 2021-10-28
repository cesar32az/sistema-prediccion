import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import { notify } from "./notify.module";
import { gastos } from "./gastos.module";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    notify,
    gastos
  },
});
