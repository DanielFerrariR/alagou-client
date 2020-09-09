import { api } from 'src/utils'
import {
  UserState,
  CreateUserAction,
  FetchUserAction,
  CREATE_USER,
  FETCH_USER,
  CreateUserData,
  FetchUserData,
  SetLoggedUserAction,
  SetNotLoggedUserAction,
  SET_LOGGED_USER,
  SET_NOT_LOGGED_USER
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
  if (data.profilePhoto) {
    formData.append('profilePhoto', {
      name: data.profilePhoto.fileName,
      type: data.profilePhoto.type,
      uri: data.profilePhoto.uri
    })
  }

  const response = await api.post<UserState>('/register', formData)

  return {
    type: CREATE_USER,
    payload: response.data
  }
}

const fetchUser = async (data: FetchUserData): Promise<FetchUserAction> => {
  const response = await api.post<UserState>('/login', { ...data })

  return {
    type: FETCH_USER,
    payload: response.data
  }
}

export { createUser, fetchUser, setLoggedUser, setNotLoggedUser }
