import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar, Container, Typography } from 'src/components/atoms'

const Contributions: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Appbar.Content title="Contribuições" />
      </Appbar.Header>
      <Container>
        <Typography>Contributions</Typography>
      </Container>
    </>
  )
}

export default Contributions
