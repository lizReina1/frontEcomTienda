import Usuario from '../modules/Usuario/routes/loginRouter'
import Vue from 'vue'
import Vuex from 'vuex'
import Tienda from '../modules/tienda/routes/tiendaRouter'
import dashboard from '@/modules/dashboard/routes/dashboardRouter'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Usuario,
    Tienda,
    dashboard,
  },
})
