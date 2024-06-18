import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap-vue/dist/bootstrap-vue.css';
//import 'bootstrap/dist/css/bootstrap.css';
//import { library } from '@fortawesome/fontawesome-svg-core';
//import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
//import { IconsPlugin } from 'bootstrap-vue';



/* router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next('/about');
  }
  next();
}); */



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
