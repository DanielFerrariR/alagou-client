import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar, Container, Typography } from 'src/components/atoms'

const Settings: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Configurações" />
      </Appbar.Header>
      <Container>
        <Typography>Settings</Typography>
      </Container>
    </>
  )
}

export default Settings
