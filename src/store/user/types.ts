import { DestroySessionActionTypes } from '../destroy_session'

export type UserState = {
  _id: string
  name: string
  email: string
  picture: string
  token: string
  isAdmin: boolean
  isEmailConfirmed: boolean
}

export const CREATE_USER = 'CREATE_USER'

export const EDIT_USER = 'EDIT_USER'

export const FETCH_USER = 'FETCH_USER'

export const SET_LOGGED_USER = 'SET_LOGGED_USER'

export const SET_NOT_LOGGED_USER = 'SET_NOT_LOGGED_USER'

export const SET_USER_CONFIRMED_EMAIL = 'SET_USER_CONFIRMED_EMAIL'

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

export interface SetUserConfirmedEmailAction {
  type: typeof SET_USER_CONFIRMED_EMAIL
  payload: UserState
}

export type UserActionsTypes =
  | CreateUserAction
  | EditUserAction
  | FetchUserAction
  | SetLoggedUserAction
  | SetNotLoggedUserAction
  | SetUserConfirmedEmailAction
  | DestroySessionActionTypes
