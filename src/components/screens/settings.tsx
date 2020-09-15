import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar, Container, Menu } from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import { DeleteUserModal } from 'src/components/organisms'

const Settings: React.FC = () => {
  const [open, setOpen] = useState(false)
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
              name="information-outline"
              color={theme.colors.custom.information}
              size={size}
            />
          )}
          onPress={() => navigation.navigate('About')}
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
          onPress={() => setOpen(true)}
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
          onPress={() => navigation.navigate('Support')}
          title="Suporte"
          style={{ maxWidth: '100%' }}
        />
      </Container>
      <DeleteUserModal open={open} setOpen={setOpen} />
    </>
  )
}

export default Settings
