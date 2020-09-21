import React, { useState, useEffect } from 'react'
import MapView, { Circle, Marker, Callout } from 'react-native-maps'
import { Box, ActivityIndicator, Typography, Image } from 'src/components/atoms'
import { MessageModal } from 'src/components/molecules'
import { useLocation } from 'src/hooks'
import { FAB, Portal, Provider, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'src/store'
import { FloodingsState } from 'src/store/floodings'
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
  const [location, errorMessage, setErrorMessage] = useLocation()
  const [openFab, setOpenFab] = React.useState(false)
  const floodings = useSelector((state) => state.floodings)
  const [region, setRegion] = useState<Region>()
  const [onlyOnce, setOnlyOnce] = useState(false)
  const [mapType, setMapType] = useState<MapType>('standard')
  const [openChooseMapTypeModal, setOpenChooseMapTypeModal] = useState(false)

  useEffect(() => {
    if (onlyOnce) {
      return
    }

    if (location) {
      if (route?.params) {
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
            <ActivityIndicator animating size="large" />
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
              <Circle
                center={{ ...location.coords }}
                radius={30}
                strokeColor={theme.colors.custom.userLocationStroke}
                fillColor={theme.colors.custom.userLocationStroke}
              />
            ) : null}
            {floodings
              ? floodings.map((each) => {
                  const sameLocationFloodings = floodings.filter(
                    (insideEach) => insideEach.address === each.address
                  )

                  return (
                    <Marker
                      key={each._id}
                      coordinate={{
                        latitude: each.latitude,
                        longitude: each.longitude
                      }}
                    >
                      <Image
                        source={
                          each.isVerified
                            ? require('src/images/flooding_place_verified_larger.png')
                            : require('src/images/flooding_place_larger.png')
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
                onPress: () => console.log('Abrir calendario')
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
    </>
  )
}

export default Map
