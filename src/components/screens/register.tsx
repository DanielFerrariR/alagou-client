import React, { useState, useCallback } from 'react'
import {
  Typography,
  TextInput,
  Button,
  Box,
  TouchableOpacity,
  Appbar,
  Image,
  ScrollView
} from 'src/components/atoms'
import { MessageModal } from 'src/components/molecules'
import { useDispatch } from 'src/store'
import { createUser } from 'src/store/user'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import ImagePicker from 'react-native-image-picker'
import { TextInput as OldTextInput } from 'react-native-paper'
import ImageView from 'react-native-image-viewing'

interface Form {
  name: string
  email: string
  password: string
  confirmPassword: string
  picture: null | {
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
    picture: null,
    showPassword: false,
    showConfirmPassword: false
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      return () => {
        setForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          picture: null,
          showPassword: false,
          showConfirmPassword: false
        })
        setMessage('')
      }
    }, [])
  )

  const onChange = (name: keyof typeof form, text: string) => {
    setMessage('')
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
    if (loading) {
      return
    }

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setMessage('Você precisa preencher todos os campos.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setMessage('A confirmação de senha não é igual a senha.')
      return
    }

    try {
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

      if (error?.response?.data) {
        setMessage('Algo deu errado com o registro.')
        return
      }

      setMessage('Falha em conectar.')
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Login')} />
        <Appbar.Content title="Faça seu cadastro" />
      </Appbar.Header>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Box justifyContent="center" alignItems="center" mt={4}>
          <ImageView
            images={[
              form.picture
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
                form.picture
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
            label="Nome"
            placeholder="Digite seu nome"
            mb={3}
            onChangeText={(text) => onChange('name', text)}
            value={form.name}
          />
          <TextInput
            label="Email"
            placeholder="Digite seu e-mail"
            mb={3}
            onChangeText={(text) => onChange('email', text)}
            value={form.email}
          />
          <TextInput
            label="Senha"
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
                name={form.showPassword ? 'eye' : 'eye-off'}
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
                name={form.showConfirmPassword ? 'eye' : 'eye-off'}
              />
            }
          />
          <Button
            onPress={onSubmit}
            loading={loading}
            color="accent"
            labelStyle={{ color: 'white' }}
          >
            Cadastrar
          </Button>
        </Box>
      </ScrollView>
      <MessageModal message={message} setMessage={setMessage} />
    </>
  )
}

export default Register
