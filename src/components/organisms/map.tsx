import React, { useState, useEffect, useCallback } from 'react'
import MapView, { Circle, Marker, Callout } from 'react-native-maps'
import {
  Box,
  ActivityIndicator,
  Typography,
  Portal,
  FAB,
  Provider,
  Dialog,
  Button,
  TextInput,
  TouchableOpacity
} from 'src/components/atoms'
import { AddressSearchInput, MessageModal } from 'src/components/molecules'
import { useLocation, useWindowDimensions } from 'src/hooks'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'src/store'
import { FloodingsState } from 'src/store/floodings'
import { isDateInRange, formatDate } from 'src/utils'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import GeocoderLibrary from 'react-native-geocoding'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Navigation } from 'src/images'
import ChooseMapTypeModal from './choose_map_type_modal'

interface Props {
  route?: {
    key: string
    name: string
    params: {
      data: FloodingsState[0]
    } | null
  }
}

interface Region {
  latitude: number
  longitude: number
}

type MapType =
  | 'standard'
  | 'satellite'
  | 'hybrid'
  | 'terrain'
  | 'none'
  | 'mutedStandard'

const Map: React.FC<Props> = ({ route }) => {
  const theme = useTheme()
  const navigation = useNavigation()
  const [openChooseMapTypeModal, setOpenChooseMapTypeModal] = useState(false)
  const [location, setLocation] = useState<Geolocation.GeoPosition | null>(null)
  const [openDatePickerModal, setOpenDatePickerModal] = useState(false)
  const callback = useCallback(
    (currentLocation) => {
      if (!openDatePickerModal) {
        setLocation(currentLocation)
      }
    },
    [openDatePickerModal]
  )
  const [errorMessage, setErrorMessage] = useLocation(callback)
  const [openFab, setOpenFab] = useState(false)
  const floodings = useSelector((state) => state.floodings)
  const [
    filteredFloodings,
    setFilteredFloodings
  ] = useState<FloodingsState | null>(null)
  const [region, setRegion] = useState<Region>()
  const [onlyOnce, setOnlyOnce] = useState(false)
  const [mapType, setMapType] = useState<MapType>('standard')
  const [openStartDateModal, setOpenStartDateModal] = useState(false)
  const [openEndDateModal, setOpenEndDateModal] = useState(false)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  })
  const [searchAddress, setSearchAddress] = useState('')
  const [results, setResults] = useState<string[] | null>(null)
  const dimensions = useWindowDimensions()
  const Geocoder = GeocoderLibrary as any

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        if (!results?.find((element) => element === searchAddress)) {
          return
        }

        const newLocation = await Geocoder.from(searchAddress)

        const latitude = newLocation.results[0].geometry.location.lat
        const longitude = newLocation.results[0].geometry.location.lng

        setRegion({
          latitude,
          longitude
        })
      } catch (error) {
        console.log(error)
      }
    }

    asyncEffect()
  }, [searchAddress, results])

  useEffect(() => {
    if (floodings) {
      const newFloodings = floodings.filter((each) =>
        isDateInRange(each.date, dateRange.startDate, dateRange.endDate)
      )

      setFilteredFloodings(newFloodings)
    }
  }, [floodings, dateRange])

  useEffect(() => {
    if (onlyOnce) {
      return
    }

    if (location) {
      if (route?.params) {
        setDateRange({
          startDate: new Date(route.params.data.date),
          endDate: new Date(route.params.data.date)
        })
        setRegion({
          latitude: route.params.data.latitude,
          longitude: route.params.data.longitude
        })
      } else {
        setRegion(location.coords)
      }
      setOnlyOnce(true)
    }
  }, [location])

  useEffect(() => {
    return () => {
      if (route) {
        route.params = null
      }
    }
  }, [])

  console.log(location)

  return (
    <>
      <Box height={1}>
        {!region ? (
          <Box
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height={1}
          >
            <ActivityIndicator animating size="large" color="accent" />
          </Box>
        ) : (
          <MapView
            mapType={mapType}
            onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            style={{ height: '100%' }}
            region={{
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
              ...region
            }}
          >
            {location ? (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude
                }}
                pointerEvents="none"
                rotation={location.coords.heading ? location.coords.heading : 0}
              >
                <Navigation />
              </Marker>
            ) : null}
            {filteredFloodings
              ? filteredFloodings.map((each) => {
                  const sameLocationFloodings = filteredFloodings.filter(
                    (insideEach) => insideEach.address === each.address
                  )

                  return (
                    <Marker
                      key={each._id}
                      coordinate={{
                        latitude: each.latitude,
                        longitude: each.longitude
                      }}
                      zIndex={each.isVerified === true ? -1 : -2}
                    >
                      <MaterialCommunityIcons
                        name="water"
                        size={32}
                        color={
                          each.isVerified
                            ? theme.colors.custom.verified
                            : theme.colors.accent
                        }
                      />
                      <Callout
                        onPress={() =>
                          navigation.navigate('FloodingList', {
                            data: sameLocationFloodings
                          })
                        }
                      >
                        <Box width={200}>
                          <Typography
                            ellipsizeMode="tail"
                            numberOfLines={3}
                            variant="h3"
                          >
                            <Typography fontWeight="bold" variant="h3">
                              Endereço:
                            </Typography>
                            &nbsp;
                            {each.address}
                          </Typography>
                          <Typography
                            ellipsizeMode="tail"
                            numberOfLines={3}
                            variant="h3"
                          >
                            <Typography fontWeight="bold" variant="h3">
                              Alagamentos neste local:
                            </Typography>
                            &nbsp;
                            {sameLocationFloodings.length}
                          </Typography>
                        </Box>
                      </Callout>
                    </Marker>
                  )
                })
              : null}
          </MapView>
        )}
      </Box>
      <Box
        position="absolute"
        top="72px"
        left="16px"
        width={dimensions.width - 32}
      >
        <AddressSearchInput
          searchAddress={searchAddress}
          setSearchAddress={setSearchAddress}
          results={results}
          setResults={setResults}
          placeholder="Digite o endereço"
        />
      </Box>
      <Provider>
        <Portal>
          <FAB.Group
            visible
            open={openFab}
            icon={openFab ? 'close' : 'plus'}
            color={theme.colors.custom.white}
            actions={[
              {
                icon: 'plus',
                label: 'Adicionar alagamento',
                onPress: () => navigation.navigate('AddFlooding')
              },
              {
                icon: 'calendar-range',
                label: 'Data',
                onPress: () => setOpenDatePickerModal(true)
              },
              {
                icon: 'buffer',
                label: 'Tipo de mapa',
                onPress: () => setOpenChooseMapTypeModal(true)
              },
              {
                icon: 'crosshairs',
                label: 'Minha Localização',
                onPress: () => {
                  if (location) {
                    setRegion({ ...location.coords })
                  }
                }
              }
            ]}
            onStateChange={({ open }) => setOpenFab(open)}
          />
        </Portal>
      </Provider>
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
      <ChooseMapTypeModal
        openChooseMapTypeModal={openChooseMapTypeModal}
        setOpenChooseMapTypeModal={setOpenChooseMapTypeModal}
        mapType={mapType}
        setMapType={setMapType}
      />
      <Portal>
        <Dialog
          visible={openDatePickerModal}
          onDismiss={() => setOpenDatePickerModal(false)}
        >
          <Box p={2}>
            <Typography mb={3}>Selecione o período desejado:</Typography>
            <TouchableOpacity
              onPress={() => setOpenStartDateModal(true)}
              mb={3}
            >
              <Box pointerEvents="none">
                <TextInput
                  label="De"
                  value={formatDate(dateRange.startDate, { omitHours: true })}
                />
              </Box>
            </TouchableOpacity>
            {openStartDateModal && (
              <DateTimePicker
                value={dateRange.startDate}
                onChange={(_event, selectedDate) => {
                  const currentDate = selectedDate || dateRange.startDate

                  setOpenStartDateModal(Platform.OS === 'ios')
                  setDateRange({ ...dateRange, startDate: currentDate })
                }}
              />
            )}
            <TouchableOpacity onPress={() => setOpenEndDateModal(true)} mb={3}>
              <Box pointerEvents="none">
                <TextInput
                  label="Até"
                  value={formatDate(dateRange.endDate, { omitHours: true })}
                />
              </Box>
            </TouchableOpacity>
            {openEndDateModal && (
              <DateTimePicker
                value={dateRange.endDate}
                onChange={(_event, selectedDate) => {
                  const currentDate = selectedDate || dateRange.endDate

                  setOpenEndDateModal(Platform.OS === 'ios')
                  setDateRange({ ...dateRange, endDate: currentDate })
                }}
              />
            )}
            <Button
              onPress={() => setOpenDatePickerModal(false)}
              color="accent"
              labelStyle={{ color: theme.colors.custom.white }}
            >
              Fechar
            </Button>
          </Box>
        </Dialog>
      </Portal>
    </>
  )
}

export default Map
