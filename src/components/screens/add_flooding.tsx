import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Appbar,
  Typography,
  Box,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  Container,
  RadioButton
} from 'src/components/atoms'
import ImagePicker from 'react-native-image-picker'
import ImageView from 'react-native-image-viewing'
import { AddressSearchInput, MessageModal } from 'src/components/molecules'
import { useTheme } from 'react-native-paper'
import GeocoderLibrary from 'react-native-geocoding'
import { GOOGLE_MAPS_API_KEY } from '@env'
import { createFlooding } from 'src/store/floodings'
import { useDispatch } from 'src/store'

interface Form {
  description: string
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
  severity: '1' | '2' | '3'
}

const AddFlodding: React.FC = () => {
  const [openImage, setOpenImage] = useState(false)
  const [form, setForm] = useState<Form>({
    description: '',
    picture: '',
    severity: '1'
  })
  const navigation = useNavigation()
  const [searchAddress, setSearchAddress] = useState('')
  const theme = useTheme()
  const Geocoder = GeocoderLibrary as any
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()

  Geocoder.init(GOOGLE_MAPS_API_KEY)

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

  const submit = async () => {
    try {
      if (loading) {
        return
      }

      if (!form.description || !searchAddress || !form.severity) {
        setErrorMessage('Todos campos obrigatórios devem ser preenchidos.')
        return
      }

      setLoading(true)

      const location = await Geocoder.from(searchAddress)

      const latitude = location.results[0].geometry.location.lat
      const longitude = location.results[0].geometry.location.lng

      const newFlooding = {
        description: form.description,
        address: searchAddress,
        latitude,
        longitude,
        picture: form.picture,
        severity: Number(form.severity),
        date: new Date().getTime()
      }

      dispatch(await createFlooding(newFlooding))

      navigation.navigate('Home')
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
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Adicionar alagamento" />
      </Appbar.Header>
      <Container p={2}>
        <TextInput
          label="Descrição *"
          placeholder="Descreva o alagamento"
          mb={3}
          onChangeText={(text) => onChange('description', text)}
          value={form.description}
        />
        <AddressSearchInput
          searchAddress={searchAddress}
          setSearchAddress={setSearchAddress}
          mb={3}
          label="Localização *"
          placeholder="Informe a localização"
        />
        <Box flexDirection="row" alignItems="center" mb={3}>
          <Typography fontWeight="bold">Classificação:</Typography>
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
        <Box justifyContent="center" alignItems="center" mb={3}>
          <ImageView
            images={[
              typeof form.picture !== 'string'
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
                typeof form.picture !== 'string'
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
        <Button
          color="accent"
          labelStyle={{ color: 'white' }}
          onPress={submit}
          loading={loading}
        >
          Adicionar
        </Button>
      </Container>
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
    </>
  )
}

export default AddFlodding
