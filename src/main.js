import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Buefy from 'buefy'
// import '@mdi/font/css/materialdesignicons.css'
import './assets/scss/app.scss'
import { VueEditor } from 'vue2-editor'

// Composant applicatif
import EmptySlot from '@/components/EmptySlot'
import TabHeader from '@/components/TabHeader'
import ActionButton from '@/components/ActionButton'
import FormHeader from '@/components/FormHeader'
import FormFooter from '@/components/FormFooter'
import FieldAdresse from '@/components/FieldAdresse'
import LabelValue from '@/components/LabelValue'
import Pagination from '@/components/Pagination'

Vue.use(Buefy)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Buefy)
Vue.component('vue-editor', VueEditor)

Vue.component('empty-slot', EmptySlot)
Vue.component('tab-header', TabHeader)
Vue.component('action-button', ActionButton)
Vue.component('form-header', FormHeader)
Vue.component('form-footer', FormFooter)
Vue.component('field-adresse', FieldAdresse)
Vue.component('label-value', LabelValue)
Vue.component('pagination', Pagination)

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
