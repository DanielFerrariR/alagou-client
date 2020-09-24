import {
  RESET_NOTIFICATION,
  ResetNotificationAction,
  IncreaseNotificationAction,
  INCREASE_NOTIFICATION
} from './types'

const increaseNotification = (): IncreaseNotificationAction => {
  return {
    type: INCREASE_NOTIFICATION
  }
}

const resetNotification = (): ResetNotificationAction => {
  return {
    type: RESET_NOTIFICATION
  }
}

export { increaseNotification, resetNotification }
