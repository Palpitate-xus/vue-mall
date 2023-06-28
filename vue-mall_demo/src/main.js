// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import App from './App.vue';
// import Vuex from 'vuex';
import store from './store'

Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
// let myvue = new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

// console.log(store);
// console.log(myvue.$store);
let myvue = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

// console.log(myvue.$store);