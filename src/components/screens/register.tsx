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
  HelperText
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

interface Errors {
  name: string | false
  email: string | false
  password: string | false
  confirmPassword: string | false
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
  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  })
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const theme = useTheme()

  const onChange = (name: keyof typeof form, text: string) => {
    setForm({ ...form, [name]: text })
    setErrors({ ...errors, [name]: false })
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
        const errorsMessage = []

        if (!form.name) {
          errorsMessage.push('O nome precisa ser preenchido.')
        }

        if (!form.email) {
          errorsMessage.push('O e-mail precisa ser prenchido.')
        }

        if (!form.password) {
          errorsMessage.push('A senha precisa ser preenchida.')
        }

        if (!form.confirmPassword) {
          errorsMessage.push('A confirmação de senha precisa ser preenchida.')
        }

        setErrorMessage(errorsMessage)
        setErrors({
          ...errors,
          name: !form.name && 'O nome precisa ser preenchido.',
          email: !form.email && 'O e-mail precisa ser preenchido.',
          password: !form.password && 'A senha precisa ser preenchida.',
          confirmPassword:
            !form.confirmPassword &&
            'A confirmação de senha precisa ser preenchida.'
        })

        return
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setErrorMessage('E-mail inválido.')
        setErrors({
          ...errors,
          email: 'E-mail inválido.'
        })

        return
      }

      if (form.password !== form.confirmPassword) {
        setErrorMessage('A confirmação de senha não é igual a senha.')
        setErrors({
          ...errors,
          confirmPassword: 'A confirmação de senha não é igual a senha.'
        })

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

        if (error.response.data.error === 'E-mail já cadastrado.') {
          setErrors({
            ...errors,
            email: 'E-mail já cadastrado.'
          })
        }

        return
      }

      setErrorMessage('Falha em conectar.')
    }
  }

  return (
    <>
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
            <TouchableOpacity onPress={handleChoosePhoto} mb={1}>
              <Typography variant="h3" color="accent" fontWeight="bold">
                Adicionar Foto
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setForm({ ...form, picture: '' })}>
              <Typography variant="h3" color="accent" fontWeight="bold">
                Remover Foto
              </Typography>
            </TouchableOpacity>
          </Box>
          <Box mt={3} px={2} mb={4}>
            <TextInput
              label="Nome *"
              placeholder="Digite seu nome"
              mb={errors.name ? 0 : 3}
              onChangeText={(text) => onChange('name', text)}
              value={form.name}
            />
            {errors.name ? (
              <Box mb={2}>
                <HelperText type="error">{errors.name}</HelperText>
              </Box>
            ) : null}
            <TextInput
              label="Email *"
              placeholder="Digite seu e-mail"
              mb={errors.email ? 0 : 3}
              onChangeText={(text) => onChange('email', text)}
              value={form.email}
            />
            {errors.email ? (
              <Box mb={2}>
                <HelperText type="error">{errors.email}</HelperText>
              </Box>
            ) : null}
            <TextInput
              label="Senha *"
              placeholder="Digite sua senha"
              mb={errors.password ? 0 : 3}
              onChangeText={(text) => onChange('password', text)}
              value={form.password}
              secureTextEntry={!form.showPassword}
              right={
                <OldTextInput.Icon
                  color={theme.colors.placeholder}
                  onPress={() =>
                    setForm({ ...form, showPassword: !form.showPassword })
                  }
                  name={form.showPassword ? 'eye-off' : 'eye'}
                />
              }
            />
            {errors.password ? (
              <Box mb={2}>
                <HelperText type="error">{errors.password}</HelperText>
              </Box>
            ) : null}
            <TextInput
              label="Confirmação de senha *"
              placeholder="Digite a confirmação de senha"
              mb={errors.confirmPassword ? 0 : 3}
              onChangeText={(text) => onChange('confirmPassword', text)}
              value={form.confirmPassword}
              secureTextEntry={!form.showConfirmPassword}
              right={
                <OldTextInput.Icon
                  color={theme.colors.placeholder}
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
            {errors.confirmPassword ? (
              <Box mb={2}>
                <HelperText type="error">{errors.confirmPassword}</HelperText>
              </Box>
            ) : null}
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
