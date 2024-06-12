import Vue from 'vue'
import VueRouter from 'vue-router'
import tienda from '../views/tienda.vue'
Vue.use(VueRouter)

const tiendaRoutes = [
  {
    path: '/tienda',
    name: 'tienda',
    component: tienda
  },
]


export default tiendaRoutes
