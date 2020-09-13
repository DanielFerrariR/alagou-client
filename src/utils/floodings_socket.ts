import { useRef, useEffect } from 'react'
import io from 'socket.io-client'
import { API_ADDRESS } from '@env'
import { FloodingsState, updateFloodings } from 'src/store/floodings'
import { useDispatch } from 'src/store'

const FloodingsSocket: React.FC = () => {
  const socket = useRef<SocketIOClient.Socket>(io(API_ADDRESS))
  const dispatch = useDispatch()

  useEffect(() => {
    const asyncEffect = async () => {
      socket.current.on('floodings', (floodings: FloodingsState) => {
        dispatch(updateFloodings(floodings))
      })
    }

    asyncEffect()

    return () => {
      socket.current.disconnect()
    }
  }, [])

  return null
}

export default FloodingsSocket
