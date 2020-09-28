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
  IconButton,
  ActivityIndicator
} from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDate } from 'src/utils'
import ImageView from 'react-native-image-viewing'
import { useSelector, useDispatch } from 'src/store'
import { useIsKeyboardShown, useWindowDimensions } from 'src/hooks'
import { FloodingsState, addComment } from 'src/store/floodings'
import { useTheme, TextInput as OldTextInput } from 'react-native-paper'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  data: FloodingsState[0]
}

const ChatModal: React.FC<Props> = ({ open, setOpen, data }) => {
  const userSession = useSelector((state) => state.user)
  const [openPicture, setOpenPicture] = useState(false)
  const useKeyboardShown = useIsKeyboardShown()
  const theme = useTheme()
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const dimensions = useWindowDimensions()
  const [loading, setLoading] = useState(false)

  const addMessage = async () => {
    try {
      if (!message) {
        return
      }

      setLoading(true)

      setMessage('')

      dispatch(await addComment(data._id, message))

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      {userSession ? (
        <Portal>
          <Dialog
            visible={open}
            onDismiss={() => setOpen(false)}
            style={{ marginBottom: useKeyboardShown ? 200 : undefined }}
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
                  data={data.messages}
                  keyExtractor={(item) => String(item._id)}
                  renderItem={({ item, index }) => (
                    <Box
                      mt={data.messages.length - 1 > index ? 2 : 0}
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
                          <Box
                            bgColor="white"
                            borderRadius={32 / 2}
                            overflow="hidden"
                          >
                            <Image
                              source={
                                item.userPicture
                                  ? { uri: item.userPicture }
                                  : require('src/images/no_picture.png')
                              }
                              width={32}
                              height={32}
                            />
                          </Box>
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
                            item.userId === userSession._id
                              ? 'primary'
                              : 'accent'
                          }
                          p={2}
                          borderRadius={4}
                        >
                          <Typography
                            variant="h3"
                            color="custom.white"
                            width={dimensions.width - 170}
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
                            width={dimensions.width - 170}
                          >
                            {item.message}
                          </Typography>
                          <Typography
                            color="custom.white"
                            variant="h4"
                            textAlign="right"
                          >
                            {formatDate(new Date(item.date))}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                />
              </Box>
              <Box>
                <TextInput
                  placeholder="Escreva um comentário"
                  onChangeText={(text) => setMessage(text)}
                  value={message}
                  right={
                    <OldTextInput.Icon
                      color={theme.colors.placeholder}
                      onPress={addMessage}
                      name="send"
                      style={{
                        display: loading ? 'none' : undefined
                      }}
                    />
                  }
                />
                {loading ? (
                  <Box position="absolute" top="23px" right="15px">
                    <ActivityIndicator animating size={24} color="accent" />
                  </Box>
                ) : null}
              </Box>
            </Box>
          </Dialog>
        </Portal>
      ) : null}
    </>
  )
}

export default ChatModal
