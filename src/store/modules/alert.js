import { NotificationProgrammatic as Notification } from 'buefy'

const messageEnregistrement = 'Enregistrement effectué avec succès'
const messageSuppression = 'Suppression effectué avec succès'
const success = 'is-success'
const warning = 'is-warning'
const error = 'is-danger'

function notificationOpen(notification) {
  Notification.open({
    duration: 5000,
    message: notification.message,
    type: notification.type,
    hasIcon: true,
    queue: false
  })
}

export const state = {
  notification: {}
}

export const mutations = {
  SET_NOTIFICATION(state, notification) {
    state.notification = notification
  }
}

export const actions = {
  addNotificationSuccessSave({ commit }) {
    const notification = { message: messageEnregistrement, type: success }
    commit('SET_NOTIFICATION', notification)
    notificationOpen(notification)
  },

  addNotificationSuccessDelete({ commit }) {
    const notification = { message: messageSuppression, type: success }
    commit('SET_NOTIFICATION', notification)
    notificationOpen(notification)
  },

  addNotificationSuccess({ commit }, message) {
    const notification = {
      message: message,
      type: success
    }
    commit('SET_NOTIFICATION', notification)
    notificationOpen(notification)
  },

  addNotificationError({ commit }, messageErreur) {
    const notification = {
      message: "Quelque chose s'est mal passé : " + messageErreur,
      type: error
    }
    commit('SET_NOTIFICATION', notification)
    notificationOpen(notification)
  },

  addNotificationWarning({ commit }, message) {
    const notification = {
      message: message,
      type: warning
    }
    commit('SET_NOTIFICATION', notification)
    notificationOpen(notification)
  }
}
