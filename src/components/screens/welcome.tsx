import React from 'react'
import {
  Typography,
  Button,
  Box,
  Container,
  StatusBar
} from 'src/components/atoms'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Logo, Wave } from 'src/images'
import packageJson from 'src/../package.json'
import { useWindowDimensions } from 'src/hooks'

const Welcome: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const dimensions = useWindowDimensions()

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.custom.white}
        barStyle="dark-content"
      />
      <Container bgColor="custom.white" flex={1}>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Logo />
        </Box>
        <Box
          p={2}
          flex={1}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
          bgColor="primary"
        >
          <Box
            position="absolute"
            width={dimensions.width + 16}
            left="-16px"
            height={100}
            top="-80px"
          >
            <Wave />
          </Box>
          <Button
            mode="outlined"
            mb={3}
            onPress={() => navigation.navigate('Consult')}
            style={{ borderWidth: 1, borderColor: theme.colors.custom.white }}
            labelStyle={{ color: theme.colors.custom.white }}
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
          <Box position="absolute" top="100%">
            <Typography variant="h4" color="custom.white">
              Versão {packageJson.version}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Welcome
