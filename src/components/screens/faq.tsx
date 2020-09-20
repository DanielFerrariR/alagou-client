import React, { useState } from 'react'
import {
  Container,
  ListAccordion,
  Box,
  Typography,
  ScrollView
} from 'src/components/atoms'
import { useTheme } from 'react-native-paper'
import { Header } from 'src/components/molecules'

const Faq: React.FC = () => {
  const [expanded, setExpanded] = useState(0)
  const theme = useTheme()

  const handlePress = (id: number) => {
    if (id === expanded) {
      setExpanded(0)
    } else {
      setExpanded(id)
    }
  }

  return (
    <>
      <Header />
      <ScrollView style={{ backgroundColor: theme.colors.background }}>
        <Container p={2}>
          <ListAccordion
            expanded={expanded === 1}
            onPress={() => handlePress(1)}
            title="Como classificar sua publicação"
            containerStyle={{
              overflow: 'hidden',
              borderRadius: 4,
              elevation: 4,
              backgroundColor: 'white',
              marginBottom: 24
            }}
          >
            <Box p={2} mt={-3}>
              <Typography>
                Lorem ipsum praesent tristique torquent potenti mattis molestie
                condimentum, eleifend facilisis nibh netus cubilia dictumst
                potenti feugiat, ipsum luctus himenaeos augue quam euismod cras.
                massa fames euismod sagittis est facilisis integer, vehicula
                nullam justo curae dolor, malesuada pretium placerat nulla
                convallis. conubia purus interdum scelerisque adipiscing vel
                facilisis primis egestas vehicula eget, quisque tellus et
                suspendisse rhoncus senectus adipiscing congue cubilia inceptos
                rutrum, ipsum elementum donec fermentum eget lacus nunc massa
                curae. tempor ac lacus donec ligula venenatis risus commodo
                lectus orci vehicula ante per laoreet lobortis platea euismod
                porta dictum, augue lobortis gravida rhoncus ad erat vel id
                porttitor feugiat venenatis dictumst taciti augue lectus
                ullamcorper.
              </Typography>
            </Box>
          </ListAccordion>
          <ListAccordion
            expanded={expanded === 2}
            onPress={() => handlePress(2)}
            title="Definições"
            containerStyle={{
              overflow: 'hidden',
              borderRadius: 4,
              elevation: 4,
              backgroundColor: 'white',
              marginBottom: 24
            }}
          >
            <Box p={2} mt={-3}>
              <Typography>
                Lorem ipsum praesent tristique torquent potenti mattis molestie
                condimentum, eleifend facilisis nibh netus cubilia dictumst
                potenti feugiat, ipsum luctus himenaeos augue quam euismod cras.
                massa fames euismod sagittis est facilisis integer, vehicula
                nullam justo curae dolor, malesuada pretium placerat nulla
                convallis. conubia purus interdum scelerisque adipiscing vel
                facilisis primis egestas vehicula eget, quisque tellus et
                suspendisse rhoncus senectus adipiscing congue cubilia inceptos
                rutrum, ipsum elementum donec fermentum eget lacus nunc massa
                curae. tempor ac lacus donec ligula venenatis risus commodo
                lectus orci vehicula ante per laoreet lobortis platea euismod
                porta dictum, augue lobortis gravida rhoncus ad erat vel id
                porttitor feugiat venenatis dictumst taciti augue lectus
                ullamcorper.
              </Typography>
            </Box>
          </ListAccordion>
          <ListAccordion
            expanded={expanded === 3}
            onPress={() => handlePress(3)}
            title="Alagamentos: quais cuidados tomar"
            containerStyle={{
              overflow: 'hidden',
              borderRadius: 4,
              elevation: 4,
              backgroundColor: 'white'
            }}
          >
            <Box p={2}>
              <Typography>
                Lorem ipsum praesent tristique torquent potenti mattis molestie
                condimentum, eleifend facilisis nibh netus cubilia dictumst
                potenti feugiat, ipsum luctus himenaeos augue quam euismod cras.
                massa fames euismod sagittis est facilisis integer, vehicula
                nullam justo curae dolor, malesuada pretium placerat nulla
                convallis. conubia purus interdum scelerisque adipiscing vel
                facilisis primis egestas vehicula eget, quisque tellus et
                suspendisse rhoncus senectus adipiscing congue cubilia inceptos
                rutrum, ipsum elementum donec fermentum eget lacus nunc massa
                curae. tempor ac lacus donec ligula venenatis risus commodo
                lectus orci vehicula ante per laoreet lobortis platea euismod
                porta dictum, augue lobortis gravida rhoncus ad erat vel id
                porttitor feugiat venenatis dictumst taciti augue lectus
                ullamcorper.
              </Typography>
            </Box>
          </ListAccordion>
        </Container>
      </ScrollView>
    </>
  )
}

export default Faq
