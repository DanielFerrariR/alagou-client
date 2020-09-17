import React from 'react'
import { Box, StatusBar } from 'src/components/atoms'
import { Loading as LoadingIcon } from 'src/images'
import { useTheme } from 'react-native-paper'

const Loading: React.FC = () => {
  const theme = useTheme()

  return (
    <Box alignItems="center" justifyContent="center" flex={1} bgColor="accent">
      <StatusBar backgroundColor={theme.colors.accent} />
      <Box alignItems="center">
        <LoadingIcon height={96} width={96} />
      </Box>
    </Box>
  )
}

export default Loading
