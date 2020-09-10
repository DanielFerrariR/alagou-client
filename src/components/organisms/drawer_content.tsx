import React from 'react'
import { Box, Typography, TouchableOpacity, Image } from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'src/store'
import { destroySession } from 'src/store/destroy_session'
import AsyncStorage from '@react-native-community/async-storage'
import { ensure } from 'src/utils'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const DrawerContent: React.FC = () => {
  const userSession = ensure(useSelector((state) => state.user))
  const dispatch = useDispatch()
  const theme = useTheme()
  const navigation = useNavigation()

  const logout = async () => {
    await AsyncStorage.removeItem('@user')

    dispatch(destroySession())
  }

  return (
    <Box flex={1} bgColor="primary" p={2}>
      <TouchableOpacity
        mb={4}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Box flexDirection="row" alignItems="center" justifyContent="flex-end">
          <Typography color="custom.white" mr={1} variant="h3">
            Editar Perfil
          </Typography>
          <MaterialCommunityIcons name="pencil" color="white" size={24} />
        </Box>
      </TouchableOpacity>
      <Box
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb={8}
      >
        <Image
          source={
            userSession.profilePhoto
              ? { uri: userSession.profilePhoto }
              : require('src/images/no_photo.png')
          }
          width={148}
          height={148}
          borderRadius={148 / 2}
          mb={2}
        />
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
        <Box flexDirection="row" alignItems="center">
          <Typography
            color="custom.white"
            ellipsizeMode="tail"
            numberOfLines={1}
            mr={1}
          >
            Nível:
          </Typography>
          <Box flexDirection="row" alignItems="center" justifyContent="center">
            <MaterialCommunityIcons
              name="decagram"
              color={theme.colors.custom.seal}
              size={28}
            />
            <Box position="absolute">
              <Typography color="custom.white">{userSession.level}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <TouchableOpacity
        mb={2}
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
      <TouchableOpacity mb={2} onPress={() => navigation.navigate('Favorites')}>
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
      <TouchableOpacity mb={8} onPress={() => navigation.navigate('Alerts')}>
        <Box flexDirection="row" alignItems="center">
          <MaterialCommunityIcons
            name="alert-circle"
            color={theme.colors.custom.alert}
            size={24}
          />
          <Typography color="custom.white" ml={4} variant="h3">
            Alertas
          </Typography>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity mb={2} onPress={() => navigation.navigate('Settings')}>
        <Box flexDirection="row" alignItems="center">
          <MaterialCommunityIcons name="cog" color="white" size={24} />
          <Typography color="custom.white" ml={4} variant="h3">
            Configurações
          </Typography>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity mb={2} onPress={logout}>
        <Box flexDirection="row" alignItems="center">
          <MaterialCommunityIcons name="logout" color="white" size={24} />
          <Typography color="custom.white" ml={4} variant="h3">
            Sair
          </Typography>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}

export default DrawerContent
