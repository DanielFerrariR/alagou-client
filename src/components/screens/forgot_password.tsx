import React, { useState } from 'react'
import {
  Container,
  Typography,
  StatusBar,
  TextInput,
  Button
} from 'src/components/atoms'
import { MessageModal, BackHeader } from 'src/components/molecules'
import { useTheme } from 'react-native-paper'
import { serverAPI } from 'src/services'
import { Keyboard } from 'react-native'

interface ResetPasswordAxiosResponse {
  message: string
}

const ForgotPassword: React.FC = () => {
  const theme = useTheme()
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const onSubmit = async () => {
    try {
      Keyboard.dismiss()

      if (loading) {
        return
      }

      setLoading(true)

      const response = await serverAPI.post<ResetPasswordAxiosResponse>(
        '/reset-password',
        {
          email
        }
      )

      setSuccessMessage(response.data.message)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

      if (error?.response?.data?.error) {
        setErrorMessage(error.response.data.error)
        return
      }

      setErrorMessage('Falha em conectar.')
    }
  }

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <BackHeader title="Esqueci minha senha" />
      <Container p={2}>
        <Typography mb={3}>
          Digite seu e-mail no espaço abaixo para enviarmos um código de
          redefinição de senha.
        </Typography>
        <TextInput
          mb={3}
          label="E-mail"
          placeholder="Digite o seu e-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Button
          loading={loading}
          color="accent"
          labelStyle={{ color: theme.colors.custom.white }}
          onPress={onSubmit}
        >
          Alterar senha
        </Button>
      </Container>
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
      <MessageModal
        message={successMessage}
        setMessage={setSuccessMessage}
        success
      />
    </>
  )
}

export default ForgotPassword
