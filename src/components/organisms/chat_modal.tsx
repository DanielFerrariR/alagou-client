import React, { useState, Dispatch, SetStateAction } from 'react'
import {
  Box,
  Typography,
  Image,
  TouchableOpacity,
  Portal,
  Dialog,
  TextInput,
  FlatList,
  IconButton
} from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import { formatDate, ensure } from 'src/utils'
import ImageView from 'react-native-image-viewing'
import { useSelector } from 'src/store'
import { Dimensions } from 'react-native'
import { useKeyboard } from 'src/hooks'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ChatModal: React.FC<Props> = ({ open, setOpen }) => {
  const userSession = ensure(useSelector((state) => state.user))
  const [openPicture, setOpenPicture] = useState(false)
  const isKeyboardVisible = useKeyboard()
  const theme = useTheme()
  const [messages, setMessages] = useState([
    {
      _id: 'dsadadadadsa',
      message: 'primeiro',
      userId: userSession._id,
      userName: userSession.name,
      userPicture: userSession.picture,
      date: new Date()
    },
    {
      _id: 'dasdsadasddd2saa',
      message: 'dsadsaddsdasdasdasdasdasdasdsdasdsadasdsadasdasasa',
      userId: 'ddadsdasdwdq313',
      userName: userSession.name,
      userPicture: userSession.picture,
      date: new Date()
    },
    {
      _id: 'dasdsadasddd1saa',
      message: 'dsadsaddsdasdasdasdasdasdasdsdasdsadasdsadasdasasa',
      userId: userSession._id,
      userName: userSession.name,
      userPicture: userSession.picture,
      date: new Date()
    },
    {
      _id: 'dasdsadasddd3saa',
      message: 'ultimo',
      userId: 'ddadsdasdwdq313',
      userName: userSession.name,
      userPicture: userSession.picture,
      date: new Date()
    }
  ])

  const addMessage = () => {
    const newMessages = [...messages]

    newMessages.unshift({
      _id: 'dasdsadasd3123dd3313saa',
      message: 'novo',
      userId: userSession._id,
      userName: userSession.name,
      userPicture: userSession.picture,
      date: new Date()
    })

    setMessages(newMessages)
  }

  return (
    <>
      <Portal>
        <Dialog
          visible={open}
          onDismiss={() => setOpen(false)}
          style={{ marginBottom: isKeyboardVisible ? 200 : undefined }}
        >
          <Box p={2}>
            <Typography
              textAlign="center"
              mb={3}
              fontWeight="bold"
              variant="h2"
            >
              Comentários
            </Typography>
            <Box position="absolute" right="0px">
              <IconButton
                icon="close"
                size={24}
                onPress={() => setOpen(false)}
                color="primary"
              />
            </Box>
            <Box height={320} mb={3}>
              <FlatList
                inverted
                data={messages}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item, index }) => (
                  <Box
                    mt={messages.length - 1 > index ? 2 : 0}
                    alignSelf={
                      item.userId === userSession._id
                        ? 'flex-end'
                        : 'flex-start'
                    }
                    flexDirection={
                      item.userId === userSession._id ? 'row-reverse' : 'row'
                    }
                  >
                    <Box
                      ml={item.userId === userSession._id ? 2 : 0}
                      mr={item.userId !== userSession._id ? 2 : 0}
                    >
                      <ImageView
                        images={[
                          item.userPicture
                            ? { uri: item.userPicture }
                            : require('src/images/no_picture.png')
                        ]}
                        imageIndex={0}
                        visible={openPicture}
                        onRequestClose={() => setOpenPicture(false)}
                      />
                      <TouchableOpacity
                        onPress={() => setOpenPicture(true)}
                        width={32}
                        mb={3}
                      >
                        <Image
                          source={
                            item.userPicture
                              ? { uri: item.userPicture }
                              : require('src/images/no_picture.png')
                          }
                          width={32}
                          height={32}
                          borderRadius={32 / 2}
                        />
                      </TouchableOpacity>
                    </Box>
                    <Box mt={2}>
                      <Box
                        position="absolute"
                        left={
                          item.userId === userSession._id ? undefined : '-8px'
                        }
                        right={
                          item.userId !== userSession._id ? undefined : '-8px'
                        }
                        top="-5px"
                        style={{
                          transform: [{ rotate: '180deg' }]
                        }}
                      >
                        <MaterialCommunityIcons
                          name="triangle"
                          size={36}
                          color={
                            item.userId === userSession._id
                              ? theme.colors.primary
                              : theme.colors.accent
                          }
                        />
                      </Box>
                      <Box
                        bgColor={
                          item.userId === userSession._id ? 'primary' : 'accent'
                        }
                        p={2}
                        borderRadius={4}
                      >
                        <Typography
                          variant="h3"
                          color="custom.white"
                          width={Dimensions.get('window').width - 170}
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          mb={1}
                        >
                          {item.userName}
                        </Typography>
                        <Typography
                          variant="h3"
                          fontWeight="bold"
                          color="custom.white"
                          mb={1}
                          width={Dimensions.get('window').width - 170}
                        >
                          {item.message}
                        </Typography>
                        <Typography
                          color="custom.white"
                          variant="h4"
                          textAlign="right"
                        >
                          {formatDate(item.date)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              />
            </Box>
            <Box flexDirection="row" alignItems="center">
              <TextInput
                width={Dimensions.get('window').width - 148}
                placeholder="Escreva um comentário"
                mt={-0.75}
                mr={0.5}
              />
              <TouchableOpacity onPress={addMessage}>
                <MaterialCommunityIcons
                  name="send-circle"
                  color={theme.colors.primary}
                  size={64}
                />
              </TouchableOpacity>
            </Box>
          </Box>
        </Dialog>
      </Portal>
    </>
  )
}

export default ChatModal
