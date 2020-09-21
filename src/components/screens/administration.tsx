import React from 'react'
import { Container, MenuItem, Divider } from 'src/components/atoms'
import { Water, Alert } from 'src/images'
import { BackHeader } from 'src/components/molecules'
import { useWindowDimensions } from 'src/hooks'

const Administration: React.FC = () => {
  const dimensions = useWindowDimensions()

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
            maxWidth: dimensions.width - 88
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
            maxWidth: dimensions.width - 88
          }}
        />
        <Divider />
      </Container>
    </>
  )
}

export default Administration
