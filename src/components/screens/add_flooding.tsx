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
  Button,
  Container
} from 'src/components/atoms'
import ImagePicker from 'react-native-image-picker'
import ImageView from 'react-native-image-viewing'
import { AddressSearchInput } from 'src/components/molecules'

interface Form {
  description: string
  picture: null | {
    fileName: string
    type: string
    uri: string
  }
}

const AddFlodding: React.FC = () => {
  const [openImage, setOpenImage] = useState(false)
  const [form, setForm] = useState<Form>({
    description: '',
    picture: null
  })
  const navigation = useNavigation()
  const [searchAddress, setSearchAddress] = useState('')

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
      <Container p={2}>
        <TextInput
          label="Descrição"
          placeholder="Descreva o alagamento"
          mb={3}
          onChangeText={(text) => onChange('description', text)}
          value={form.description}
        />
        <AddressSearchInput
          searchAddress={searchAddress}
          setSearchAddress={setSearchAddress}
          mb={3}
          label="Localização"
          placeholder="Informe a localização"
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
          <ImageView
            images={[
              form.picture
                ? { uri: form.picture.uri }
                : require('src/images/no_flooding_picture.png')
            ]}
            imageIndex={0}
            visible={openImage}
            onRequestClose={() => setOpenImage(false)}
          />
          <TouchableOpacity onPress={() => setOpenImage(true)} width={1}>
            <Image
              source={
                form.picture
                  ? { uri: form.picture.uri }
                  : require('src/images/no_flooding_picture.png')
              }
              width={1}
              height={148}
              mb={1}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Typography variant="h3" color="accent" fontWeight="bold">
              Adicionar Foto
            </Typography>
          </TouchableOpacity>
        </Box>
        <Button color="accent" labelStyle={{ color: 'white' }} onPress={submit}>
          Adicionar
        </Button>
      </Container>
    </>
  )
}

export default AddFlodding
