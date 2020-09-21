import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Container, MenuItem, Divider } from 'src/components/atoms'
import { DeleteUserModal } from 'src/components/organisms'
import { Information, Delete, Email } from 'src/images'
import { BackHeader } from 'src/components/molecules'
import { useWindowDimensions } from 'src/hooks'

const Settings: React.FC = () => {
  const [open, setOpen] = useState(false)
  const navigation = useNavigation()
  const dimensions = useWindowDimensions()

  return (
    <>
      <BackHeader title="Configurações" />
      <Container>
        <MenuItem
          icon={() => <Information />}
          onPress={() => navigation.navigate('About')}
          title="Sobre o aplicativo"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: dimensions.width - 88
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
            maxWidth: dimensions.width - 88
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
            maxWidth: dimensions.width - 88
          }}
        />
        <Divider />
      </Container>
      <DeleteUserModal open={open} setOpen={setOpen} />
    </>
  )
}

export default Settings
