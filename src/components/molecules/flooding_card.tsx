import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Image,
  Menu
} from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import { formatDate } from 'src/utils'

interface Data {
  id: string
  userPicture: string
  userName: string
  title: string
  address: string
  picture: string
  severity: 1 | 2 | 3
  date: Date
}

interface Props {
  data: Data
}

const FloadingList: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const severity = [
    theme.colors.custom.light,
    theme.colors.custom.moderate,
    theme.colors.custom.danger
  ]
  const isFavorite = false

  const editCard = () => {
    setOpen(false)
  }

  const excludeCard = () => {
    setOpen(false)
  }

  const makeFavorite = () => {}

  return (
    <>
      <Paper p={2}>
        <Box flexDirection="row" alignItems="center" mb={2}>
          <Image
            source={{ uri: data.userPicture }}
            width={48}
            height={48}
            borderRadius={48 / 2}
            mr={1}
          />
          <Box>
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
        <Box
          position="absolute"
          flexDirection="row"
          justifyContent="flex-end"
          width={1}
          ml={4}
        >
          <Menu
            anchor={
              <IconButton icon="dots-vertical" onPress={() => setOpen(true)} />
            }
            visible={open}
            onDismiss={() => setOpen(false)}
          >
            <Menu.Item onPress={editCard} title="Editar" />
            <Menu.Item onPress={excludeCard} title="Excluir" />
          </Menu>
        </Box>
        <Image
          source={{ uri: data.picture }}
          width={1}
          height={120}
          borderRadius={4}
        />
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
            onPress={makeFavorite}
          />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="flex-end"
          width={1}
          alignItems="center"
        >
          <Typography variant="h4">{formatDate(data.date)}</Typography>
        </Box>
      </Paper>
    </>
  )
}

export default FloadingList
