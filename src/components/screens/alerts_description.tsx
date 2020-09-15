import React from 'react'
import { Container, Typography, Appbar } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'
import { formatDate, ensure } from 'src/utils'

interface Props {
  route: {
    key: string
    name: string
    params: {
      _id: string
    }
  }
}

const Alerts: React.FC<Props> = ({ route }) => {
  const { _id } = route.params
  const navigation = useNavigation()
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
  const alert = ensure(alerts.find((each) => each._id === Number(_id)))

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Alertas" />
      </Appbar.Header>
      <Container p={2}>
        <Typography variant="h4" mb={1}>
          {formatDate(alert.date).split(' ')[0]}
        </Typography>
        <Typography fontWeight="bold" mb={3}>
          {alert.title}
        </Typography>
        <Typography variant="h3">{alert.content}</Typography>
      </Container>
    </>
  )
}

export default Alerts
