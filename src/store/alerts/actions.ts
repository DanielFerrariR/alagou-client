import { serverAPI } from 'src/services'
import {
  AlertsState,
  FetchAlertsAction,
  FETCH_ALERTS,
  CreateAlertAction,
  CREATE_ALERT,
  EditAlertAction,
  EDIT_ALERT,
  DeleteAlertAction,
  DELETE_ALERT,
  CreateAlertData,
  EditAlertData,
  UpdateAlertsAction,
  UPDATE_ALERTS
} from './types'

const fetchAlerts = async (): Promise<FetchAlertsAction> => {
  const response = await serverAPI.get<AlertsState>('/alerts')

  return {
    type: FETCH_ALERTS,
    payload: response.data
  }
}

const createAlert = async (
  data: CreateAlertData
): Promise<CreateAlertAction> => {
  const response = await serverAPI.post<AlertsState>('/alert', data)

  return {
    type: CREATE_ALERT,
    payload: response.data
  }
}

const editAlert = async (data: EditAlertData): Promise<EditAlertAction> => {
  const response = await serverAPI.put<AlertsState>('/alert', data)

  return {
    type: EDIT_ALERT,
    payload: response.data
  }
}

const deleteAlert = async (_id: string): Promise<DeleteAlertAction> => {
  const response = await serverAPI.delete<AlertsState>('/alert', {
    data: { _id }
  })

  return {
    type: DELETE_ALERT,
    payload: response.data
  }
}

const updateAlerts = (data: AlertsState): UpdateAlertsAction => {
  return {
    type: UPDATE_ALERTS,
    payload: data
  }
}

export { fetchAlerts, createAlert, editAlert, deleteAlert, updateAlerts }
