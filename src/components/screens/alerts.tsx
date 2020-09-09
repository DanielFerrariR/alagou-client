import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Appbar } from 'src/components/atoms'

const Alerts: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        <Appbar.Content title="Alertas" />
      </Appbar.Header>
      <View>
        <Text>Alerts</Text>
      </View>
    </>
  )
}

export default Alerts
