import { useRef, useEffect } from 'react'
import io from 'socket.io-client'
import { API_ADDRESS } from '@env'
import { FloodingsState, updateFloodings } from 'src/store/floodings'
import { AlertsState, updateAlerts } from 'src/store/alerts'
import { useDispatch } from 'src/store'
import { increaseNotification } from 'src/store/notification'

const Socket: React.FC = () => {
  const socket = useRef<SocketIOClient.Socket>(io(API_ADDRESS)).current
  const dispatch = useDispatch()

  useEffect(() => {
    const asyncEffect = async () => {
      socket.on('floodings', (newFloodings: FloodingsState) => {
        dispatch(updateFloodings(newFloodings))
      })
      socket.on('save-alert', (newAlerts: AlertsState) => {
        dispatch(updateAlerts(newAlerts))
        dispatch(increaseNotification())
      })
      socket.on('update-alert', (newAlerts: AlertsState) => {
        dispatch(updateAlerts(newAlerts))
      })
    }

    asyncEffect()

    return () => {
      socket.disconnect()
    }
  }, [])

  return null
}

export default Socket
