import {
  NotificationState,
  NotificationActionsTypes,
  INCREASE_NOTIFICATION,
  RESET_NOTIFICATION
} from './types'

const initialState = 0

const alertsReducer = (
  state: NotificationState = initialState,
  action: NotificationActionsTypes
): NotificationState => {
  switch (action.type) {
    case INCREASE_NOTIFICATION:
      return state + 1
    case RESET_NOTIFICATION:
      return initialState

    default:
      return state
  }
}

export default alertsReducer
