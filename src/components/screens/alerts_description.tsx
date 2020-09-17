import React from 'react'
import { Container, Typography } from 'src/components/atoms'
import { formatDate, ensure } from 'src/utils'
import { BackHeader } from 'src/components/molecules'

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
      <BackHeader title="Alertas" />
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
