import React from 'react'
import { Appbar, Container, MenuItem, Divider } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import { Water, Alert } from 'src/images'

const Administration: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Administração" />
      </Appbar.Header>
      <Container>
        <MenuItem
          icon={() => <Water />}
          onPress={() => {}}
          title="Importar CSV com alagamentos"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: Dimensions.get('window').width - 88
          }}
        />
        <Divider />
        <MenuItem
          icon={() => <Alert />}
          onPress={() => {}}
          title="Gerenciar alertas"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: Dimensions.get('window').width - 88
          }}
        />
        <Divider />
      </Container>
    </>
  )
}

export default Administration
