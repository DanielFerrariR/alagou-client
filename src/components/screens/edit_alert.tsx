import React, { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  TextInput,
  HelperText,
  Button,
  RadioButton
} from 'src/components/atoms'
import { BackHeader, MessageModal } from 'src/components/molecules'
import { useTheme } from 'react-native-paper'
import { editAlert, AlertsState } from 'src/store/alerts'
import { useDispatch } from 'src/store'
import { useNavigation } from '@react-navigation/native'

interface Form {
  title: string
  content: string
  severity: '1' | '2' | '3'
}

interface Errors {
  title: string | false
  content: string | false
}

interface Props {
  route: {
    key: string
    name: string
    params: {
      data: AlertsState[0]
    }
  }
}

const EditAlert: React.FC<Props> = ({ route }) => {
  const alert = route.params.data
  const [form, setForm] = useState({
    title: (alert && alert.title) || '',
    content: (alert && alert.content) || '',
    severity: String(alert && alert.severity) as Form['severity']
  })
  const [errors, setErrors] = useState<Errors>({
    title: false,
    content: false
  })
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const onChange = (name: keyof typeof form, text: string) => {
    setForm({ ...form, [name]: text })
    setErrors({ ...errors, [name]: false })
  }

  const onSubmit = async () => {
    try {
      if (loading) {
        return
      }

      if (!form.title || !form.content) {
        const errorsMessage = []

        if (!form.title) {
          errorsMessage.push('O título precisa ser preenchido.')
        }

        if (!form.content) {
          errorsMessage.push('O conteúdo precisa ser prenchido.')
        }

        setErrorMessage(errorsMessage)
        setErrors({
          ...errors,
          title: !form.title && 'O título precisa ser preenchido.',
          content: !form.content && 'O conteúdo precisa ser preenchido.'
        })

        return
      }

      setLoading(true)

      const newAlert = {
        _id: alert._id,
        title: form.title,
        content: form.content,
        severity: Number(form.severity)
      }

      dispatch(await editAlert(newAlert))

      navigation.navigate('AlertList')
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
      <BackHeader title="Editar alerta" />
      <Container p={2}>
        <TextInput
          label="Título *"
          placeholder="Digite o título"
          mb={errors.title ? 0 : 3}
          onChangeText={(text) => onChange('title', text)}
          value={form.title}
        />
        {errors.title ? (
          <Box mb={2}>
            <HelperText type="error">{errors.title}</HelperText>
          </Box>
        ) : null}
        <TextInput
          label="Conteúdo *"
          placeholder="Digite o conteúdo"
          multiline
          maxLength={5000}
          numberOfLines={5}
          mb={errors.content ? 0 : 3}
          onChangeText={(text) => onChange('content', text)}
          value={form.content}
        />
        {errors.content ? (
          <Box mb={2}>
            <HelperText type="error">{errors.content}</HelperText>
          </Box>
        ) : null}
        <Box flexDirection="row" alignItems="center" mb={3}>
          <RadioButton.Group
            onValueChange={(value) =>
              setForm({ ...form, severity: value as any })
            }
            value={form.severity}
          >
            <RadioButton value="1" color={theme.colors.custom.light} />
            <Typography>Leve</Typography>
            <RadioButton value="2" color={theme.colors.custom.moderate} />
            <Typography>Moderado</Typography>
            <RadioButton value="3" color={theme.colors.custom.danger} />
            <Typography>Crítico</Typography>
          </RadioButton.Group>
        </Box>
        <Button
          color="accent"
          labelStyle={{ color: theme.colors.custom.white }}
          onPress={onSubmit}
          loading={loading}
        >
          Editar
        </Button>
      </Container>
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
    </>
  )
}

export default EditAlert
