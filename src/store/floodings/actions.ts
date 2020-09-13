import { serverAPI } from 'src/services'
import {
  FETCH_FLOODINGS,
  CREATE_FLOODING,
  UPDATE_FLOODINGS,
  FetchFloodingsAction,
  CreateFloodingAction,
  UpdateFloodingsAction,
  CreateFloodingData,
  CreateFloodingAxiosResponse,
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
  formData.append('latitude', data.latitude)
  formData.append('longitude', data.longitude)
  formData.append('severity', data.severity)
  formData.append('picture', {
    name: data.picture.fileName,
    type: data.picture.type,
    uri: data.picture.uri
  })
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

export { updateFloodings, fetchFloodings, createFlooding }
