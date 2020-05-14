import UserService from '@/services/UserService.js'
import router from '@/router'

const state = {
  user: {},
  isAuthenticated: false
}

const getters = {
  authenticatedUser: state => state.user,
  isAuthenticated: state => state.isAuthenticated
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_AUTHENTICATED(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  }
}

const actions = {
  fetchUser({ commit, state, dispatch }, id) {
    if (id == state.user.id) {
      return state.user
    } else {
      return UserService.getUser(id)
        .then(response => {
          commit('SET_USER', response.data)
          commit('SET_AUTHENTICATED', true)
          dispatch(
            'addNotificationSuccess',
            'Bienvenue ' + response.data.nomPrenom
          )
          router.push({ name: 'Clients' })
          return response.data
        })
        .catch(e => {
          dispatch('addNotificationError', e.response.data)
        })
    }
  },
  disconnectUser({ commit }) {
    commit('SET_USER', {})
    commit('SET_AUTHENTICATED', false)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
