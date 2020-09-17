import React from 'react'
import { Box, Image, Appbar } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'
import { IconButton, useTheme } from 'react-native-paper'
import { HeaderLogo } from 'src/images'

const Header: React.FC = () => {
  const navigation = useNavigation() as any
  const theme = useTheme()

  return (
    <Appbar.Header>
      <IconButton
        icon={() => (
          <Image
            source={require('src/images/header_menu.png')}
            height={16}
            width={24}
          />
        )}
        color={theme.colors.custom.white}
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
  )
}

export default Header
