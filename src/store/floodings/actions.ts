import { serverAPI } from 'src/services'
import {
  FETCH_FLOODINGS,
  CREATE_FLOODING,
  EDIT_FLOODING,
  REMOVE_FLOODING,
  UPDATE_FLOODINGS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_COMMENT,
  AddFavoriteAction,
  RemoveFavoriteAction,
  FetchFloodingsAction,
  CreateFloodingAction,
  EditFloodingAction,
  RemoveFloodingAction,
  UpdateFloodingsAction,
  AddCommentAction,
  CreateFloodingData,
  EditFloodingData,
  FloodingsState
} from './types'

const addFavorite = async (_id: string): Promise<AddFavoriteAction> => {
  const response = await serverAPI.post<FloodingsState>('/add-favorite', {
    _id
  })

  return {
    type: ADD_FAVORITE,
    payload: response.data
  }
}

const removeFavorite = async (_id: string): Promise<RemoveFavoriteAction> => {
  const response = await serverAPI.post<FloodingsState>('/remove-favorite', {
    _id
  })

  return {
    type: REMOVE_FAVORITE,
    payload: response.data
  }
}

const updateFloodings = (data: FloodingsState): UpdateFloodingsAction => {
  return {
    type: UPDATE_FLOODINGS,
    payload: data
  }
}

const fetchFloodings = async (): Promise<FetchFloodingsAction> => {
  const response = await serverAPI.get<FloodingsState>('/floodings')

  return {
    type: FETCH_FLOODINGS,
    payload: response.data
  }
}

const createFlooding = async (
  data: CreateFloodingData
): Promise<CreateFloodingAction> => {
  const formData = new FormData()

  formData.append('title', data.title)
  formData.append('address', data.address)
  formData.append('latitude', data.latitude)
  formData.append('longitude', data.longitude)
  formData.append('severity', data.severity)
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

  const response = await serverAPI.post<FloodingsState>('/flooding', formData)

  return {
    type: CREATE_FLOODING,
    payload: response.data
  }
}

const editFlooding = async (
  data: EditFloodingData
): Promise<EditFloodingAction> => {
  const formData = new FormData()

  formData.append('_id', data._id)
  formData.append('title', data.title)
  formData.append('address', data.address)
  formData.append('latitude', data.latitude)
  formData.append('longitude', data.longitude)
  formData.append('severity', data.severity)
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

  const response = await serverAPI.put<FloodingsState>('/flooding', formData)

  return {
    type: EDIT_FLOODING,
    payload: response.data
  }
}

const removeFlooding = async (_id: string): Promise<RemoveFloodingAction> => {
  const response = await serverAPI.delete<FloodingsState>(`/flooding`, {
    data: { _id }
  })

  return {
    type: REMOVE_FLOODING,
    payload: response.data
  }
}

const addComment = async (
  _id: string,
  message: string
): Promise<AddCommentAction> => {
  const response = await serverAPI.post<FloodingsState>(`/add-comment`, {
    _id,
    message
  })

  return {
    type: ADD_COMMENT,
    payload: response.data
  }
}

export {
  updateFloodings,
  fetchFloodings,
  createFlooding,
  editFlooding,
  removeFlooding,
  addFavorite,
  removeFavorite,
  addComment
}
