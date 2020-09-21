import React, { useState, useEffect } from 'react'
import MapView, { Circle, Marker, Callout } from 'react-native-maps'
import { Box, ActivityIndicator, Typography } from 'src/components/atoms'
import { MessageModal } from 'src/components/molecules'
import { useLocation } from 'src/hooks'
import { FAB, Portal, Provider, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'src/store'
import { FloodingsState } from 'src/store/floodings'

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

const Map: React.FC<Props> = ({ route }) => {
  const theme = useTheme()
  const navigation = useNavigation()
  const [location, errorMessage, setErrorMessage] = useLocation()
  const [openFab, setOpenFab] = React.useState(false)
  const floodings = useSelector((state) => state.floodings)
  const [region, setRegion] = useState<Region>()
  const [onlyOnce, setOnlyOnce] = useState(false)

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

  console.log(region)

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
            // initialRegion={(newRegion) => setRegion(newRegion)}
            style={{ height: '100%' }}
            initialRegion={{
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
              ? floodings.map((each) => (
                  <Marker
                    key={each._id}
                    image={require('src/images/flooding_place.png')}
                    coordinate={{
                      latitude: each.latitude,
                      longitude: each.longitude
                    }}
                  >
                    <Callout
                      onPress={() =>
                        navigation.navigate('FloodingList', {
                          _id: each._id
                        })
                      }
                    >
                      <Box width={100}>
                        <Typography>This is a plain Box</Typography>
                      </Box>
                    </Callout>
                  </Marker>
                ))
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
                onPress: () => console.log('Abrir tipo de mapa')
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
    </>
  )
}

export default Map
