import React, { useState } from 'react'
import {
  Typography,
  TextInput,
  Button,
  Box,
  TouchableOpacity,
  Image,
  ScrollView,
  Container
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

const EditProfile: React.FC = () => {
  const userSession = ensure(useSelector((state) => state.user))
  const [openpicture, setOpenpicture] = useState(false)
  const [form, setForm] = useState<Form>({
    name: userSession.name,
    email: userSession.email,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    picture: userSession.picture,
    showOldPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
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

      if (!form.name || !form.email) {
        setErrorMessage('Todos campos obrigatórios devem ser preenchidos.')
        return
      }

      if (form.oldPassword && !form.newPassword && !form.confirmNewPassword) {
        setErrorMessage(
          'A nova senha e sua confirmação são obrigatórias ao informar a senha atual.'
        )
        return
      }

      if (form.newPassword && form.newPassword !== form.confirmNewPassword) {
        setErrorMessage('A confirmação de senha não é igual a senha.')
        return
      }

      setLoading(true)

      const response = await editUser(userSession, {
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
        return
      }

      setErrorMessage('Falha em conectar.')
    }
  }

  return (
    <>
      <BackHeader title="Editar Perfil" />
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
              color="accent"
              labelStyle={{ color: theme.colors.custom.white }}
            >
              Atualizar
            </Button>
          </Box>
        </Container>
      </ScrollView>
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
      <MessageModal
        message={successMessage}
        setMessage={setSuccessMessage}
        success
      />
    </>
  )
}

export default EditProfile
