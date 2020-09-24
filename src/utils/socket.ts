import { useRef, useEffect } from 'react'
import io from 'socket.io-client'
import { API_ADDRESS } from '@env'
import { FloodingsState, updateFloodings } from 'src/store/floodings'
import { AlertsState, updateAlerts } from 'src/store/alerts'
import { useDispatch } from 'src/store'

const Socket: React.FC = () => {
  const socket = useRef<SocketIOClient.Socket>(io(API_ADDRESS))
  const dispatch = useDispatch()

  useEffect(() => {
    const asyncEffect = async () => {
      socket.current.on('floodings', (floodings: FloodingsState) => {
        dispatch(updateFloodings(floodings))
      })
      socket.current.on('alerts', (alerts: AlertsState) => {
        dispatch(updateAlerts(alerts))
      })
    }

    asyncEffect()

    return () => {
      socket.current.disconnect()
    }
  }, [])

  return null
}

export default Socket
