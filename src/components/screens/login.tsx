import React, { useState, useEffect } from 'react'
import {
  Typography,
  Button,
  Box,
  TouchableOpacity,
  Container,
  TextInput,
  StatusBar,
  HelperText
} from 'src/components/atoms'
import { MessageModal } from 'src/components/molecules'
import { useDispatch, useSelector } from 'src/store'
import { fetchUser } from 'src/store/user'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useTheme, TextInput as OldTextInput } from 'react-native-paper'
import { Logo, Wave } from 'src/images'
import { Keyboard } from 'react-native'
import { useIsKeyboardShown, useWindowDimensions } from 'src/hooks'

interface Errors {
  email: string | false
  password: string | false
}

const Login: React.FC = () => {
  const userSession = useSelector((state) => state.user)
  const theme = useTheme()
  const [form, setForm] = useState({
    email: '',
    password: '',
    showPassword: false
  })
  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false
  })
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const isKeyboardShown = useIsKeyboardShown()
  const dimensions = useWindowDimensions()

  useEffect(() => {
    if (userSession) {
      navigation.navigate('DrawerFlow')
    }
  }, [userSession])

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

      if (!form.email || !form.password) {
        const errorsMessage = []

        if (!form.email) {
          errorsMessage.push('O e-mail precisa ser prenchido.')
        }

        if (!form.password) {
          errorsMessage.push('A senha precisa ser preenchida.')
        }

        setErrorMessage(errorsMessage)
        setErrors({
          ...errors,
          email: !form.email && 'O e-mail precisa ser preenchido.',
          password: !form.password && 'A senha precisa ser preenchida.'
        })

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
    <>
      <StatusBar
        backgroundColor={
          isKeyboardShown ? theme.colors.primary : theme.colors.custom.white
        }
        barStyle={isKeyboardShown ? 'light-content' : 'dark-content'}
      />
      <Container bgColor="custom.white">
        <Box
          flex={isKeyboardShown ? 0 : 1}
          height={isKeyboardShown ? 0 : 1}
          alignItems="center"
          justifyContent="center"
        >
          <Logo />
        </Box>
        <Box flex={isKeyboardShown ? 1 : 0} p={2} bgColor="primary">
          <Box
            position="absolute"
            width={dimensions.width + 16}
            left="-16px"
            height={100}
            top="-80px"
          >
            <Wave />
          </Box>
          <TextInput
            mode="flat"
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
            mode="flat"
            label="Password *"
            placeholder="Digite sua senha"
            onChangeText={(text) => onChange('password', text)}
            value={form.password}
            secureTextEntry={!form.showPassword}
            mb={errors.password ? 0 : 3}
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
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            mb={1}
          >
            <Typography variant="h3" color="custom.white" textAlign="center">
              Esqueceu sua senha?
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsAndConditionsOfUse')}
          >
            <Typography variant="h3" color="custom.white" textAlign="center">
              Termos e Condições de Uso
            </Typography>
          </TouchableOpacity>
        </Box>
        <MessageModal
          message={errorMessage}
          setMessage={setErrorMessage}
          error
        />
      </Container>
    </>
  )
}

export default Login
