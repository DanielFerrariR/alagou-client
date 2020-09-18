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

const EmailConfirmation: React.FC<Props> = ({ route }) => {
  const theme = useTheme()

  console.log(route)

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Appbar.Header>
        <Appbar.Content title="Confirmação de Email" />
      </Appbar.Header>
      <Container>
        <Typography>EmailConfirmation</Typography>
      </Container>
    </>
  )
}

export default EmailConfirmation
