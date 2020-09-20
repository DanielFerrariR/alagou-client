import React from 'react'
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
  Settings,
  AddFlooding,
  EditFlooding,
  Support,
  About,
  Administration,
  AlertsDescription,
  Loading,
  EmailConfirmation,
  ResetPassword
} from 'src/components/screens'
import store from 'src/utils/redux'
import { useSelector } from 'src/store'
import { Provider as PaperProvider, Colors } from 'react-native-paper'
import { theme } from 'src/styles'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  DrawerNavigator,
  Socket,
  FetchReduxStore,
  LogoutListenner
} from 'src/utils'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StyleSheet } from 'react-native'

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const MainFlow = () => {
  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: Colors.grey200,
        borderTopWidth: StyleSheet.hairlineWidth
      }}
      activeColor={theme.colors.accent}
      inactiveColor={Colors.grey600}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="FloodingList"
        component={FloodingList}
        options={{
          tabBarLabel: 'Alagamentos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={24}
            />
          )
        }}
      />
      <Tab.Screen
        name="Faq"
        component={Faq}
        options={{
          tabBarLabel: 'Dúvidas',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="help-circle"
              color={color}
              size={24}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const DrawerFlow = () => {
  return (
    <DrawerNavigator>
      <Drawer.Screen name="MainFlow" component={MainFlow} />
    </DrawerNavigator>
  )
}

const Routes: React.FC = () => {
  const userSession = useSelector((state) => state.user)

  return (
    <>
      <NavigationContainer
        fallback={<Loading />}
        linking={{
          prefixes: ['alagou://'],
          config: {
            screens: {
              EmailConfirmation: {
                path: 'EmailConfirmation/:token',
                parse: { token: String }
              },
              ResetPassword: {
                path: 'ResetPassword/:token',
                parse: { token: String }
              }
            }
          }
        }}
      >
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: false,
            headerShown: false
          }}
        >
          {userSession === null ? (
            <Stack.Screen name="Loading" component={Loading} />
          ) : null}
          {userSession ? (
            <>
              <Stack.Screen name="DrawerFlow" component={DrawerFlow} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="AddFlooding" component={AddFlooding} />
              <Stack.Screen name="EditFlooding" component={EditFlooding} />
              <Stack.Screen name="Alerts" component={Alerts} />
              <Stack.Screen name="Contributions" component={Contributions} />
              <Stack.Screen name="Favorites" component={Favorites} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="Support" component={Support} />
              <Stack.Screen name="About" component={About} />
              <Stack.Screen
                name="AlertsDescription"
                component={AlertsDescription}
              />
              <Stack.Screen name="Administration" component={Administration} />
            </>
          ) : null}
          {userSession === false ? (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Consult" component={Consult} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </>
          ) : null}
          <Stack.Screen
            name="EmailConfirmation"
            component={EmailConfirmation}
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const RoutesContainer: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <Routes />
        <Socket />
        <FetchReduxStore />
        <LogoutListenner />
      </Provider>
    </PaperProvider>
  )
}

export default RoutesContainer
