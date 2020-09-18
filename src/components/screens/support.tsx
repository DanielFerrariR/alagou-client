import React, { useState } from 'react'
import { Container, Typography, TextInput, Button } from 'src/components/atoms'
import { MessageModal, BackHeader } from 'src/components/molecules'
import { serverAPI } from 'src/services'
import { Keyboard } from 'react-native'

interface SupportAxiosResponse {
  message: string
}

const Support: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const onSubmit = async () => {
    try {
      Keyboard.dismiss()

      if (loading) {
        return
      }

      setLoading(true)

      const response = await serverAPI.post<SupportAxiosResponse>('/support', {
        message
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
          mb={3}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button onPress={onSubmit} loading={loading}>
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
