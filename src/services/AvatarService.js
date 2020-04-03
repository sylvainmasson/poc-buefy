import Vue from 'vue'

export default {
  getAvatar (id) {
    return Vue.axios.get(`avatars/${id}`)
  },
  addAvatar (avatar) {
    return Vue.axios.post('avatars', avatar)
  }
}
