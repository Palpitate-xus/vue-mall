import Vue from 'vue';
import Vuex from 'vuex';
import cartModule from './modules/cart';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cart: cartModule,
  }
});

export default store;
