import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch, destroySession } from 'src/store'
import { eventEmitterInstance } from 'src/utils'
import { MessageModal } from 'src/components/molecules'

const LogoutListenners: React.FC = () => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const logout = async (args: { detail: boolean }) => {
    try {
      await AsyncStorage.removeItem('@user')

      dispatch(destroySession())

      if (args?.detail) {
        setMessage('Não autorizado.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect((): any => {
    eventEmitterInstance.on('logout', logout)

    return () => eventEmitterInstance.removeListener('logout', logout)
  }, [])

  return <MessageModal message={message} setMessage={setMessage} />
}

export default LogoutListenners
