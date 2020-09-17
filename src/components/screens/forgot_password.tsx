import React from 'react'
import { Container, Typography, StatusBar } from 'src/components/atoms'
import { useTheme } from 'react-native-paper'
import { BackHeader } from 'src/components/molecules'

const ForgotPassword: React.FC = () => {
  const theme = useTheme()

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="dark-content"
      />
      <BackHeader title="Alterar senha" />
      <Container>
        <Typography>ForgotPassword</Typography>
      </Container>
    </>
  )
}

export default ForgotPassword
