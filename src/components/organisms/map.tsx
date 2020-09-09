import React, { useCallback } from 'react'
import MapView, { Circle, Polyline } from 'react-native-maps'
import { Typography, Box, ActivityIndicator } from 'src/components/atoms'
import { useLocation } from 'src/hooks'
import { useSelector, useDispatch } from 'src/store'
import { setCurrentLocation, setLocations } from 'src/store/location'
import { FAB, Portal, Provider, useTheme } from 'react-native-paper'

const Map: React.FC = () => {
  const theme = useTheme()
  const location = useSelector((state) => state.location)
  const dispatch = useDispatch()
  const callback = useCallback(
    (currentLocation) => {
      dispatch(setCurrentLocation(currentLocation))

      if (location.recording) {
        dispatch(setLocations(currentLocation))
      }
    },
    [location.recording]
  )
  const [error] = useLocation(callback)
  const [openFab, setOpenFab] = React.useState(false)

  return (
    <>
      <Box height={1}>
        {!location.currentLocation ? (
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
            style={{ height: '100%' }}
            initialRegion={{
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
              ...location.currentLocation.coords
            }}
          >
            <Circle
              center={{
                ...location.currentLocation.coords
              }}
              radius={30}
              strokeColor={theme.colors.custom.userLocationStroke}
              fillColor={theme.colors.custom.userLocationStroke}
            />
            <Polyline
              coordinates={location.locations.map((each) => each.coords)}
            />
          </MapView>
        )}
      </Box>
      <Provider>
        <Portal>
          <FAB.Group
            visible
            open={openFab}
            icon={openFab ? 'close' : 'plus'}
            actions={[
              {
                icon: 'plus',
                label: 'Adicionar alagamento',
                onPress: () => console.log('Adicionar alagamento')
              },
              {
                icon: 'calendar-today',
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
                label: 'Localização',
                onPress: () => console.log('Localizar')
              }
            ]}
            onStateChange={({ open }) => setOpenFab(open)}
          />
        </Portal>
      </Provider>
      {error ? <Typography>{error}</Typography> : null}
    </>
  )
}

export default Map
