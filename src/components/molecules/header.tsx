import React from 'react'
import { Box, Appbar, IconButton } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { HeaderLogo } from 'src/images'
import { StatusBar } from 'react-native'

const Header: React.FC = () => {
  const navigation = useNavigation() as any
  const theme = useTheme()

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Appbar.Header>
        <IconButton
          icon="menu"
          color="custom.white"
          size={24}
          onPress={() => navigation.toggleDrawer()}
        />
        <Box
          position="absolute"
          width={1}
          flexDirection="row"
          justifyContent="center"
          pointerEvents="none"
        >
          <HeaderLogo height={32} />
        </Box>
      </Appbar.Header>
    </>
  )
}

export default Header
