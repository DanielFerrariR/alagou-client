import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  StatusBar,
  Appbar,
  ActivityIndicator,
  Button
} from 'src/components/atoms'
import { useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'src/store'
import { setUserConfirmedEmail } from 'src/store/user'
import { useNavigation } from '@react-navigation/native'
import { serverAPI } from 'src/services'
import Loading from './loading'

interface Props {
  route: {
    key: string
    name: string
    params: {
      token: string
    }
  }
}

interface ConfirmEmailAxiosResponse {
  message: string
}

const EmailConfirmation: React.FC<Props> = ({ route }) => {
  const userSession = useSelector((state) => state.user)
  const theme = useTheme()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        setLoading(true)

        const response = await serverAPI.post<ConfirmEmailAxiosResponse>(
          '/confirm-email',
          {
            token: route.params.token
          }
        )

        setMessage(response.data.message)

        if (userSession) {
          dispatch(setUserConfirmedEmail(userSession))
        }

        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)

        if (error?.response?.data?.error) {
          setMessage(error.response.data.error)
          return
        }

        setMessage('Falha em conectar.')
      }
    }

    if (userSession === null) {
      return
    }

    if (userSession && userSession.isEmailConfirmed) {
      setMessage('E-mail já confirmado.')

      return
    }

    asyncEffect()
  }, [userSession, route])

  const goBack = () => {
    if (userSession) {
      navigation.navigate('DrawerFlow')
    } else {
      navigation.navigate('Welcome')
    }
  }

  return (
    <>
      {userSession === null ? (
        <Loading />
      ) : (
        <>
          <StatusBar backgroundColor={theme.colors.primary} />
          <Appbar.Header>
            <Appbar.Content title="Confirmação de Email" />
          </Appbar.Header>
          <Container
            p={2}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {loading ? (
              <>
                <Typography mb={3} variant="h2" textAlign="center">
                  Seu email está sendo verificado.
                </Typography>
                <ActivityIndicator animating size={48} color="accent" />
              </>
            ) : (
              <>
                <Typography mb={3} variant="h2" textAlign="center">
                  {message}
                </Typography>
                <Button onPress={goBack}>Voltar</Button>
              </>
            )}
          </Container>
        </>
      )}
    </>
  )
}

export default EmailConfirmation
