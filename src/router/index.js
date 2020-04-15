import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () =>
      import(/* webpackChunkName: "clients" */ '../views/Clients.vue')
  },
  {
    path: '/clients/fiche/',
    name: 'ClientAjout',
    component: () =>
      import(/* webpackChunkName: "clientAjout" */ '../views/FicheClient.vue')
  },
  {
    path: '/clients/fiche/:id',
    name: 'ClientModification',
    component: () =>
      import(
        /* webpackChunkName: "clientModification" */ '../views/FicheClient.vue'
      ),
    props: true
  },
  {
    path: '/clients/detail/:id',
    name: 'ClientDetail',
    component: () =>
      import(/* webpackChunkName: "clientAjout" */ '../views/DetailClient.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
