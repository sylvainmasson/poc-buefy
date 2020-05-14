import Vue from 'vue'

export default {
  getUser(id) {
    return Vue.axios.get(`users/${id}`)
  }
}
