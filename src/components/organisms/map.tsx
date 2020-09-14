import React from 'react'
import MapView, { Circle } from 'react-native-maps'
import { Box, ActivityIndicator } from 'src/components/atoms'
import { MessageModal } from 'src/components/molecules'
import { useLocation } from 'src/hooks'
import { FAB, Portal, Provider, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Map: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const [location, message, setMessage] = useLocation()
  const [openFab, setOpenFab] = React.useState(false)

  return (
    <>
      <Box height={1}>
        {!location ? (
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
              ...location.coords
            }}
          >
            <Circle
              center={{
                ...location.coords
              }}
              radius={30}
              strokeColor={theme.colors.custom.userLocationStroke}
              fillColor={theme.colors.custom.userLocationStroke}
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
            color="white"
            actions={[
              {
                icon: 'plus',
                label: 'Adicionar alagamento',
                onPress: () => navigation.navigate('AddFlooding')
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
                label: 'Minha Localização',
                onPress: () => console.log('Localizar')
              }
            ]}
            onStateChange={({ open }) => setOpenFab(open)}
          />
        </Portal>
      </Provider>
      <MessageModal message={message} setMessage={setMessage} />
    </>
  )
}

export default Map
