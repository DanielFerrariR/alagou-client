import React from 'react'
import { Container, Typography, StatusBar, Appbar } from 'src/components/atoms'
import { useTheme } from 'react-native-paper'

interface Props {
  route: {
    key: string
    name: string
    params: {
      token: string
    }
  }
}

const ForgotPassword: React.FC<Props> = ({ route }) => {
  const theme = useTheme()

  console.log(route)

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Appbar.Header>
        <Appbar.Content title="Alterar senha" />
      </Appbar.Header>
      <Container>
        <Typography>ForgotPassword</Typography>
      </Container>
    </>
  )
}

export default ForgotPassword
