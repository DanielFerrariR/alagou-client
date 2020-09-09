import React, { useCallback } from 'react'
import { View, Text } from 'react-native'
import { Header } from 'src/components/organisms'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const FloadingList: React.FC = () => {
  const navigation = useNavigation() as any

  useFocusEffect(
    useCallback(() => {
      return () => {
        navigation.closeDrawer()
      }
    }, [])
  )

  return (
    <>
      <Header />
      <View>
        <Text>FloadingList</Text>
      </View>
    </>
  )
}

export default FloadingList
