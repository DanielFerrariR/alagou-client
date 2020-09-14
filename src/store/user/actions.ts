import { serverAPI } from 'src/services'
import {
  UserState,
  CreateUserAction,
  FetchUserAction,
  AddFavoriteAction,
  RemoveFavoriteAction,
  AddFavoriteAxiosResponse,
  RemoveFavoriteAxiosResponse,
  CREATE_USER,
  FETCH_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CreateUserData,
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
    '/add_favorite',
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
    '/remove_favorite',
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
  if (data.picture) {
    formData.append('picture', {
      name: data.picture.fileName,
      type: data.picture.type,
      uri: data.picture.uri
    })
  }

  const response = await serverAPI.post<UserState>('/register', formData)

  return {
    type: CREATE_USER,
    payload: response.data
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
  fetchUser,
  setLoggedUser,
  setNotLoggedUser,
  addFavorite,
  removeFavorite
}
