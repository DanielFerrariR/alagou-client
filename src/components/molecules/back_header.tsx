import React from 'react'
import { Appbar, StatusBar } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'

interface Props {
  title: string
}

const BackHeader: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation() as any
  const theme = useTheme()

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
      </Appbar.Header>
    </>
  )
}

export default BackHeader
