import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Typography,
  Box,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  Container,
  RadioButton,
  IconButton,
  HelperText
} from 'src/components/atoms'
import ImagePicker from 'react-native-image-picker'
import ImageView from 'react-native-image-viewing'
import {
  BackHeader,
  AddressSearchInput,
  MessageModal
} from 'src/components/molecules'
import { useTheme } from 'react-native-paper'
import { editFlooding, FloodingsState } from 'src/store/floodings'
import { useDispatch } from 'src/store'
import { Keyboard } from 'react-native'
import GeocoderLibrary from 'react-native-geocoding'
import { GOOGLE_MAPS_APIKEY } from '@env'

interface Form {
  title: string
  picture:
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
    | string
  severity: '1' | '2' | '3'
}

interface Props {
  route: {
    key: string
    name: string
    params: {
      data: FloodingsState[0]
    }
  }
}

interface Errors {
  title: string | false
  searchAddress: string | false
}

const EditFlooding: React.FC<Props> = ({ route }) => {
  const flooding = route.params.data
  const [openImage, setOpenImage] = useState(false)
  const [form, setForm] = useState<Form>({
    title: (flooding && flooding.title) || '',
    picture: (flooding && flooding.picture) || '',
    severity: String(flooding && flooding.severity) as Form['severity']
  })
  const [errors, setErrors] = useState<Errors>({
    title: false,
    searchAddress: false
  })
  const navigation = useNavigation()
  const [searchAddress, setSearchAddress] = useState(
    (flooding && flooding.address) || ''
  )
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const dispatch = useDispatch()
  const [results, setResults] = useState<string[] | null>(null)
  const Geocoder = GeocoderLibrary as any
  Geocoder.init(GOOGLE_MAPS_APIKEY)

  const onChange = (name: keyof typeof form, text: string) => {
    setForm({ ...form, [name]: text })
    setErrors({ ...errors, [name]: false })
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

  const onSubmit = async () => {
    try {
      Keyboard.dismiss()

      if (loading) {
        return
      }

      if (!form.title || !searchAddress) {
        const errorsMessage = []

        if (!form.title) {
          errorsMessage.push('O título precisa ser preenchido.')
        }

        if (!searchAddress) {
          errorsMessage.push('O endereço precisa ser prenchido.')
        }

        setErrorMessage(errorsMessage)
        setErrors({
          ...errors,
          title: !form.title && 'O título precisa ser preenchido.',
          searchAddress: !searchAddress && 'O endereço precisa ser preenchido.'
        })

        return
      }

      setLoading(true)

      const location = await Geocoder.from(searchAddress)

      const latitude = location.results[0].geometry.location.lat
      const longitude = location.results[0].geometry.location.lng

      const editedFlooding = {
        _id: flooding._id,
        title: form.title,
        address: searchAddress,
        latitude,
        longitude,
        picture: form.picture,
        severity: Number(form.severity)
      }

      dispatch(await editFlooding(editedFlooding))

      navigation.goBack()
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

  const chooseDisplayPhoto = () => {
    if (form.picture && typeof form.picture === 'string') {
      return { uri: form.picture }
    }
    if (form.picture && typeof form.picture !== 'string')
      return { uri: form.picture.uri }

    return require('src/images/no_flooding_picture.png')
  }

  return (
    <>
      <BackHeader title="Editar alagamento" />
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
        <AddressSearchInput
          searchAddress={searchAddress}
          setSearchAddress={setSearchAddress}
          results={results}
          setResults={setResults}
          mb={errors.searchAddress ? 0 : 3}
          label="Endereço *"
          placeholder="Digite o endereço"
        />
        {errors.searchAddress ? (
          <Box mb={2}>
            <HelperText type="error">{errors.searchAddress}</HelperText>
          </Box>
        ) : null}
        <Box flexDirection="row" alignItems="center">
          <Typography fontWeight="bold">Classificação:</Typography>
          <IconButton
            icon="information-outline"
            color="accent"
            onPress={() => navigation.navigate('Faq')}
          />
        </Box>
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
        <Box justifyContent="center" alignItems="center" mb={3}>
          <ImageView
            images={[chooseDisplayPhoto()]}
            imageIndex={0}
            visible={openImage}
            onRequestClose={() => setOpenImage(false)}
          />
          <TouchableOpacity onPress={() => setOpenImage(true)} width={1}>
            <Image
              source={chooseDisplayPhoto()}
              width={1}
              height={148}
              mb={1}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChoosePhoto} mb={1}>
            <Typography variant="h3" color="accent" fontWeight="bold">
              Adicionar Foto
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setForm({ ...form, picture: '' })}>
            <Typography variant="h3" color="accent" fontWeight="bold">
              Remover Foto
            </Typography>
          </TouchableOpacity>
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

export default EditFlooding
