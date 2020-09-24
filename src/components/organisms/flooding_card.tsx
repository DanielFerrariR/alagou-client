import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Image,
  Menu,
  MenuItem,
  TouchableOpacity
} from 'src/components/atoms'
import { MessageModal } from 'src/components/molecules'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import { formatDate } from 'src/utils'
import ImageView from 'react-native-image-viewing'
import {
  FloodingsState,
  deleteFlooding,
  addFavorite,
  removeFavorite
} from 'src/store/floodings'
import { useSelector, useDispatch } from 'src/store'
import { useNavigation } from '@react-navigation/native'
import Share from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'
import { useWindowDimensions } from 'src/hooks'
import ChatModal from './chat_modal'

interface Props {
  data: FloodingsState[0]
}

const FloadingList: React.FC<Props> = ({ data }) => {
  const userSession = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [openPicture, setOpenPicture] = useState(false)
  const [openUserPicture, setOpenUserPicture] = useState(false)
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const severity = [
    theme.colors.custom.light,
    theme.colors.custom.moderate,
    theme.colors.custom.danger
  ]
  const isFavorite = userSession && data.favorites.includes(userSession._id)
  const [loadingFavorite, setLoadingFavorite] = useState(false)
  const [loadingExcludeCard, setLoadingExcludeCard] = useState(false)
  const navigation = useNavigation()
  const [openChatModal, setOpenChatModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const dimensions = useWindowDimensions()

  const editCard = () => {
    setOpen(false)

    navigation.navigate('EditFlooding', { data })
  }

  const excludeCard = async () => {
    try {
      if (loadingExcludeCard) {
        return
      }

      setOpen(false)
      setLoadingExcludeCard(true)

      dispatch(await deleteFlooding(data._id))
    } catch (error) {
      console.log(error)
      setLoadingExcludeCard(false)

      if (error?.response?.data?.error) {
        setErrorMessage(error.response.data.error)
        return
      }

      setErrorMessage('Falha em conectar.')
    }
  }

  const updateFavorite = async () => {
    try {
      if (loadingFavorite) {
        return
      }

      setLoadingFavorite(true)

      if (isFavorite) {
        dispatch(await removeFavorite(data._id))
      } else {
        dispatch(await addFavorite(data._id))
      }

      setLoadingFavorite(false)
    } catch (error) {
      console.log(error)
      setLoadingFavorite(false)

      if (error?.response?.data?.error) {
        setErrorMessage(error.response.data.error)
        return
      }

      setErrorMessage('Falha em conectar.')
    }
  }

  const openShare = async () => {
    try {
      if (data.picture) {
        const response = await RNFetchBlob.fetch('GET', data.picture)

        const base64Image = `data:image/png;base64,${response.data}`

        await Share.open({
          message: JSON.stringify({
            Título: data.title,
            Endereço: data.address,
            Foto: data.picture,
            Data: formatDate(new Date(data.date))
          }),
          url: base64Image
        })
      } else {
        await Share.open({
          message: JSON.stringify({
            Título: data.title,
            Endereço: data.address,
            Data: formatDate(new Date(data.date))
          })
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {userSession ? (
        <>
          <Paper p={2}>
            <Box flexDirection="row" alignItems="center" mb={2}>
              <ImageView
                images={[
                  data.userPicture
                    ? { uri: data.userPicture }
                    : require('src/images/no_picture.png')
                ]}
                imageIndex={0}
                visible={openUserPicture}
                onRequestClose={() => setOpenUserPicture(false)}
              />
              <TouchableOpacity
                onPress={() => setOpenUserPicture(true)}
                width={48}
                mr={1}
              >
                <Image
                  source={
                    data.userPicture
                      ? { uri: data.userPicture }
                      : require('src/images/no_picture.png')
                  }
                  width={48}
                  height={48}
                  borderRadius={48 / 2}
                />
              </TouchableOpacity>
              <Box width={dimensions.width - 148}>
                <Typography variant="h4" ellipsizeMode="tail" numberOfLines={1}>
                  {data.userName}
                </Typography>
                <Typography
                  fontWeight="bold"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  variant="h3"
                >
                  {data.title}
                </Typography>
                <Typography variant="h4" ellipsizeMode="tail" numberOfLines={1}>
                  {data.address}
                </Typography>
              </Box>
            </Box>
            {data.userId === userSession._id && (
              <Box
                position="absolute"
                flexDirection="row"
                justifyContent="flex-end"
                width={1}
                ml={4}
              >
                <Menu
                  anchor={
                    <IconButton
                      icon="dots-vertical"
                      onPress={() => setOpen(true)}
                    />
                  }
                  visible={open}
                  onDismiss={() => setOpen(false)}
                >
                  <MenuItem onPress={editCard} title="Editar" />
                  <MenuItem onPress={excludeCard} title="Excluir" />
                </Menu>
              </Box>
            )}
            <ImageView
              images={[
                data.picture
                  ? { uri: data.picture }
                  : require('src/images/no_flooding_picture.png')
              ]}
              imageIndex={0}
              visible={openPicture}
              onRequestClose={() => setOpenPicture(false)}
            />
            <TouchableOpacity onPress={() => setOpenPicture(true)} width={1}>
              <Image
                source={
                  data.picture
                    ? { uri: data.picture }
                    : require('src/images/no_flooding_picture.png')
                }
                width={1}
                height={148}
              />
            </TouchableOpacity>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              width={dimensions.width - 40}
              ml={-1}
              alignItems="center"
            >
              <Box flexDirection="row" alignItems="center">
                <IconButton
                  icon="forum"
                  color="accent"
                  size={24}
                  onPress={() => setOpenChatModal(true)}
                />
                <IconButton
                  icon="share-variant"
                  color="accent"
                  size={24}
                  onPress={openShare}
                  ml={-0.5}
                />
                <IconButton
                  icon={
                    data.isVerified
                      ? () => (
                          <MaterialCommunityIcons
                            name="water"
                            size={24}
                            color={theme.colors.custom.verified}
                          />
                        )
                      : 'water'
                  }
                  color="accent"
                  size={24}
                  onPress={() => navigation.navigate('Home', { data })}
                  ml={-0.5}
                />
              </Box>
              <Box flexDirection="row" alignItems="center">
                {data.severity !== 0 ? (
                  <MaterialCommunityIcons
                    name="checkbox-blank-circle"
                    color={severity[data.severity - 1]}
                    size={24}
                  />
                ) : null}
                <IconButton
                  icon="star"
                  color={isFavorite ? 'custom.star' : 'custom.starOff'}
                  size={24}
                  onPress={updateFavorite}
                />
              </Box>
            </Box>
            <Box
              flexDirection="row"
              justifyContent="flex-end"
              width={1}
              alignItems="center"
            >
              <Typography variant="h4">
                {formatDate(new Date(data.date), { omitHours: data.omitHours })}
              </Typography>
            </Box>
          </Paper>
          <MessageModal
            message={errorMessage}
            setMessage={setErrorMessage}
            error
          />
          <ChatModal
            open={openChatModal}
            setOpen={setOpenChatModal}
            data={data}
          />
        </>
      ) : null}
    </>
  )
}

export default FloadingList
