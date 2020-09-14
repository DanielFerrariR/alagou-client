import { DestroySessionActionTypes } from '../destroy_session'

export type UserState = {
  _id: string
  name: string
  email: string
  picture: string
  token: string
  level: number
  favorites: string[]
  isAdmin: boolean
}

export const CREATE_USER = 'CREATE_USER'

export const EDIT_USER = 'EDIT_USER'

export const FETCH_USER = 'FETCH_USER'

export const SET_LOGGED_USER = 'SET_LOGGED_USER'

export const SET_NOT_LOGGED_USER = 'SET_NOT_LOGGED_USER'

export const ADD_FAVORITE = 'ADD_FAVORITE'

export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export interface AddFavoriteAxiosResponse {
  _id: string
  name: string
  email: string
  picture: string
  level: number
  favorites: string[]
  isAdmin: boolean
}

export interface RemoveFavoriteAxiosResponse {
  _id: string
  name: string
  email: string
  picture: string
  level: number
  favorites: string[]
  isAdmin: boolean
}

export interface CreateUserData {
  name: string
  email: string
  password: string
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
}

export interface EditUserData {
  name: string
  email: string
  oldPassword: string
  newPassword: string
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
}

export interface FetchUserData {
  email: string
  password: string
}

export interface CreateUserAction {
  type: typeof CREATE_USER
  payload: UserState
}

export interface EditUserAction {
  type: typeof EDIT_USER
  payload: UserState
}

export interface FetchUserAction {
  type: typeof FETCH_USER
  payload: UserState
}

export interface SetLoggedUserAction {
  type: typeof SET_LOGGED_USER
  payload: UserState
}

export interface SetNotLoggedUserAction {
  type: typeof SET_NOT_LOGGED_USER
  payload: false
}

export interface AddFavoriteAction {
  type: typeof ADD_FAVORITE
  payload: UserState
}

export interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE
  payload: UserState
}

export type UserActionsTypes =
  | CreateUserAction
  | EditUserAction
  | FetchUserAction
  | SetLoggedUserAction
  | SetNotLoggedUserAction
  | AddFavoriteAction
  | RemoveFavoriteAction
  | DestroySessionActionTypes
