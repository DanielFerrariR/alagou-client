import React, { useState, useEffect } from 'react'
import { DrawerContent } from 'src/components/organisms'
import { createDrawerNavigator } from '@react-navigation/drawer'

const DrawerNavigator: React.FC = ({ children }) => {
  const Drawer = createDrawerNavigator()
  const [initRender, setInitRender] = useState(true)

  useEffect(() => {
    setInitRender(false)
  }, [initRender])

  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContent />}
      drawerStyle={initRender ? { width: undefined } : {}}
      screenOptions={{
        swipeEnabled: false
      }}
    >
      {children}
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
