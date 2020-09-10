import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Appbar,
  Typography,
  Box,
  TextInput,
  IconButton,
  Image,
  TouchableOpacity,
  Button
} from 'src/components/atoms'
import { useTheme, TextInput as OldTextInput } from 'react-native-paper'
import ImagePicker from 'react-native-image-picker'

interface Form {
  description: string
  localization: string
  picture: null | {
    name: string
    type: string
    uri: string
  }
}

const AddFlodding: React.FC = () => {
  const [form, setForm] = useState<Form>({
    description: '',
    localization: '',
    picture: null
  })
  const navigation = useNavigation()
  const theme = useTheme()

  const onChange = (name: keyof typeof form, text: string) => {
    setForm({ ...form, [name]: text })
  }

  const handleChoosePhoto = () => {
    const options = {
      noData: true
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        setForm({ ...form, picture: response as any })
      }
    })
  }

  const submit = () => {}

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Adicionar alagamento" />
      </Appbar.Header>
      <Box p={2}>
        <TextInput
          label="Descrição"
          placeholder="Descreva o alagamento"
          mb={3}
          onChangeText={(text) => onChange('description', text)}
          value={form.description}
        />
        <TextInput
          label="Localização"
          placeholder="Informe a localização"
          mb={3}
          onChangeText={(text) => onChange('localization', text)}
          value={form.localization}
          right={
            <OldTextInput.Icon
              color={theme.colors.accent}
              onPress={() => console.log('test')}
              name="crosshairs"
            />
          }
        />
        <Box flexDirection="row" alignItems="center" mb={3}>
          <Typography fontWeight="bold">Classificação:</Typography>
          <IconButton
            icon="information-outline"
            color="accent"
            onPress={() => navigation.navigate('Faq')}
          />
        </Box>
        <Box justifyContent="center" alignItems="center" mb={3}>
          <Image
            source={
              form.picture
                ? { uri: form.picture.uri }
                : require('src/images/no_photo.png')
            }
            width={1}
            height={120}
            mb={1}
          />
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Typography variant="h3" color="accent" fontWeight="bold">
              Adicionar Foto
            </Typography>
          </TouchableOpacity>
        </Box>
        <Button color="accent" labelStyle={{ color: 'white' }} onPress={submit}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default AddFlodding
