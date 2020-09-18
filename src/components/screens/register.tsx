import React, { useState } from 'react'
import {
  Typography,
  TextInput,
  Button,
  Box,
  TouchableOpacity,
  Image,
  ScrollView,
  Container,
  StatusBar
} from 'src/components/atoms'
import { MessageModal, BackHeader } from 'src/components/molecules'
import { useDispatch } from 'src/store'
import { createUser } from 'src/store/user'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker'
import { TextInput as OldTextInput, useTheme } from 'react-native-paper'
import ImageView from 'react-native-image-viewing'
import { Keyboard } from 'react-native'

interface Form {
  name: string
  email: string
  password: string
  confirmPassword: string
  picture:
    | string
    | {
        fileSize: number
        type: string
        isVertical: true
        height: number
        path: string
        width: number
        originalRotation: number
        uri: string
        fileName: string
        timestamp: string
      }
  showPassword: boolean
  showConfirmPassword: boolean
}

const Register: React.FC = () => {
  const [openpicture, setOpenpicture] = useState(false)
  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    picture: '',
    showPassword: false,
    showConfirmPassword: false
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const theme = useTheme()

  const onChange = (name: keyof typeof form, text: string) => {
    setForm({ ...form, [name]: text })
  }

  const handleChoosePhoto = () => {
    const options = {
      noData: true
    }
    ImagePicker.showImagePicker(options, (response) => {
      console.log(response)
      if (response.uri) {
        setForm({ ...form, picture: response as any })
      }
    })
  }

  const onSubmit = async () => {
    try {
      Keyboard.dismiss()

      if (loading) {
        return
      }

      if (
        !form.name ||
        !form.email ||
        !form.password ||
        !form.confirmPassword
      ) {
        setErrorMessage('Todos campos obrigatórios devem ser preenchidos.')
        return
      }

      if (form.password !== form.confirmPassword) {
        setErrorMessage('A confirmação de senha não é igual a senha.')
        return
      }

      setLoading(true)

      const response = await createUser({
        name: form.name,
        email: form.email,
        password: form.password,
        picture: form.picture
      })

      const { payload } = response

      const userData = JSON.stringify(payload)

      await AsyncStorage.setItem('@user', userData)

      dispatch(response)
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
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="dark-content"
      />
      <BackHeader title="Faça seu cadastro" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Box justifyContent="center" alignItems="center" mt={4}>
            <ImageView
              images={[
                typeof form.picture !== 'string'
                  ? { uri: form.picture.uri }
                  : require('src/images/no_picture.png')
              ]}
              imageIndex={0}
              visible={openpicture}
              onRequestClose={() => setOpenpicture(false)}
            />
            <TouchableOpacity
              onPress={() => setOpenpicture(true)}
              width={148}
              mb={1}
            >
              <Image
                source={
                  typeof form.picture !== 'string'
                    ? { uri: form.picture.uri }
                    : require('src/images/no_picture.png')
                }
                width={148}
                height={148}
                borderRadius={148 / 2}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                Adicionar Foto
              </Typography>
            </TouchableOpacity>
          </Box>
          <Box mt={3} p={2} mb={4}>
            <TextInput
              label="Nome *"
              placeholder="Digite seu nome"
              mb={3}
              onChangeText={(text) => onChange('name', text)}
              value={form.name}
            />
            <TextInput
              label="Email *"
              placeholder="Digite seu e-mail"
              mb={3}
              onChangeText={(text) => onChange('email', text)}
              value={form.email}
            />
            <TextInput
              label="Senha *"
              placeholder="Digite sua senha"
              mb={3}
              onChangeText={(text) => onChange('password', text)}
              value={form.password}
              secureTextEntry={!form.showPassword}
              right={
                <OldTextInput.Icon
                  onPress={() =>
                    setForm({ ...form, showPassword: !form.showPassword })
                  }
                  name={form.showPassword ? 'eye-off' : 'eye'}
                />
              }
            />
            <TextInput
              label="Confirmação de senha *"
              placeholder="Digite a confirmação de senha"
              mb={3}
              onChangeText={(text) => onChange('confirmPassword', text)}
              value={form.confirmPassword}
              secureTextEntry={!form.showConfirmPassword}
              right={
                <OldTextInput.Icon
                  onPress={() =>
                    setForm({
                      ...form,
                      showConfirmPassword: !form.showConfirmPassword
                    })
                  }
                  name={form.showConfirmPassword ? 'eye-off' : 'eye'}
                />
              }
            />
            <Button
              onPress={onSubmit}
              loading={loading}
              color="accent"
              labelStyle={{ color: theme.colors.custom.white }}
            >
              Cadastrar
            </Button>
          </Box>
        </Container>
      </ScrollView>
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
    </>
  )
}

export default Register
