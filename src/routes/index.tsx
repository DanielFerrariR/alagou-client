import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import {
  Welcome,
  Login,
  Register,
  ForgotPassword,
  Consult,
  Home,
  FloodingList,
  Faq,
  Alerts,
  Contributions,
  Favorites,
  EditProfile,
  Settings
} from 'src/components/screens'
import store from 'src/utils/redux'
import { useSelector, useDispatch } from 'src/store'
import AsyncStorage from '@react-native-community/async-storage'
import { setLoggedUser, setNotLoggedUser } from 'src/store/user'
import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from 'src/styles'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DrawerNavigator } from 'src/utils'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Routes: React.FC = () => {
  const userSession = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const Tab = createMaterialBottomTabNavigator()
  const Stack = createStackNavigator()
  const Drawer = createDrawerNavigator()

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user').catch()

        if (userData) {
          const newUserData = JSON.parse(userData)

          dispatch(setLoggedUser(newUserData))
        } else {
          dispatch(setNotLoggedUser())
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (userSession === null) {
      asyncEffect()
    }
  }, [userSession])

  const HomeDrawerFlow = () => {
    return (
      <DrawerNavigator>
        <Drawer.Screen name="Home" component={Home} />
      </DrawerNavigator>
    )
  }

  const FloodingListDrawerFlow = () => {
    return (
      <DrawerNavigator>
        <Drawer.Screen name="FloodingList" component={FloodingList} />
      </DrawerNavigator>
    )
  }

  const FaqDrawerFlow = () => {
    return (
      <DrawerNavigator>
        <Drawer.Screen name="Faq" component={Faq} />
      </DrawerNavigator>
    )
  }

  const MainFlow = () => {
    return (
      <Tab.Navigator shifting>
        <Tab.Screen
          name="HomeDrawerFlow"
          component={HomeDrawerFlow}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: theme.colors.accent,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="FloodingListDrawerFlow"
          component={FloodingListDrawerFlow}
          options={{
            tabBarLabel: 'Alagamentos',
            tabBarColor: theme.colors.accent,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                color={color}
                size={26}
              />
            )
          }}
        />
        <Tab.Screen
          name="FaqDrawerFlow"
          component={FaqDrawerFlow}
          options={{
            tabBarLabel: 'Dúvidas',
            tabBarColor: theme.colors.accent,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="help-circle"
                color={color}
                size={26}
              />
            )
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <>
      {userSession === null ? null : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              gestureEnabled: false,
              headerShown: false
            }}
          >
            {userSession ? (
              <>
                <Stack.Screen name="MainFlow" component={MainFlow} />
                <Stack.Screen name="Alerts" component={Alerts} />
                <Stack.Screen name="Contributions" component={Contributions} />
                <Stack.Screen name="Favorites" component={Favorites} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Settings" component={Settings} />
              </>
            ) : (
              <>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Consult" component={Consult} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}

const RoutesContainer: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </PaperProvider>
  )
}

export default RoutesContainer
