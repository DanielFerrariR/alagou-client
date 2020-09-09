import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Appbar } from 'src/components/atoms'

const Consult: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Welcome')} />
        <Appbar.Content title="Consultar" />
      </Appbar.Header>
      <View>
        <Text>Consult</Text>
      </View>
    </>
  )
}

export default Consult
