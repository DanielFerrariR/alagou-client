import axios from 'axios'
import { GOOGLE_MAPS_API } from '@env'

const axiosConfig = {
  baseURL: GOOGLE_MAPS_API
}

const googleMapsAPI = axios.create(axiosConfig)

export default googleMapsAPI
