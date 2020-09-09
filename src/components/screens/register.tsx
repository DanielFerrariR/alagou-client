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
import { useDispatch } from 'src/store'
import { createUser } from 'src/store/user'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import ImagePicker from 'react-native-image-picker'

interface Form {
  name: string
  email: string
  password: string
  confirmPassword: string
  profilePhoto: null | { uri: string }
}

const Register: React.FC = () => {
  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePhoto: null
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
          profilePhoto: null
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
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setForm({ ...form, profilePhoto: response })
      }
    })
  }

  const onSubmit = async () => {
    try {
      setLoading(true)

      const response = await createUser(form)

      const { payload } = response

      const userData = JSON.stringify(payload)

      await AsyncStorage.setItem('@user', userData)

      dispatch(response)
    } catch (error) {
      console.error(error)
      setLoading(false)

      if (error?.response?.data) {
        setMessage('Something went wrong with register')
        return
      }

      setMessage('Failed to connect')
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Login')} />
        <Appbar.Content title="Faça seu cadastro" />
      </Appbar.Header>
      <ScrollView>
        <Box justifyContent="center" alignItems="center" mt={4}>
          <Image
            source={
              form.profilePhoto
                ? { uri: form.profilePhoto.uri }
                : require('src/images/no_photo.png')
            }
            width={148}
            height={148}
            borderRadius={148 / 2}
            mb={1}
          />
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              Alterar Foto
            </Typography>
          </TouchableOpacity>
        </Box>
        <Box mt={3} p={2}>
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
          />
          <TextInput
            label="Confirmação de senha"
            placeholder="Digite a confirmação de senha"
            mb={3}
            onChangeText={(text) => onChange('confirmPassword', text)}
            value={form.confirmPassword}
          />
          <Button onPress={onSubmit} disabled={loading} loading={loading}>
            Cadastrar
          </Button>
        </Box>
      </ScrollView>
    </>
  )
}

export default Register
