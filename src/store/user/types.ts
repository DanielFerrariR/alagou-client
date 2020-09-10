import { DestroySessionActionTypes } from '../destroy_session'

export type UserState = {
  name: string
  email: string
  profilePhoto: {
    name: string
    type: string
    uri: string
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
    name: string
    type: string
    uri: string
  }
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
