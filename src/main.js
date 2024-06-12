import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false
/* router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next('/about');
  }
  next();
}); */
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
