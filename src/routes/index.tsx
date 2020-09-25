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
  AlertList,
  Contributions,
  Favorites,
  EditProfile,
  Settings,
  AddFlooding,
  EditFlooding,
  Support,
  About,
  Administration,
  AlertDescription,
  Loading,
  EmailConfirmation,
  ResetPassword,
  EditAlert,
  AddAlert,
  TermsAndConditionsOfUse
} from 'src/components/screens'
import store from 'src/utils/redux'
import { useSelector } from 'src/store'
import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from 'src/styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  DrawerNavigator,
  Socket,
  FetchReduxStore,
  LogoutListenner,
  CustomTabBar
} from 'src/utils'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const MainFlow = () => {
  return (
    <Tab.Navigator
      screenOptions={{ unmountOnBlur: true }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="FloodingList"
        component={FloodingList}
        options={{
          tabBarLabel: 'Alagamentos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tab.Screen
        name="Faq"
        component={Faq}
        options={{
          tabBarLabel: 'Dúvidas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="help-circle"
              color={color}
              size={size}
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
              <Stack.Screen name="AlertList" component={AlertList} />
              <Stack.Screen name="Contributions" component={Contributions} />
              <Stack.Screen name="Favorites" component={Favorites} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="Support" component={Support} />
              <Stack.Screen name="About" component={About} />
              <Stack.Screen name="AddAlert" component={AddAlert} />
              <Stack.Screen name="EditAlert" component={EditAlert} />
              <Stack.Screen
                name="AlertsDescription"
                component={AlertDescription}
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
              <Stack.Screen
                name="TermsAndConditionsOfUse"
                component={TermsAndConditionsOfUse}
              />
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
