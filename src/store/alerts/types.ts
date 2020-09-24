import { DestroySessionActionTypes } from '../destroy_session'

export type AlertsState = {
  _id: string
  title: string
  content: string
  severity: number
  date: Date
}[]

export interface CreateAlertData {
  title: string
  content: string
  severity: number
}

export interface EditAlertData {
  _id: string
  title: string
  content: string
  severity: number
}

export const FETCH_ALERTS = 'FETCH_ALERTS'

export const CREATE_ALERT = 'CREATE_ALERT'

export const EDIT_ALERT = 'EDIT_ALERT'

export const DELETE_ALERT = 'DELETE_ALERT'

export const UPDATE_ALERTS = 'UPDATE_ALERTS'

export interface FetchAlertsAction {
  type: typeof FETCH_ALERTS
  payload: AlertsState
}

export interface CreateAlertAction {
  type: typeof CREATE_ALERT
  payload: AlertsState
}

export interface EditAlertAction {
  type: typeof EDIT_ALERT
  payload: AlertsState
}

export interface DeleteAlertAction {
  type: typeof DELETE_ALERT
  payload: AlertsState
}

export interface UpdateAlertsAction {
  type: typeof UPDATE_ALERTS
  payload: AlertsState
}

export type AlertsActionsTypes =
  | FetchAlertsAction
  | CreateAlertAction
  | EditAlertAction
  | DeleteAlertAction
  | UpdateAlertsAction
  | DestroySessionActionTypes
