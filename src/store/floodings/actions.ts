import { serverAPI } from 'src/services'
import {
  FETCH_FLOODINGS,
  CREATE_FLOODING,
  EDIT_FLOODING,
  REMOVE_FLOODING,
  UPDATE_FLOODINGS,
  FetchFloodingsAction,
  CreateFloodingAction,
  EditFloodingAction,
  RemoveFloodingAction,
  UpdateFloodingsAction,
  CreateFloodingData,
  EditFloodingData,
  CreateFloodingAxiosResponse,
  EditFloodingAxiosResponse,
  RemoveFloodingAxiosResponse,
  FetchFloodingsAxiosResponse,
  FloodingsState
} from './types'

const updateFloodings = (data: FloodingsState): UpdateFloodingsAction => {
  return {
    type: UPDATE_FLOODINGS,
    payload: data
  }
}

const fetchFloodings = async (): Promise<FetchFloodingsAction> => {
  const response = await serverAPI.get<FetchFloodingsAxiosResponse>(
    '/floodings'
  )

  return {
    type: FETCH_FLOODINGS,
    payload: response.data
  }
}

const createFlooding = async (
  data: CreateFloodingData
): Promise<CreateFloodingAction> => {
  const formData = new FormData()

  formData.append('description', data.description)
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
  formData.append('date', data.date)

  const response = await serverAPI.post<CreateFloodingAxiosResponse>(
    '/flooding',
    formData
  )

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
  formData.append('description', data.description)
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

  const response = await serverAPI.put<EditFloodingAxiosResponse>(
    '/flooding',
    formData
  )

  return {
    type: EDIT_FLOODING,
    payload: response.data
  }
}

const removeFlooding = async (_id: string): Promise<RemoveFloodingAction> => {
  const response = await serverAPI.delete<RemoveFloodingAxiosResponse>(
    `/flooding`,
    { data: { _id } }
  )

  return {
    type: REMOVE_FLOODING,
    payload: response.data
  }
}

export {
  updateFloodings,
  fetchFloodings,
  createFlooding,
  editFlooding,
  removeFlooding
}
