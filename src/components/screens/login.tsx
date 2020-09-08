import React, { useState, useCallback } from 'react'
import {
  Typography,
  Button,
  Box,
  TouchableOpacity,
  Container,
  Image,
  Switch,
  TextInput
} from 'src/components/atoms'
import { useDispatch } from 'src/store'
import { fetchUser } from 'src/store/user'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useTheme, TextInput as OldTextInput } from 'react-native-paper'

const Login: React.FC = () => {
  const theme = useTheme()
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberPassword: true,
    showPassword: false
  })
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const onToggleSwitch = () => {
    setForm({ ...form, rememberPassword: !form.rememberPassword })
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setForm({
          email: '',
          password: '',
          rememberPassword: true,
          showPassword: false
        })
        setMessage('')
      }
    }, [])
  )

  const onChange = (name: keyof typeof form, text: string) => {
    setMessage('')
    setForm({ ...form, [name]: text })
  }

  const onSubmit = async () => {
    try {
      setLoading(true)

      const response = await fetchUser(form)

      const { payload } = response

      const userData = JSON.stringify(payload)

      await AsyncStorage.setItem('@user', userData)

      dispatch(response)
    } catch (error) {
      setLoading(false)

      if (error?.response?.data) {
        setMessage('Something went wrong with login')
        return
      }

      setMessage('Failed to connect')
    }
  }

  return (
    <Container bgColor="custom.white">
      <Box height={0.35} alignItems="center" justifyContent="center">
        <Image source={require('src/images/logo.png')} />
      </Box>
      <Box flex={1} p={2} bgColor="primary">
        <TextInput
          mode="flat"
          label="Email"
          placeholder="Digite seu e-mail"
          mb={3}
          onChangeText={(text) => onChange('email', text)}
          value={form.email}
        />
        <TextInput
          mode="flat"
          label="Password"
          placeholder="Digite sua senha"
          onChangeText={(text) => onChange('password', text)}
          value={form.password}
          secureTextEntry={form.showPassword}
          mb={1}
          right={
            <OldTextInput.Icon
              onPress={() =>
                setForm({ ...form, showPassword: !form.showPassword })
              }
              name={form.showPassword ? 'eye' : 'eye-off'}
            />
          }
        />
        <Box flexDirection="row" alignItems="center" mb={3}>
          <Typography variant="h3" color="custom.white">
            Lembrar senha
          </Typography>
          <Switch
            value={form.rememberPassword}
            onValueChange={onToggleSwitch}
          />
        </Box>
        <Button
          onPress={onSubmit}
          color="custom.white"
          width={1}
          labelStyle={{ color: theme.colors.primary }}
          mb={3}
        >
          Login
        </Button>
        <Button
          mode="outlined"
          mb={3}
          onPress={() => navigation.navigate('Welcome')}
          style={{ borderWidth: 1, borderColor: 'white' }}
          labelStyle={{ color: 'white' }}
          width={1}
          color="custom.white"
        >
          Voltar
        </Button>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          mb={1}
        >
          <Typography variant="h3" color="custom.white" textAlign="center">
            Não possui conta? Cadastre-se
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Typography variant="h3" color="custom.white" textAlign="center">
            Esqueceu sua senha?
          </Typography>
        </TouchableOpacity>
      </Box>
    </Container>
  )
}

export default Login
