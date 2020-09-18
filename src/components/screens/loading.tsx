import React from 'react'
import { Box, StatusBar } from 'src/components/atoms'
import { AppIcon } from 'src/images'
import { useTheme } from 'react-native-paper'

const Loading: React.FC = () => {
  const theme = useTheme()

  return (
    <Box alignItems="center" justifyContent="center" flex={1} bgColor="custom.white">
      <StatusBar backgroundColor={theme.colors.custom.white} />
      <Box alignItems="center">
        <AppIcon height={96} width={96} />
      </Box>
    </Box>
  )
}

export default Loading
