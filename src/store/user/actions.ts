import { serverAPI } from 'src/services'
import {
  UserState,
  CreateUserAction,
  EditUserAction,
  FetchUserAction,
  AddFavoriteAction,
  RemoveFavoriteAction,
  AddFavoriteAxiosResponse,
  RemoveFavoriteAxiosResponse,
  CREATE_USER,
  EDIT_USER,
  FETCH_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CreateUserData,
  EditUserData,
  FetchUserData,
  SetLoggedUserAction,
  SetNotLoggedUserAction,
  SET_LOGGED_USER,
  SET_NOT_LOGGED_USER
} from './types'

const addFavorite = async (
  userSession: UserState,
  _id: string
): Promise<AddFavoriteAction> => {
  const response = await serverAPI.post<AddFavoriteAxiosResponse>(
    '/add-favorite',
    {
      _id
    }
  )

  return {
    type: ADD_FAVORITE,
    payload: { ...response.data, token: userSession.token }
  }
}

const removeFavorite = async (
  userSession: UserState,
  _id: string
): Promise<RemoveFavoriteAction> => {
  const response = await serverAPI.post<RemoveFavoriteAxiosResponse>(
    '/remove-favorite',
    {
      _id
    }
  )

  return {
    type: REMOVE_FAVORITE,
    payload: { ...response.data, token: userSession.token }
  }
}

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

export {
  createUser,
  editUser,
  fetchUser,
  setLoggedUser,
  setNotLoggedUser,
  addFavorite,
  removeFavorite
}
