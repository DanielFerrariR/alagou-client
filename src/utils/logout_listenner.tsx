import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch, destroySession } from 'src/store'
import { eventEmitterInstance } from 'src/utils'
import { MessageModal } from 'src/components/molecules'

const LogoutListenners: React.FC = () => {
  const [message, setMessage] = useState<string | string[]>('')
  const dispatch = useDispatch()

  const logout = async (args: { detail: string }) => {
    try {
      await AsyncStorage.removeItem('@user')

      dispatch(destroySession())

      if (args?.detail) {
        setMessage(args.detail)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect((): any => {
    eventEmitterInstance.on('logout', logout)

    return () => eventEmitterInstance.removeListener('logout', logout)
  }, [])

  return (
    <MessageModal
      message={message}
      setMessage={setMessage}
      error={message === 'Não autorizado.'}
      success={message === 'Usuário deletado com sucesso!'}
    />
  )
}

export default LogoutListenners
