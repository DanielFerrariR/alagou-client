import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef
} from 'react'
import {
  TextInput,
  Menu,
  MenuItem,
  TextInputProps,
  Box,
  ActivityIndicator
} from 'src/components/atoms'
import { PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { useTheme, TextInput as OldTextInput } from 'react-native-paper'
import { useWindowDimensions } from 'src/hooks'
import RNGooglePlaces from 'react-native-google-places'
import GeocoderLibrary from 'react-native-geocoding'
import { GOOGLE_MAPS_APIKEY } from '@env'
import MessageModal from './message_modal'

type Props = {
  searchAddress: string
  setSearchAddress: Dispatch<SetStateAction<string>>
  results: string[] | null
  setResults: Dispatch<SetStateAction<string[] | null>>
} & TextInputProps

const AddressSearchInput: React.FC<Props> = ({
  searchAddress,
  setSearchAddress,
  results,
  setResults,
  ...rest
}) => {
  const [openSearchBox, setOpenSearchBox] = useState(false)
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [initialRender, setInitialRender] = useState(false)
  const theme = useTheme()
  const inputRef = useRef<any>()
  const skipRef = useRef<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const dimensions = useWindowDimensions()
  const Geocoder = GeocoderLibrary as any
  Geocoder.init(GOOGLE_MAPS_APIKEY)

  useEffect(() => {
    if (!initialRender) {
      setInitialRender(true)

      return
    }

    const asyncEffect = async () => {
      try {
        const response = await RNGooglePlaces.getAutocompletePredictions(
          searchAddress,
          { country: 'BR' }
        )

        const addresses = response.map((each) => {
          return each.fullText
        })

        setResults(addresses)

        if (skipRef.current) {
          inputRef.current.blur()

          return
        }

        if (response?.length) {
          setOpenSearchBox(true)
        } else {
          setOpenSearchBox(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    asyncEffect()
  }, [searchAddress])

  const verifyLocationPermission = async () => {
    try {
      const accessFineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (accessFineLocation === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const getLocation = async () => {
    setLoadingLocation(true)

    const hasLocationPermission = await verifyLocationPermission()

    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await Geocoder.from(
              position.coords.latitude,
              position.coords.longitude
            )

            const address = response.results[0].formatted_address

            skipRef.current = true
            setSearchAddress(address)
          } catch (error) {
            console.log(error)
          }
        },
        (error) => {
          console.log(error.code, error.message)
        },
        { enableHighAccuracy: true }
      )
    } else {
      setErrorMessage(
        'Por favor, habilite os serviços de localização e tente novamente.'
      )
    }

    setLoadingLocation(false)
  }

  const onBlurInput = () => {
    if (skipRef.current) {
      skipRef.current = false
      setOpenSearchBox(false)

      return
    }

    if (!results?.find((element) => element === searchAddress)) {
      setSearchAddress('')
    }
  }

  const onClickMenuitem = (item: string) => {
    if (searchAddress === item) {
      inputRef.current.blur()
      setOpenSearchBox(false)

      return
    }

    skipRef.current = true
    setSearchAddress(item)
  }

  return (
    <>
      <Menu
        visible={openSearchBox && !!results && results.length > 0}
        onDismiss={() => setOpenSearchBox(false)}
        style={{
          width: dimensions.width - 32,
          marginTop: 64
        }}
        anchor={
          <Box>
            <TextInput
              ref={inputRef}
              onBlur={onBlurInput}
              onChangeText={(text) => setSearchAddress(text)}
              value={searchAddress}
              right={
                searchAddress ? (
                  <OldTextInput.Icon
                    color={theme.colors.placeholder}
                    onPress={() => setSearchAddress('')}
                    name="close"
                    style={{ display: loadingLocation ? 'none' : undefined }}
                  />
                ) : (
                  <OldTextInput.Icon
                    color={theme.colors.placeholder}
                    onPress={() => getLocation()}
                    name="crosshairs"
                    style={{ display: loadingLocation ? 'none' : undefined }}
                  />
                )
              }
              {...rest}
            />
            {loadingLocation ? (
              <Box position="absolute" top="23px" right="15px">
                <ActivityIndicator animating size={24} color="accent" />
              </Box>
            ) : null}
          </Box>
        }
      >
        {results &&
          results.map((each) => (
            <MenuItem
              key={each}
              onPress={() => onClickMenuitem(each)}
              title={each}
              style={{ maxWidth: '100%' }}
              contentStyle={{ maxWidth: '100%' }}
            />
          ))}
      </Menu>
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
    </>
  )
}

export default AddressSearchInput
