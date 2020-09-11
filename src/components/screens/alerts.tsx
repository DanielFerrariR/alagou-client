import React from 'react'
import { Appbar, Container, Typography } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'

const Alerts: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Alertas" />
      </Appbar.Header>
      <Container>
        <Typography>Alerts</Typography>
      </Container>
    </>
  )
}

export default Alerts
