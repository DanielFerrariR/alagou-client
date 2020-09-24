import {
  AlertsState,
  AlertsActionsTypes,
  FETCH_ALERTS,
  CREATE_ALERT,
  EDIT_ALERT,
  DELETE_ALERT,
  UPDATE_ALERTS
} from './types'

const initialState = null

const alertsReducer = (
  state: AlertsState | null = initialState,
  action: AlertsActionsTypes
): AlertsState | null => {
  switch (action.type) {
    case FETCH_ALERTS:
      return action.payload
    case CREATE_ALERT:
      return action.payload
    case EDIT_ALERT:
      return action.payload
    case DELETE_ALERT:
      return action.payload
    case UPDATE_ALERTS:
      return action.payload
    default:
      return state
  }
}

export default alertsReducer
