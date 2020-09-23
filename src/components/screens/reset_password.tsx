import React, { useState } from 'react'
import {
  Container,
  StatusBar,
  Appbar,
  TextInput,
  Button,
  Box,
  HelperText
} from 'src/components/atoms'
import { MessageModal } from 'src/components/molecules'
import { useTheme, TextInput as OldTextInput } from 'react-native-paper'
import { Keyboard } from 'react-native'
import { serverAPI } from 'src/services'
import { useSelector } from 'src/store'
import { useNavigation } from '@react-navigation/native'

interface Props {
  route: {
    key: string
    name: string
    params: {
      token: string
    }
  }
}

interface Form {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
  showOldPassword: boolean
  showNewPassword: boolean
  showConfirmNewPassword: boolean
}

interface ConfirmResetPasswordAxiosResponse {
  message: string
}

interface Errors {
  oldPassword: string | false
  newPassword: string | false
  confirmNewPassword: string | false
}

const ResetPassword: React.FC<Props> = ({ route }) => {
  const userSession = useSelector((state) => state.user)
  const navigation = useNavigation()
  const theme = useTheme()
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [successMessage, setSuccessMessage] = useState<string | string[]>('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Form>({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    showOldPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false
  })
  const [errors, setErrors] = useState<Errors>({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false
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

      if (!form.oldPassword || !form.newPassword || !form.confirmNewPassword) {
        const errorsMessage = []

        if (!form.oldPassword) {
          errorsMessage.push('A senha atual precisa ser preenchida.')
        }

        if (!form.newPassword) {
          errorsMessage.push('A nova senha precisa ser preenchida.')
        }

        if (!form.confirmNewPassword) {
          errorsMessage.push(
            'A confirmaçao da nova senha precisa ser preenchida.'
          )
        }

        setErrorMessage(errorsMessage)
        setErrors({
          ...errors,
          oldPassword:
            !form.oldPassword && 'A senha atual precisa ser preenchida.',
          newPassword:
            !form.newPassword && 'A nova senha precisa ser preenchida.',
          confirmNewPassword:
            !form.confirmNewPassword &&
            'A confirmaçao da nova senha precisa ser preenchida.'
        })
        return
      }

      if (form.newPassword !== form.confirmNewPassword) {
        setErrorMessage('A confirmação de senha não é igual a senha.')
        setErrors({
          ...errors,
          confirmNewPassword: 'A confirmação de senha não é igual a senha.'
        })
        return
      }

      setLoading(true)

      const response = await serverAPI.post<ConfirmResetPasswordAxiosResponse>(
        '/confirm-reset-password',
        {
          newPassword: form.newPassword,
          token: route.params.token
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

  const goBack = () => {
    if (userSession) {
      navigation.navigate('DrawerFlow')
    } else {
      navigation.navigate('Welcome')
    }
  }

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Appbar.Header>
        <Appbar.Content title="Alterar senha" />
      </Appbar.Header>
      <Container p={2}>
        <TextInput
          label="Senha Atual"
          placeholder="Digite sua senha atual"
          mb={errors.oldPassword ? 0 : 3}
          onChangeText={(text) => onChange('oldPassword', text)}
          value={form.oldPassword}
          secureTextEntry={!form.showOldPassword}
          right={
            <OldTextInput.Icon
              color={theme.colors.placeholder}
              onPress={() =>
                setForm({ ...form, showOldPassword: !form.showOldPassword })
              }
              name={form.showOldPassword ? 'eye-off' : 'eye'}
            />
          }
        />
        {errors.oldPassword ? (
          <Box mb={2}>
            <HelperText type="error" visible>
              {errors.oldPassword}
            </HelperText>
          </Box>
        ) : null}
        <TextInput
          label="Nova senha"
          placeholder="Digite sua nova senha"
          mb={errors.newPassword ? 0 : 3}
          onChangeText={(text) => onChange('newPassword', text)}
          value={form.newPassword}
          secureTextEntry={!form.showNewPassword}
          right={
            <OldTextInput.Icon
              color={theme.colors.placeholder}
              onPress={() =>
                setForm({ ...form, showNewPassword: !form.showNewPassword })
              }
              name={form.showNewPassword ? 'eye-off' : 'eye'}
            />
          }
        />
        {errors.newPassword ? (
          <Box mb={2}>
            <HelperText type="error" visible>
              {errors.newPassword}
            </HelperText>
          </Box>
        ) : null}
        <TextInput
          label="Confirmação da nova senha"
          placeholder="Digite a confirmação da nova senha"
          mb={errors.confirmNewPassword ? 0 : 3}
          onChangeText={(text) => onChange('confirmNewPassword', text)}
          value={form.confirmNewPassword}
          secureTextEntry={!form.showConfirmNewPassword}
          right={
            <OldTextInput.Icon
              color={theme.colors.placeholder}
              onPress={() =>
                setForm({
                  ...form,
                  showConfirmNewPassword: !form.showConfirmNewPassword
                })
              }
              name={form.showConfirmNewPassword ? 'eye-off' : 'eye'}
            />
          }
        />
        {errors.confirmNewPassword ? (
          <Box mb={2}>
            <HelperText type="error" visible>
              {errors.confirmNewPassword}
            </HelperText>
          </Box>
        ) : null}
        <Button
          onPress={onSubmit}
          loading={loading}
          mb={3}
          color="accent"
          labelStyle={{ color: theme.colors.custom.white }}
        >
          Alterar senha
        </Button>
        <Button
          mode="outlined"
          onPress={goBack}
          color="accent"
          style={{ borderWidth: 1, borderColor: theme.colors.accent }}
          labelStyle={{ color: theme.colors.accent }}
        >
          Voltar
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

export default ResetPassword
