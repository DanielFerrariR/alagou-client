import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar, Container, Typography } from 'src/components/atoms'

const Consult: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Welcome')} />
        <Appbar.Content title="Consultar" />
      </Appbar.Header>
      <Container>
        <Typography>Consult</Typography>
      </Container>
    </>
  )
}

export default Consult
