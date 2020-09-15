import React from 'react'
import { Appbar, Container, Typography } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'

const Support: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Suporte" />
      </Appbar.Header>
      <Container>
        <Typography>Support</Typography>
      </Container>
    </>
  )
}

export default Support
