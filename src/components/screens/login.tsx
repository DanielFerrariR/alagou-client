import React, { useState } from 'react'
import {
  Typography,
  Button,
  Box,
  TouchableOpacity,
  Container,
  TextInput
} from 'src/components/atoms'
import { MessageModal } from 'src/components/molecules'
import { useDispatch } from 'src/store'
import { fetchUser } from 'src/store/user'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useTheme, TextInput as OldTextInput } from 'react-native-paper'
import { Logo } from 'src/images'

const Login: React.FC = () => {
  const theme = useTheme()
  const [form, setForm] = useState({
    email: '',
    password: '',
    showPassword: false
  })
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('')
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const onChange = (name: keyof typeof form, text: string) => {
    setForm({ ...form, [name]: text })
  }

  const onSubmit = async () => {
    try {
      if (loading) {
        return
      }

      if (!form.email || !form.password) {
        setErrorMessage('Todos campos obrigatórios devem ser preenchidos.')
        return
      }

      setLoading(true)

      const response = await fetchUser({
        email: form.email,
        password: form.password
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
    <Container bgColor="custom.white">
      <Box height={0.4} alignItems="center" justifyContent="center">
        <Logo />
      </Box>
      <Box flex={1} p={2} bgColor="primary">
        <TextInput
          mode="flat"
          label="Email *"
          placeholder="Digite seu e-mail"
          mb={3}
          onChangeText={(text) => onChange('email', text)}
          value={form.email}
        />
        <TextInput
          mode="flat"
          label="Password *"
          placeholder="Digite sua senha"
          onChangeText={(text) => onChange('password', text)}
          value={form.password}
          secureTextEntry={!form.showPassword}
          mb={3}
          right={
            <OldTextInput.Icon
              onPress={() =>
                setForm({ ...form, showPassword: !form.showPassword })
              }
              name={form.showPassword ? 'eye' : 'eye-off'}
            />
          }
        />
        <Button
          onPress={onSubmit}
          color="custom.white"
          width={1}
          labelStyle={{ color: theme.colors.primary }}
          mb={3}
          loading={loading}
        >
          Login
        </Button>
        <Button
          mode="outlined"
          mb={3}
          onPress={() => navigation.navigate('Welcome')}
          style={{ borderWidth: 1, borderColor: theme.colors.custom.white }}
          labelStyle={{ color: theme.colors.custom.white }}
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
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
    </Container>
  )
}

export default Login
