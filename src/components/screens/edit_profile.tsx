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
  HelperText,
  ActivityIndicator
} from 'src/components/atoms'
import { MessageModal, BackHeader } from 'src/components/molecules'
import { useDispatch, useSelector } from 'src/store'
import { editUser } from 'src/store/user'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker'
import { TextInput as OldTextInput, useTheme } from 'react-native-paper'
import ImageView from 'react-native-image-viewing'
import { ensure } from 'src/utils'
import { Keyboard } from 'react-native'
import { serverAPI } from 'src/services'

interface Form {
  name: string
  email: string
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
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
  showOldPassword: boolean
  showNewPassword: boolean
  showConfirmNewPassword: boolean
}

interface ResentEmailAxiosResponse {
  message: string
}

interface Errors {
  name: string | false
  email: string | false
  oldPassword: string | false
  newPassword: string | false
  confirmNewPassword: string | false
}

const EditProfile: React.FC = () => {
  const userSession = useSelector((state) => state.user)
  const [openpicture, setOpenpicture] = useState(false)
  const [form, setForm] = useState<Form>({
    name: (userSession && userSession.name) || '',
    email: (userSession && userSession.email) || '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    picture: (userSession && userSession.picture) || '',
    showOldPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false
  })
  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false
  })
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [successMessage, setSuccessMessage] = useState<string | string[]>('')
  const [loading, setLoading] = useState(false)
  const [loadingResentEmail, setLoadingResentEmail] = useState(false)
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

  const sendEmail = async () => {
    try {
      if (loadingResentEmail) {
        return
      }

      setLoadingResentEmail(true)

      const response = await serverAPI.get<ResentEmailAxiosResponse>(
        '/resent-email'
      )

      setLoadingResentEmail(false)
      setSuccessMessage(response.data.message)
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

  const onSubmit = async () => {
    try {
      Keyboard.dismiss()

      if (loading) {
        return
      }

      if (!form.name || !form.email) {
        const errorsMessage = []

        if (!form.name) {
          errorsMessage.push('O nome precisa ser preenchido.')
        }

        if (!form.email) {
          errorsMessage.push('O e-mail precisa ser prenchido.')
        }

        setErrorMessage(errorsMessage)
        setErrors({
          ...errors,
          name: !form.name && 'O nome precisa ser preenchido.',
          email: !form.email && 'O e-mail precisa ser preenchido.'
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

      if (form.oldPassword && (!form.newPassword || !form.confirmNewPassword)) {
        const errorsMessage = []

        if (!form.newPassword) {
          errorsMessage.push('A nova senha precisa ser preenchida.')
        }

        if (!form.confirmNewPassword) {
          errorsMessage.push(
            'A confirmação da nova senha precisa ser preenchida.'
          )
        }

        setErrorMessage(errorsMessage)

        setErrors({
          ...errors,
          newPassword:
            !form.newPassword && 'A nova senha precisa ser preenchida.',
          confirmNewPassword:
            !form.confirmNewPassword &&
            'A confirmação da nova senha precisa ser preenchida.'
        })

        return
      }

      if (!form.oldPassword && (form.newPassword || form.confirmNewPassword)) {
        setErrorMessage('A senha atual precisa ser preenchida.')

        setErrors({
          ...errors,
          oldPassword:
            !form.oldPassword && 'A senha atual precisa ser preenchida.'
        })

        return
      }

      if (
        (form.newPassword || form.showConfirmNewPassword) &&
        form.newPassword !== form.confirmNewPassword
      ) {
        setErrorMessage('A confirmação de senha não é igual a senha.')
        setErrors({
          ...errors,
          confirmNewPassword: 'A confirmação de senha não é igual a senha.'
        })

        return
      }

      setLoading(true)

      const response = await editUser(ensure(userSession), {
        name: form.name,
        email: form.email,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        picture: form.picture
      })

      const { payload } = response

      const userData = JSON.stringify(payload)

      await AsyncStorage.setItem('@user', userData)

      dispatch(response)

      setLoading(false)
      setSuccessMessage('Dados atualizados com sucesso!')
    } catch (error) {
      console.log(error)
      setLoading(false)

      if (error?.response?.data?.error) {
        setErrorMessage(error.response.data.error)

        if (error.response.data.error === 'Senha atual inválida.') {
          setErrors({
            ...errors,
            oldPassword: 'Senha atual inválida'
          })
        }

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
      {userSession ? (
        <>
          <BackHeader title="Editar perfil" />
          <ScrollView keyboardShouldPersistTaps="handled">
            <Container>
              <Box justifyContent="center" alignItems="center" mt={4}>
                <ImageView
                  images={[
                    form.picture
                      ? {
                          uri:
                            typeof form.picture !== 'string'
                              ? form.picture.uri
                              : form.picture
                        }
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
                        ? {
                            uri:
                              typeof form.picture !== 'string'
                                ? form.picture.uri
                                : form.picture
                          }
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
                <TouchableOpacity
                  onPress={() => setForm({ ...form, picture: '' })}
                >
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
                  mb={!userSession.isEmailConfirmed || errors.name ? 0 : 3}
                  onChangeText={(text) => onChange('email', text)}
                  value={form.email}
                />
                {errors.email ? (
                  <Box mb={!userSession.isEmailConfirmed ? 0 : 2}>
                    <HelperText type="error">{errors.email}</HelperText>
                  </Box>
                ) : null}
                {!userSession.isEmailConfirmed ? (
                  <TouchableOpacity onPress={sendEmail} mb={2}>
                    <Box flexDirection="row" alignItems="center">
                      <HelperText type="info" visible>
                        Email não verificado. Enviar novamente?
                      </HelperText>
                      {loadingResentEmail ? (
                        <ActivityIndicator animating size={16} color="accent" />
                      ) : null}
                    </Box>
                  </TouchableOpacity>
                ) : null}
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
                        setForm({
                          ...form,
                          showOldPassword: !form.showOldPassword
                        })
                      }
                      name={form.showOldPassword ? 'eye-off' : 'eye'}
                    />
                  }
                />
                {errors.oldPassword ? (
                  <Box mb={2}>
                    <HelperText type="error">{errors.oldPassword}</HelperText>
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
                        setForm({
                          ...form,
                          showNewPassword: !form.showNewPassword
                        })
                      }
                      name={form.showNewPassword ? 'eye-off' : 'eye'}
                    />
                  }
                />
                {errors.newPassword ? (
                  <Box mb={2}>
                    <HelperText type="error">{errors.newPassword}</HelperText>
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
                    <HelperText type="error">
                      {errors.confirmNewPassword}
                    </HelperText>
                  </Box>
                ) : null}
                <Button
                  onPress={onSubmit}
                  loading={loading}
                  color="accent"
                  labelStyle={{ color: theme.colors.custom.white }}
                >
                  Atualizar
                </Button>
              </Box>
            </Container>
          </ScrollView>
          <MessageModal
            message={errorMessage}
            setMessage={setErrorMessage}
            error
          />
          <MessageModal
            message={successMessage}
            setMessage={setSuccessMessage}
            success
          />
        </>
      ) : null}
    </>
  )
}

export default EditProfile
