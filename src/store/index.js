import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import pagination from '@/store/modules/pagination'
import filter from '@/store/modules/filter'
import alert from '@/store/modules/alert'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

/**
 * Mise en place du stockage local pour vuex dans host-vuex
 */
const vuexLocal = new VuexPersistence({
  key: window.location.host + '-vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    user,
    pagination,
    filter,
    alert
  },
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  plugins: [vuexLocal.plugin]
})
