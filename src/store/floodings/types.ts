import { DestroySessionActionTypes } from '../destroy_session'

export type FloodingsState = {
  _id: string
  userId: string
  userName: string
  userPicture: string
  title: string
  address: string
  latitude: number
  longitude: number
  picture: string
  severity: number
  date: Date
  favorites: string[]
  isVerified: boolean
  omitHours: boolean
  messages: {
    _id: string
    message: string
    userId: string
    userName: string
    userPicture: string
    date: Date
    loading: boolean
  }[]
}[]

export type CreateFloodingData = {
  title: string
  address: string
  latitude: number
  longitude: number
  picture:
    | {
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
    | string
  severity: number
}

export type EditFloodingData = {
  _id: string
  title: string
  address: string
  latitude: number
  longitude: number
  picture:
    | {
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
    | string
  severity: number
}

export type UploadFloodingsCSVData = {
  title: string
  longitude: number
  latitude: number
  severity: number
  date: number
  picture: string
  omitHours: boolean
  isVerified: boolean
}[]

export const FETCH_FLOODINGS = 'FETCH_FLOODINGS'

export const CREATE_FLOODING = 'CREATE_FLOODING'

export const EDIT_FLOODING = 'EDIT_FLOODING'

export const DELETE_FLOODING = 'DELETE_FLOODING'

export const UPDATE_FLOODINGS = 'UPDATE_FLOODINGS'

export const ADD_FAVORITE = 'ADD_FAVORITE'

export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export const ADD_COMMENT = 'ADD_COMMENT'

export const UPLOAD_FLOODINGS_CSV = 'UPLOAD_FLOODINGS_CSV'

export interface FetchFloodingsAction {
  type: typeof FETCH_FLOODINGS
  payload: FloodingsState
}

export interface CreateFloodingAction {
  type: typeof CREATE_FLOODING
  payload: FloodingsState
}

export interface EditFloodingAction {
  type: typeof EDIT_FLOODING
  payload: FloodingsState
}

export interface DeleteFloodingAction {
  type: typeof DELETE_FLOODING
  payload: FloodingsState
}

export interface UpdateFloodingsAction {
  type: typeof UPDATE_FLOODINGS
  payload: FloodingsState
}

export interface AddFavoriteAction {
  type: typeof ADD_FAVORITE
  payload: FloodingsState
}

export interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE
  payload: FloodingsState
}

export interface AddCommentAction {
  type: typeof ADD_COMMENT
  payload: FloodingsState
}

export interface UploadFloodingsCSVAction {
  type: typeof UPLOAD_FLOODINGS_CSV
  payload: FloodingsState
}

export type FloodingActionsTypes =
  | CreateFloodingAction
  | EditFloodingAction
  | DeleteFloodingAction
  | FetchFloodingsAction
  | UpdateFloodingsAction
  | AddFavoriteAction
  | RemoveFavoriteAction
  | AddCommentAction
  | UploadFloodingsCSVAction
  | DestroySessionActionTypes
