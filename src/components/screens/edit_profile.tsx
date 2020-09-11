import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar, Container, Typography } from 'src/components/atoms'

const EditProfile: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Editar Perfil" />
      </Appbar.Header>
      <Container>
        <Typography>EditProfile</Typography>
      </Container>
    </>
  )
}

export default EditProfile
