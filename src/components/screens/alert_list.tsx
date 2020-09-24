import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  FlatList,
  Paper,
  Button,
  IconButton
} from 'src/components/atoms'
import { BackHeader, MessageModal } from 'src/components/molecules'
import { useNavigation } from '@react-navigation/native'
import { formatDate } from 'src/utils'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme, TouchableRipple } from 'react-native-paper'
import { useSelector, useDispatch } from 'src/store'
import Shimmer from 'react-native-shimmer'
import { deleteAlert } from 'src/store/alerts'
import { resetNotification } from 'src/store/notification'

const AlertList: React.FC = () => {
  const userSession = useSelector((state) => state.user)
  const alerts = useSelector((state) => state.alerts)
  const navigation = useNavigation()
  const theme = useTheme()
  const severity = [
    theme.colors.custom.light,
    theme.colors.custom.moderate,
    theme.colors.custom.danger
  ]
  const dispatch = useDispatch()
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')

  useEffect(() => {
    dispatch(resetNotification())
  }, [])

  const deleteItem = async (_id: string) => {
    try {
      if (loadingDelete) {
        return
      }

      setLoadingDelete(true)

      dispatch(await deleteAlert(_id))

      setLoadingDelete(false)
    } catch (error) {
      console.log(error)
      setLoadingDelete(false)

      if (error?.response?.data?.error) {
        setErrorMessage(error.response.data.error)

        return
      }

      setErrorMessage('Falha em conectar.')
    }
  }

  return (
    <>
      <BackHeader title="Alertas" />
      <Container>
        {userSession && userSession.isAdmin ? (
          <Button
            mt={2}
            mx={2}
            mb={1}
            color="accent"
            labelStyle={{ color: theme.colors.custom.white }}
            onPress={() => navigation.navigate('AddAlert')}
          >
            Criar alerta
          </Button>
        ) : null}
        {alerts ? (
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
                      navigation.navigate('AlertsDescription', {
                        data: item
                      })
                    }
                    rippleColor="rgba(0, 0, 0, .32)"
                  >
                    <Box
                      p={2}
                      width={1}
                      flexDirection="row"
                      alignItems="center"
                    >
                      <Box flex={1}>
                        <Typography mb={1} variant="h4">
                          {formatDate(new Date(item.date)).split(' ')[0]}
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
                      {userSession && userSession.isAdmin ? (
                        <>
                          <IconButton
                            icon="pencil"
                            size={24}
                            onPress={() =>
                              navigation.navigate('EditAlert', {
                                data: item
                              })
                            }
                            color="accent"
                          />
                          <IconButton
                            icon="delete"
                            size={24}
                            onPress={() => deleteItem(item._id)}
                            mr={2}
                            color="accent"
                          />
                        </>
                      ) : null}
                      <MaterialCommunityIcons
                        name="information-outline"
                        color={severity[item.severity - 1]}
                        size={24}
                      />
                    </Box>
                  </TouchableRipple>
                </Paper>
              </Box>
            )}
          />
        ) : (
          <Box px={2} pt={2}>
            {[...new Array(6)].map((_each, index) => (
              <Box mb={3} key={index}>
                <Shimmer>
                  <Box
                    width={1}
                    height={76}
                    borderRadius={4}
                    bgColor="custom.shimmer"
                  />
                </Shimmer>
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
    </>
  )
}

export default AlertList
