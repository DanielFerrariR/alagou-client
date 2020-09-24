import { DestroySessionActionTypes } from '../destroy_session'

export type NotificationState = number

export const INCREASE_NOTIFICATION = 'INCREASE_NOTIFICATION'

export const RESET_NOTIFICATION = 'RESET_NOTIFICATION'

export interface IncreaseNotificationAction {
  type: typeof INCREASE_NOTIFICATION
}

export interface ResetNotificationAction {
  type: typeof RESET_NOTIFICATION
}

export type NotificationActionsTypes =
  | IncreaseNotificationAction
  | ResetNotificationAction
  | DestroySessionActionTypes
