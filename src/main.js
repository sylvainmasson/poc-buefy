import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Buefy from 'buefy'
import '@mdi/font/css/materialdesignicons.css'
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
import FieldInput from '@/components/FieldInput'
import FieldRichText from '@/components/FieldRichText'
import FieldUploadImage from '@/components/FieldUploadImage'
import FieldAvatar from '@/components/FieldAvatar'

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
Vue.component('field-input', FieldInput)
Vue.component('field-richtext', FieldRichText)
Vue.component('field-upload-image', FieldUploadImage)
Vue.component('field-avatar', FieldAvatar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
