import React from 'react'
import { Container, Typography } from 'src/components/atoms'
import { formatDate } from 'src/utils'
import { BackHeader } from 'src/components/molecules'
import { AlertsState } from 'src/store/alerts'

interface Props {
  route: {
    key: string
    name: string
    params: {
      data: AlertsState[0]
    }
  }
}

const AlertDescription: React.FC<Props> = ({ route }) => {
  const { data } = route.params

  return (
    <>
      <>
        <BackHeader title="Alertas" />
        <Container p={2}>
          <Typography variant="h4" mb={1}>
            {formatDate(new Date(data.date)).split(' ')[0]}
          </Typography>
          <Typography fontWeight="bold" mb={3}>
            {data.title}
          </Typography>
          <Typography variant="h3">{data.content}</Typography>
        </Container>
      </>
    </>
  )
}

export default AlertDescription
