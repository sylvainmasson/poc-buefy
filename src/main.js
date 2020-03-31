import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Buefy from 'buefy'
import '@mdi/font/css/materialdesignicons.css'
import 'buefy/dist/buefy.css'
// import 'bulma/css/bulma.min.css'
// import '@/assets/css/appli.css'
import EmptySlot from '@/components/EmptySlot'
import TabHeader from '@/components/TabHeader'
import ActionButton from '@/components/ActionButton'
import FormHeader from '@/components/FormHeader'
import FormFooter from '@/components/FormFooter'
import FieldAdresse from '@/components/FieldAdresse'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Buefy)

Vue.component('empty-slot', EmptySlot)
Vue.component('tab-header', TabHeader)
Vue.component('action-button', ActionButton)
Vue.component('form-header', FormHeader)
Vue.component('form-footer', FormFooter)
Vue.component('field-adresse', FieldAdresse)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')