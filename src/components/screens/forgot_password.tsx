import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar, Container, Typography } from 'src/components/atoms'

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Login')} />
        <Appbar.Content title="Alterar senha" />
      </Appbar.Header>
      <Container>
        <Typography>ForgotPassword</Typography>
      </Container>
    </>
  )
}

export default ForgotPassword
