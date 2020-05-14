import alert from '@/store/modules/alert.js'
import { NotificationProgrammatic as Notification } from 'buefy'

describe('store/alert/mutations', () => {
  const notification = { message: 'message', type: 'success' }

  it('Should save notification, if notification', () => {
    alert.mutations.SET_NOTIFICATION(alert.state, notification)
    expect(alert.state.notification).toEqual(notification)
  })
})

describe('store/alert/actions', () => {
  Notification.open = jest.fn()
  const commit = jest.fn()
  const message = 'message'

  it('addNotificationSuccessSave', async () => {
    const notificationSuccessSave = {
      message: alert.messageEnregistrement,
      type: alert.success
    }
    await alert.actions.addNotificationSuccessSave({ commit })
    expect(commit).toHaveBeenCalledWith(
      'SET_NOTIFICATION',
      notificationSuccessSave
    )
    expect(Notification.open).toHaveBeenCalled()
  })

  it('addNotificationSuccessDelete', async () => {
    const notificationSuccessDelete = {
      message: alert.messageSuppression,
      type: alert.success
    }
    await alert.actions.addNotificationSuccessDelete({ commit })
    expect(commit).toHaveBeenCalledWith(
      'SET_NOTIFICATION',
      notificationSuccessDelete
    )
    expect(Notification.open).toHaveBeenCalled()
  })

  it('addNotificationSuccess', async () => {
    const notificationSuccess = {
      message: message,
      type: alert.success
    }
    await alert.actions.addNotificationSuccess({ commit }, message)
    expect(commit).toHaveBeenCalledWith('SET_NOTIFICATION', notificationSuccess)
    expect(Notification.open).toHaveBeenCalled()
  })

  it('addNotificationError', async () => {
    const notificationError = {
      message: "Quelque chose s'est mal passé : " + message,
      type: alert.error
    }
    await alert.actions.addNotificationError({ commit }, message)
    expect(commit).toHaveBeenCalledWith('SET_NOTIFICATION', notificationError)
    expect(Notification.open).toHaveBeenCalled()
  })

  it('addNotificationWarning', async () => {
    const notificationWarning = {
      message: message,
      type: alert.warning
    }
    await alert.actions.addNotificationWarning({ commit }, message)
    expect(commit).toHaveBeenCalledWith('SET_NOTIFICATION', notificationWarning)
    expect(Notification.open).toHaveBeenCalled()
  })
})
