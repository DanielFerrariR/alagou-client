import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar, Container, Typography } from 'src/components/atoms'

const Favorites: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Favoritos" />
      </Appbar.Header>
      <Container>
        <Typography>Favorites</Typography>
      </Container>
    </>
  )
}

export default Favorites
