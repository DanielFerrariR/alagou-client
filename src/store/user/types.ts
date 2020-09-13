import { DestroySessionActionTypes } from '../destroy_session'

export type UserState = {
  _id: string
  name: string
  email: string
  profilePhoto: {
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
  token: string
  level: number
}

export const CREATE_USER = 'CREATE_USER'

export const FETCH_USER = 'FETCH_USER'

export const SET_LOGGED_USER = 'SET_LOGGED_USER'

export const SET_NOT_LOGGED_USER = 'SET_NOT_LOGGED_USER'

export interface CreateUserData {
  name: string
  email: string
  password: string
  profilePhoto: {
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
  } | null
}

export interface FetchUserData {
  email: string
  password: string
}

export interface CreateUserAction {
  type: typeof CREATE_USER
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

export type UserActionsTypes =
  | CreateUserAction
  | FetchUserAction
  | SetLoggedUserAction
  | SetNotLoggedUserAction
  | DestroySessionActionTypes
