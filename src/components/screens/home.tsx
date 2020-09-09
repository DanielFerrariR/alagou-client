import React, { useCallback } from 'react'
import { Header, Map } from 'src/components/organisms'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const Home: React.FC = () => {
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
      <Map />
    </>
  )
}

export default Home
