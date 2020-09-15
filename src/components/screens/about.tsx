import React from 'react'
import { Appbar, Container, Typography } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'

const About: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Sobre o aplicativo" />
      </Appbar.Header>
      <Container p={2}>
        <Typography>
          Lorem ipsum varius leo ullamcorper diam, etiam varius arcu sem
          iaculis, feugiat tincidunt aenean primis. orci neque quisque posuere
          bibendum dapibus id feugiat, etiam donec dictumst metus mauris augue
          platea tincidunt, ante quam cras sodales ullamcorper suspendisse.
          ipsum nec turpis mattis ultrices curabitur interdum id orci, eleifend
          nostra libero curabitur phasellus eleifend imperdiet proin malesuada,
          elit tortor turpis quam venenatis non porttitor. taciti ad dui dapibus
          ultricies pretium proin arcu lobortis cubilia fames hac, risus aliquam
          magna pellentesque aptent sit viverra fusce luctus litora. class
          ornare pharetra porta id tempus vestibulum morbi nunc sollicitudin
          potenti, pharetra pulvinar feugiat curabitur neque sem ultricies
          pellentesque elit purus faucibus, vestibulum gravida erat fusce varius
          in quisque pharetra vulputate.
        </Typography>
      </Container>
    </>
  )
}

export default About
