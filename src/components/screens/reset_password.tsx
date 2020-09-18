import React, { useState } from 'react'
import {
  Container,
  StatusBar,
  Appbar,
  TextInput,
  Button
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

const ResetPassword: React.FC<Props> = ({ route }) => {
  const userSession = useSelector((state) => state.user)
  const navigation = useNavigation()
  const theme = useTheme()
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Form>({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    showOldPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false
  })

  const onChange = (name: keyof typeof form, text: string) => {
    setForm({ ...form, [name]: text })
  }

  const onSubmit = async () => {
    try {
      Keyboard.dismiss()

      if (loading) {
        return
      }

      if (!form.oldPassword || !form.newPassword || !form.confirmNewPassword) {
        setErrorMessage('Todos campos obrigatórios devem ser preenchidos.')
        return
      }

      if (form.newPassword !== form.confirmNewPassword) {
        setErrorMessage('A confirmação de senha não é igual a senha.')
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
          mb={3}
          onChangeText={(text) => onChange('oldPassword', text)}
          value={form.oldPassword}
          secureTextEntry={!form.showOldPassword}
          right={
            <OldTextInput.Icon
              onPress={() =>
                setForm({ ...form, showOldPassword: !form.showOldPassword })
              }
              name={form.showOldPassword ? 'eye-off' : 'eye'}
            />
          }
        />
        <TextInput
          label="Nova senha"
          placeholder="Digite sua nova senha"
          mb={3}
          onChangeText={(text) => onChange('newPassword', text)}
          value={form.newPassword}
          secureTextEntry={!form.showNewPassword}
          right={
            <OldTextInput.Icon
              onPress={() =>
                setForm({ ...form, showNewPassword: !form.showNewPassword })
              }
              name={form.showNewPassword ? 'eye-off' : 'eye'}
            />
          }
        />
        <TextInput
          label="Confirmação da nova senha"
          placeholder="Digite a confirmação da nova senha"
          mb={3}
          onChangeText={(text) => onChange('confirmNewPassword', text)}
          value={form.confirmNewPassword}
          secureTextEntry={!form.showConfirmNewPassword}
          right={
            <OldTextInput.Icon
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
