import { serverAPI } from 'src/services'
import {
  UserState,
  CreateUserAction,
  EditUserAction,
  FetchUserAction,
  CREATE_USER,
  EDIT_USER,
  FETCH_USER,
  CreateUserData,
  EditUserData,
  FetchUserData,
  SetLoggedUserAction,
  SetNotLoggedUserAction,
  SetUserConfirmedEmailAction,
  SET_LOGGED_USER,
  SET_NOT_LOGGED_USER,
  SET_USER_CONFIRMED_EMAIL
} from './types'

const setLoggedUser = (userSession: UserState): SetLoggedUserAction => {
  return {
    type: SET_LOGGED_USER,
    payload: userSession
  }
}

const setNotLoggedUser = (): SetNotLoggedUserAction => {
  return {
    type: SET_NOT_LOGGED_USER,
    payload: false
  }
}

const createUser = async (data: CreateUserData): Promise<CreateUserAction> => {
  const formData = new FormData()

  formData.append('name', data.name)
  formData.append('email', data.email)
  formData.append('password', data.password)
  formData.append(
    'picture',
    typeof data.picture !== 'string'
      ? {
          name: data.picture.fileName,
          type: data.picture.type,
          uri: data.picture.uri
        }
      : data.picture
  )

  const response = await serverAPI.post<UserState>('/register', formData)

  return {
    type: CREATE_USER,
    payload: response.data
  }
}

const editUser = async (
  userSession: UserState,
  data: EditUserData
): Promise<EditUserAction> => {
  const formData = new FormData()

  formData.append('name', data.name)
  formData.append('email', data.email)
  formData.append('oldPassword', data.oldPassword)
  formData.append('newPassword', data.newPassword)
  formData.append(
    'picture',
    typeof data.picture !== 'string'
      ? {
          name: data.picture.fileName,
          type: data.picture.type,
          uri: data.picture.uri
        }
      : data.picture
  )

  const response = await serverAPI.put<UserState>('/edit-user', formData)

  return {
    type: EDIT_USER,
    payload: { ...response.data, token: userSession.token }
  }
}

const fetchUser = async (data: FetchUserData): Promise<FetchUserAction> => {
  const response = await serverAPI.post<UserState>('/login', { ...data })

  return {
    type: FETCH_USER,
    payload: response.data
  }
}

const setUserConfirmedEmail = (
  userSession: UserState
): SetUserConfirmedEmailAction => {
  return {
    type: SET_USER_CONFIRMED_EMAIL,
    payload: { ...userSession, isEmailConfirmed: true }
  }
}

export {
  createUser,
  editUser,
  fetchUser,
  setLoggedUser,
  setNotLoggedUser,
  setUserConfirmedEmail
}
