import UserService from '@/services/UserService.js'
import router from '@/router'

export const state = {
  user: {},
  isAuthenticated: false
}

export const getters = {
  authenticatedUser: state => state.user,
  isAuthenticated: state => state.isAuthenticated
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_AUTHENTICATED(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  }
}

export const actions = {
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
