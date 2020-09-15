import { useRef, useEffect } from 'react'
import io from 'socket.io-client'
import { API_ADDRESS } from '@env'
import { FloodingsState, updateFloodings } from 'src/store/floodings'
import { useDispatch, useSelector } from 'src/store'
import { removeFavorite } from 'src/store/user'

const Socket: React.FC = () => {
  // const userSession = useSelector((state) => state.user)
  // const socket = useRef<SocketIOClient.Socket>(io(API_ADDRESS))
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   const asyncEffect = async () => {
  //     socket.current.on('floodings', (floodings: FloodingsState) => {
  //       dispatch(updateFloodings(floodings))
  //     })
  //   }

  //   asyncEffect()

  //   return () => {
  //     socket.current.disconnect()
  //   }
  // }, [])

  return null
}

export default Socket
