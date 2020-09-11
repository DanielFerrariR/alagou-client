import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef
} from 'react'
import { TextInput, Menu, TextInputProps } from 'src/components/atoms'
import { Dimensions, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import GeocoderLibrary from 'react-native-geocoding'
import { GOOGLE_MAPS_API_KEY } from '@env'
import { useTheme, TextInput as OldTextInput } from 'react-native-paper'
import { GoogleMapsAPI } from 'src/services'

type Props = {
  searchAddress: string
  setSearchAddress: Dispatch<SetStateAction<string>>
} & TextInputProps

interface GetLocationsAxiosResponse {
  predictions: {
    description: string
  }[]
}

const AddressSearchInput: React.FC<Props> = ({
  searchAddress,
  setSearchAddress,
  ...rest
}) => {
  const [openSearchBox, setOpenSearchBox] = useState(false)
  const Geocoder = GeocoderLibrary as any
  const [results, setResults] = useState<string[] | null>(null)
  const [loadingLocation] = useState(false)
  const theme = useTheme()
  const inputRef = useRef<any>()
  const skipRef = useRef<boolean>(false)

  Geocoder.init(GOOGLE_MAPS_API_KEY)

  useEffect(() => {
    if (skipRef.current) {
      inputRef.current.blur()

      return
    }

    const asyncEffect = async () => {
      const response = await GoogleMapsAPI.get<GetLocationsAxiosResponse>(
        `/maps/api/place/autocomplete/json?&input=${encodeURI(
          searchAddress
        )}&key=${GOOGLE_MAPS_API_KEY}&language=pt-BR&components=country%3Abr`
      )

      const newResults = response.data.predictions.map((each) => {
        return each.description
      })

      setResults(newResults)

      if (newResults?.length) {
        setOpenSearchBox(true)
      } else {
        setOpenSearchBox(false)
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
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    } else {
      console.log('Please enable location services')
    }
  }

  const onFocusInput = () => {
    if (searchAddress) {
      setOpenSearchBox(true)
    }
  }

  const onBlurInput = () => {
    if (skipRef.current) {
      skipRef.current = false
      setOpenSearchBox(false)

      return
    }

    if (results && !results.find((element) => element === searchAddress)) {
      setSearchAddress('')
    }

    setOpenSearchBox(false)
  }

  return (
    <Menu
      visible={openSearchBox}
      onDismiss={() => setOpenSearchBox(false)}
      style={{
        width: Dimensions.get('window').width - 32,
        marginTop: 64
      }}
      anchor={
        <TextInput
          ref={inputRef}
          onBlur={onBlurInput}
          onFocus={onFocusInput}
          onChangeText={(text) => setSearchAddress(text)}
          value={searchAddress}
          right={
            searchAddress ? (
              <OldTextInput.Icon
                color={theme.colors.accent}
                onPress={() => setSearchAddress('')}
                name="close"
              />
            ) : (
              <OldTextInput.Icon
                color={theme.colors.accent}
                onPress={() => getLocation()}
                name="crosshairs"
                style={{ display: loadingLocation ? 'none' : undefined }}
              />
            )
          }
          {...rest}
        />
      }
    >
      {results &&
        results.map((each) => (
          <Menu.Item
            key={each}
            onPress={() => {
              skipRef.current = true
              setSearchAddress(each)
            }}
            title={each}
            style={{ maxWidth: '100%' }}
          />
        ))}
    </Menu>
  )
}

export default AddressSearchInput
