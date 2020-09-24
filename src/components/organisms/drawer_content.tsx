import React, { useState } from 'react'
import {
  Box,
  Typography,
  TouchableOpacity,
  Image,
  Badge
} from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'src/store'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import ImageView from 'react-native-image-viewing'
import { eventEmitterInstance } from 'src/utils'
import { Alert } from 'src/images'

const DrawerContent: React.FC = () => {
  const [openPicture, setOpenPicture] = useState(false)
  const notification = useSelector((state) => state.notification)
  const userSession = useSelector((state) => state.user)
  const theme = useTheme()
  const navigation = useNavigation()

  const logout = async () => {
    eventEmitterInstance.emit('logout')
  }

  return (
    <>
      {userSession ? (
        <Box flex={1} bgColor="primary" p={2}>
          <TouchableOpacity
            mb={3}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography color="custom.white" mr={1} variant="h3">
                Editar Perfil
              </Typography>
              <MaterialCommunityIcons
                name="pencil"
                color={theme.colors.custom.white}
                size={24}
              />
            </Box>
          </TouchableOpacity>
          <Box
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mb={5}
          >
            <ImageView
              images={[
                userSession.picture
                  ? { uri: userSession.picture }
                  : require('src/images/no_picture.png')
              ]}
              imageIndex={0}
              visible={openPicture}
              onRequestClose={() => setOpenPicture(false)}
            />
            <TouchableOpacity
              onPress={() => setOpenPicture(true)}
              width={124}
              mb={3}
            >
              <Image
                source={
                  userSession.picture
                    ? { uri: userSession.picture }
                    : require('src/images/no_picture.png')
                }
                width={124}
                height={124}
                borderRadius={124 / 2}
              />
            </TouchableOpacity>
            <Typography
              color="custom.white"
              textTransform="uppercase"
              ellipsizeMode="tail"
              numberOfLines={1}
              fontWeight="bold"
              mb={1}
            >
              {userSession.name}
            </Typography>
          </Box>
          <TouchableOpacity
            mb={3}
            onPress={() => navigation.navigate('Contributions')}
          >
            <Box flexDirection="row" alignItems="center">
              <MaterialCommunityIcons
                name="water"
                color={theme.colors.custom.water}
                size={24}
              />
              <Typography color="custom.white" ml={4} variant="h3">
                Colaborações
              </Typography>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            mb={3}
            onPress={() => navigation.navigate('Favorites')}
          >
            <Box flexDirection="row" alignItems="center">
              <MaterialCommunityIcons
                name="star"
                color={theme.colors.custom.star}
                size={24}
              />
              <Typography color="custom.white" ml={4} variant="h3">
                Favoritos
              </Typography>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            mb={8}
            onPress={() => navigation.navigate('AlertList')}
          >
            <Box flexDirection="row" alignItems="center">
              <Box width={24} height={24} p={0.125}>
                <Alert width={20} height={20} />
              </Box>
              <Typography
                color="custom.white"
                ml={4}
                variant="h3"
                mr={notification > 0 ? 1 : 0}
              >
                Alertas
              </Typography>
              {notification > 0 ? <Badge visible>{notification}</Badge> : null}
            </Box>
          </TouchableOpacity>
          {userSession.isAdmin && (
            <TouchableOpacity
              mb={3}
              onPress={() => navigation.navigate('Administration')}
            >
              <Box flexDirection="row" alignItems="center">
                <MaterialCommunityIcons
                  name="account-tie"
                  color={theme.colors.custom.white}
                  size={24}
                />
                <Typography color="custom.white" ml={4} variant="h3">
                  Administração
                </Typography>
              </Box>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            mb={3}
            onPress={() => navigation.navigate('Settings')}
          >
            <Box flexDirection="row" alignItems="center">
              <MaterialCommunityIcons
                name="cog"
                color={theme.colors.custom.white}
                size={24}
              />
              <Typography color="custom.white" ml={4} variant="h3">
                Configurações
              </Typography>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity mb={3} onPress={logout}>
            <Box flexDirection="row" alignItems="center">
              <MaterialCommunityIcons
                name="logout"
                color={theme.colors.custom.white}
                size={24}
              />
              <Typography color="custom.white" ml={4} variant="h3">
                Sair
              </Typography>
            </Box>
          </TouchableOpacity>
        </Box>
      ) : null}
    </>
  )
}

export default DrawerContent
