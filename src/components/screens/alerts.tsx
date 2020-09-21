import React from 'react'
import {
  Container,
  Box,
  Typography,
  FlatList,
  Paper
} from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'
import { formatDate } from 'src/utils'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme, TouchableRipple } from 'react-native-paper'
import { BackHeader } from 'src/components/molecules'
import { useWindowDimensions } from 'src/hooks'

const Alerts: React.FC = () => {
  const navigation = useNavigation()
  const theme = useTheme()
  const severity = [
    theme.colors.custom.light,
    theme.colors.custom.moderate,
    theme.colors.custom.danger
  ]
  const alerts = [
    {
      _id: 1,
      title: 'titulo',
      content: 'descricao',
      severity: 1,
      date: new Date()
    },
    {
      _id: 2,
      title: 'titulo',
      content: 'descricao',
      severity: 2,
      date: new Date()
    },
    {
      _id: 3,
      title: 'titulo',
      content: 'descricao',
      severity: 3,
      date: new Date()
    }
  ]
  const dimensions = useWindowDimensions()

  return (
    <>
      <BackHeader title="Alertas" />
      <Container>
        <FlatList
          data={alerts}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item, index }) => (
            <Box
              px={2}
              pt={index === 0 ? 2 : 0}
              mb={alerts.length - 1 > index ? 3 : 2}
            >
              <Paper overflow="hidden">
                <TouchableRipple
                  onPress={() =>
                    navigation.navigate('AlertsDescription', { _id: item._id })
                  }
                  rippleColor="rgba(0, 0, 0, .32)"
                >
                  <Box p={2} width={1} flexDirection="row" alignItems="center">
                    <Box width={dimensions.width - 96}>
                      <Typography mb={1} variant="h4">
                        {formatDate(item.date).split(' ')[0]}
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        variant="h3"
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <Box>
                      <MaterialCommunityIcons
                        name="information-outline"
                        color={severity[item.severity - 1]}
                        size={24}
                      />
                    </Box>
                  </Box>
                </TouchableRipple>
              </Paper>
            </Box>
          )}
        />
      </Container>
    </>
  )
}

export default Alerts
