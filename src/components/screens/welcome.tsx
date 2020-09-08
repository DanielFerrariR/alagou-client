import React from 'react'
import { Typography, Button, Box, Container, Image } from 'src/components/atoms'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Welcome: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <Container bgColor="custom.white">
      <Box flex={1} alignItems="center" justifyContent="center">
        <Image source={require('src/images/logo.png')} />
      </Box>
      <Box
        p={2}
        flex={1}
        bgColor="primary"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Button
          mode="outlined"
          mb={3}
          onPress={() => navigation.navigate('Home')}
          style={{ borderWidth: 1, borderColor: 'white' }}
          labelStyle={{ color: 'white' }}
          width={1}
          color="custom.white"
        >
          Consultar
        </Button>
        <Button
          onPress={() => navigation.navigate('Login')}
          color="custom.white"
          width={1}
          labelStyle={{ color: theme.colors.primary }}
        >
          Login
        </Button>
        <Box position="absolute" style={{ top: '100%' }}>
          <Typography variant="h4" color="custom.white">
            Versão 1.0.0
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Welcome
