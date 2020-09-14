import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Image,
  Menu,
  TouchableOpacity
} from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import { formatDate, ensure } from 'src/utils'
import ImageView from 'react-native-image-viewing'
import { FloodingsState } from 'src/store/floodings'
import { useSelector, useDispatch } from 'src/store'
import { addFavorite, removeFavorite } from 'src/store/user'
import AsyncStorage from '@react-native-community/async-storage'

interface Props {
  data: FloodingsState[0]
}

const FloadingList: React.FC<Props> = ({ data }) => {
  const userSession = ensure(useSelector((state) => state.user))
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
  const isFavorite = userSession.favorites.includes(data._id)

  const editCard = () => {
    setOpen(false)
  }

  const excludeCard = () => {
    setOpen(false)
  }

  const updateFavorite = async () => {
    try {
      if (isFavorite) {
        const { payload } = dispatch(
          await removeFavorite(userSession, data._id)
        )

        const userData = JSON.stringify(payload)

        await AsyncStorage.setItem('@user', userData)
      } else {
        const { payload } = dispatch(await addFavorite(userSession, data._id))

        const userData = JSON.stringify(payload)

        await AsyncStorage.setItem('@user', userData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
          <Box>
            <Typography
              variant="h4"
              ellipsizeMode="tail"
              numberOfLines={1}
              width={240}
            >
              {data.userName}
            </Typography>
            <Typography
              width={240}
              fontWeight="bold"
              ellipsizeMode="tail"
              numberOfLines={1}
              variant="h3"
            >
              {data.description}
            </Typography>
            <Typography
              width={240}
              variant="h4"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
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
              <Menu.Item onPress={editCard} title="Editar" />
              <Menu.Item onPress={excludeCard} title="Excluir" />
            </Menu>
          </Box>
        )}
        <ImageView
          images={[{ uri: data.picture }]}
          imageIndex={0}
          visible={openPicture}
          onRequestClose={() => setOpenPicture(false)}
        />
        <TouchableOpacity onPress={() => setOpenPicture(true)} width={1}>
          <Image source={{ uri: data.picture }} width={1} height={148} />
        </TouchableOpacity>
        <Box
          flexDirection="row"
          justifyContent="flex-end"
          width={1}
          alignItems="center"
          ml={1}
        >
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            color={severity[data.severity - 1]}
            size={24}
          />
          <IconButton
            icon="star"
            color={isFavorite ? 'custom.star' : 'custom.starOff'}
            size={24}
            onPress={updateFavorite}
          />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="flex-end"
          width={1}
          alignItems="center"
        >
          <Typography variant="h4">
            {formatDate(new Date(data.date))}
          </Typography>
        </Box>
      </Paper>
    </>
  )
}

export default FloadingList
