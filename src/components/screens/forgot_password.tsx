import React, { useState } from 'react'
import {
  Container,
  Typography,
  TextInput,
  Button,
  Box,
  HelperText
} from 'src/components/atoms'
import { MessageModal, BackHeader } from 'src/components/molecules'
import { useTheme } from 'react-native-paper'
import { serverAPI } from 'src/services'
import { Keyboard } from 'react-native'

interface ResetPasswordAxiosResponse {
  message: string
}

interface Errors {
  email: string | false
}

const ForgotPassword: React.FC = () => {
  const theme = useTheme()
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [successMessage, setSuccessMessage] = useState<string | string[]>('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: ''
  })
  const [errors, setErrors] = useState<Errors>({
    email: false
  })

  const onChange = (name: keyof typeof form, text: string) => {
    setForm({ ...form, [name]: text })
    setErrors({ ...errors, [name]: false })
  }

  const onSubmit = async () => {
    try {
      Keyboard.dismiss()

      if (loading) {
        return
      }

      if (!form.email) {
        const errorsMessage = []

        if (!form.email) {
          errorsMessage.push('O e-mail precisa ser prenchido.')
        }

        setErrorMessage(errorsMessage)
        setErrors({
          email: !form.email && 'O e-mail precisa ser preenchido.'
        })

        return
      }

      setLoading(true)

      const response = await serverAPI.post<ResetPasswordAxiosResponse>(
        '/reset-password',
        {
          email: form.email
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
      <BackHeader title="Esqueci minha senha" />
      <Container p={2}>
        <Typography mb={3}>
          Digite seu e-mail no espaço abaixo para enviarmos um código de
          redefinição de senha.
        </Typography>
        <TextInput
          mb={errors.email ? 0 : 3}
          label="E-mail"
          placeholder="Digite o seu e-mail"
          value={form.email}
          onChangeText={(text) => onChange('email', text)}
        />
        {errors.email ? (
          <Box mb={2}>
            <HelperText type="error">{errors.email}</HelperText>
          </Box>
        ) : null}
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
