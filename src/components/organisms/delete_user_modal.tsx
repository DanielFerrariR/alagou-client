import React, { useState, Dispatch, SetStateAction } from 'react'
import {
  Box,
  Typography,
  Button,
  Dialog,
  Portal,
  TextInput
} from 'src/components/atoms'
import { MessageModal } from 'src/components/molecules'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import { serverAPI } from 'src/services'
import { eventEmitterInstance } from 'src/utils'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteUserModal: React.FC<Props> = ({ open, setOpen }) => {
  const [form, setForm] = useState({
    password: ''
  })
  const theme = useTheme()
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    try {
      if (loading) {
        return
      }

      if (!form.password) {
        setOpen(false)
        setErrorMessage('A senha é obrigatória.')
        return
      }

      setLoading(true)

      await serverAPI.post('/delete-account', { password: form.password })

      eventEmitterInstance.emit('logout', {
        detail: 'Usuário deletado com sucesso!'
      })
    } catch (error) {
      console.log(error)
      setOpen(false)
      setLoading(false)

      if (error?.response?.data?.error) {
        setErrorMessage(error.response.data.error)
        return
      }

      setErrorMessage('Falha em conectar.')
    }
  }

  const onChange = (name: keyof typeof form, text: string) => {
    setForm({ ...form, [name]: text })
  }

  return (
    <>
      <Portal>
        <Dialog visible={open} onDismiss={() => setOpen(false)}>
          <Dialog.Content>
            <Box width={1} flexDirection="row" justifyContent="center" mb={3}>
              <MaterialCommunityIcons
                name="alert-outline"
                color={theme.colors.custom.warning}
                size={64}
              />
            </Box>
            <Typography mb={3} textAlign="center">
              Você tem certeza que deseja excluir sua conta? Se sim, confirme
              sua senha.
            </Typography>
            <Typography color="custom.error" mb={3} textAlign="center">
              Todos alagamentos criados por você serão deletados.
            </Typography>
            <Typography color="custom.error" mb={3} textAlign="center">
              Essa operação não pode ser revertida.
            </Typography>
            <TextInput
              label="Senha"
              placeholder="Digite sua senha"
              onChangeText={(text) => onChange('password', text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="text" onPress={() => setOpen(false)} mr={1}>
              Cancelar
            </Button>
            <Button mode="text" onPress={submit} loading={loading}>
              Excluir
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
    </>
  )
}

export default DeleteUserModal
