import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

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

/**
 * L'utilisateur doit être connecté pour visualiser les pages autre que accueil
 * @params to route où l'on va
 * @params from route d'où l'on vient
 * @params next déclenchement de la navigation
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else {
    if (store.getters.isAuthenticated) {
      next()
    } else {
      store.dispatch(
        'addNotificationWarning',
        'Vous devez être authentifié pour visualiser cette page'
      )
      next(false)
      router.push('/')
    }
  }
})

export default router
