import React, { useCallback } from 'react'
import { Header, Map } from 'src/components/organisms'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { fetchFloodings } from 'src/store/floodings'
import { useDispatch } from 'src/store'

const Home: React.FC = () => {
  const navigation = useNavigation() as any
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      const asyncUseCallback = async () => {
        try {
          dispatch(await fetchFloodings())
        } catch (error) {
          console.log(error)
        }
      }

      asyncUseCallback()
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
