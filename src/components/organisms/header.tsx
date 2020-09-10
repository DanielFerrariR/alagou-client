import React from 'react'
import { Box, Image, Appbar } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'

const Header: React.FC = () => {
  const navigation = useNavigation() as any

  return (
    <Appbar.Header>
      <IconButton
        icon="menu"
        color="white"
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
        <Image ml={-1} source={require('src/images/header_logo.png')} />
      </Box>
    </Appbar.Header>
  )
}

export default Header
