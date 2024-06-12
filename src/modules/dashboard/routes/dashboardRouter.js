import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from '../views/dashboardList.vue'
Vue.use(VueRouter)

const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
    },
]

export default dashboardRoutes
