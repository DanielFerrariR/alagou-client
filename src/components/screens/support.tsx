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
import { serverAPI } from 'src/services'
import { Keyboard } from 'react-native'
import { useTheme } from 'react-native-paper'

interface SupportAxiosResponse {
  message: string
}

interface Errors {
  message: string | false
}

const Support: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [successMessage, setSuccessMessage] = useState<string | string[]>('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    message: ''
  })
  const [errors, setErrors] = useState<Errors>({
    message: false
  })
  const theme = useTheme()

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

      if (!form.message) {
        const errorsMessage = []

        if (!form.message) {
          errorsMessage.push('A mensagem deve ser preenchida.')
        }

        setErrorMessage(errorsMessage)
        setErrors({
          ...errors,
          message: !form.message && 'A mensagem deve ser preenchida.'
        })

        return
      }

      setLoading(true)

      const response = await serverAPI.post<SupportAxiosResponse>('/support', {
        message: form.message
      })

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
      <BackHeader title="Suporte" />
      <Container p={2}>
        <Typography mb={3}>
          Precisa de ajuda? Envie uma mensagem que responderemos pelo seu e-mail
          cadastrado assim que possível.
        </Typography>
        <TextInput
          label="Mensagem"
          placeholder="Digite sua mensagem"
          multiline
          maxLength={5000}
          numberOfLines={5}
          mb={errors.message ? 0 : 3}
          value={form.message}
          onChangeText={(text) => onChange('message', text)}
        />
        {errors.message ? (
          <Box mb={2}>
            <HelperText type="error">{errors.message}</HelperText>
          </Box>
        ) : null}
        <Button
          onPress={onSubmit}
          loading={loading}
          color="accent"
          labelStyle={{ color: theme.colors.custom.white }}
        >
          Enviar
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

export default Support
