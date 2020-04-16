import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user'
import * as pagination from '@/store/modules/pagination'
import * as alert from '@/store/modules/alert'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    pagination,
    alert
  }
})
