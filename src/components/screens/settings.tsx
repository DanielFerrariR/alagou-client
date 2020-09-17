import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar, Container, MenuItem, Divider } from 'src/components/atoms'
import { DeleteUserModal } from 'src/components/organisms'
import { Dimensions } from 'react-native'
import { Information, Delete, Email } from 'src/images'

const Settings: React.FC = () => {
  const [open, setOpen] = useState(false)
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Configurações" />
      </Appbar.Header>
      <Container>
        <MenuItem
          icon={() => <Information />}
          onPress={() => navigation.navigate('About')}
          title="Sobre o aplicativo"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: Dimensions.get('window').width - 88
          }}
        />
        <Divider />
        <MenuItem
          icon={() => <Delete />}
          onPress={() => setOpen(true)}
          title="Excluir conta"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: Dimensions.get('window').width - 88
          }}
        />
        <Divider />
        <MenuItem
          icon={() => <Email />}
          onPress={() => navigation.navigate('Support')}
          title="Suporte"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: Dimensions.get('window').width - 88
          }}
        />
        <Divider />
      </Container>
      <DeleteUserModal open={open} setOpen={setOpen} />
    </>
  )
}

export default Settings
