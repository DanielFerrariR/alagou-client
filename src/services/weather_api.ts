import axios from 'axios'

const axiosConfig = {
  baseURL: 'https://api.weatherapi.com/v1'
}

const weatherAPI = axios.create(axiosConfig)

export default weatherAPI
