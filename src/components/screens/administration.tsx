import React from 'react'
import { Container, MenuItem, Divider } from 'src/components/atoms'
import { Dimensions } from 'react-native'
import { Water, Alert } from 'src/images'
import { BackHeader } from 'src/components/molecules'

const Administration: React.FC = () => {
  return (
    <>
      <BackHeader title="Administração" />
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
