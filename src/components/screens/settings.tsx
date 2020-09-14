import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar, Container, Menu } from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'

const Settings: React.FC = () => {
  const navigation = useNavigation()
  const theme = useTheme()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Configurações" />
      </Appbar.Header>
      <Container>
        <Menu.Item
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="alert-circle"
              color={theme.colors.custom.information}
              size={size}
            />
          )}
          onPress={() => {}}
          title="Sobre o aplicativo"
          style={{ maxWidth: '100%' }}
        />
        <Menu.Item
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="delete"
              color={theme.colors.custom.trash}
              size={size}
            />
          )}
          onPress={() => {}}
          title="Excluir conta"
          style={{ maxWidth: '100%' }}
        />
        <Menu.Item
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="email"
              color={theme.colors.custom.email}
              size={size}
            />
          )}
          onPress={() => {}}
          title="Suporte"
          style={{ maxWidth: '100%' }}
        />
      </Container>
    </>
  )
}

export default Settings
