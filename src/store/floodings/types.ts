import { DestroySessionActionTypes } from '../destroy_session'

export type FloodingsState = {
  _id: string
  userId: string
  userName: string
  userPicture: string
  description: string
  address: string
  latitude: number
  longitude: number
  picture: string
  severity: number
  date: Date
}[]

export type CreateFloodingData = {
  description: string
  address: string
  latitude: number
  longitude: number
  picture: {
    fileSize: number
    type: string
    isVertical: true
    height: number
    path: string
    width: number
    originalRotation: number
    uri: string
    fileName: string
    timestamp: string
  }
  severity: number
  date: number
}

export const FETCH_FLOODINGS = 'FETCH_FLOODINGS'

export const CREATE_FLOODING = 'CREATE_FLOODING'

export const UPDATE_FLOODINGS = 'UPDATE_FLOODINGS'

export type CreateFloodingAxiosResponse = FloodingsState

export type FetchFloodingsAxiosResponse = FloodingsState

export interface FetchFloodingsAction {
  type: typeof FETCH_FLOODINGS
  payload: FloodingsState
}

export interface CreateFloodingAction {
  type: typeof CREATE_FLOODING
  payload: FloodingsState
}

export interface UpdateFloodingsAction {
  type: typeof UPDATE_FLOODINGS
  payload: FloodingsState
}

export type FloodingActionsTypes =
  | CreateFloodingAction
  | FetchFloodingsAction
  | UpdateFloodingsAction
  | DestroySessionActionTypes
