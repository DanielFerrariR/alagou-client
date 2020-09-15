import React from 'react'
import { Appbar, Container, MenuItem } from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'

const Administration: React.FC = () => {
  const navigation = useNavigation()
  const theme = useTheme()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Administração" />
      </Appbar.Header>
      <Container>
        <MenuItem
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="water"
              color={theme.colors.custom.water}
              size={size}
            />
          )}
          onPress={() => {}}
          title="Importar CSV com alagamentos"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: Dimensions.get('window').width - 88
          }}
        />
        <MenuItem
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="alert-circle"
              color={theme.colors.custom.alert}
              size={size}
            />
          )}
          onPress={() => {}}
          title="Gerenciar alertas"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: Dimensions.get('window').width - 88
          }}
        />
      </Container>
    </>
  )
}

export default Administration
