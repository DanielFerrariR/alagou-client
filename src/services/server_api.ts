import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { API_ADDRESS } from '@env'
import AsyncStorage from '@react-native-community/async-storage'
import { eventEmitterInstance } from 'src/utils'

const axiosConfig = {
  baseURL: API_ADDRESS
}

const serverAPI = axios.create(axiosConfig)

const errorHandler = (error: AxiosError) => {
  if (error?.config?.handlerEnabled !== false) {
    if (error?.response?.status === 401) {
      eventEmitterInstance.emit('logout', { detail: 'Não autorizado.' })
    }
  }
  return Promise.reject(error)
}

const successHandler = async (config: AxiosRequestConfig) => {
  const userData = await AsyncStorage.getItem('@user')

  if (userData) {
    const newUserData = JSON.parse(userData)

    config.headers.Authorization = `Bearer ${newUserData.token}`
  }

  return config
}

serverAPI.interceptors.request.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
)

export default serverAPI
