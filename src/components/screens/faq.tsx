import React, { useCallback } from 'react'
import { Container, Typography } from 'src/components/atoms'
import { Header } from 'src/components/organisms'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const Faq: React.FC = () => {
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
      <Container>
        <Typography>Faq</Typography>
      </Container>
    </>
  )
}

export default Faq
