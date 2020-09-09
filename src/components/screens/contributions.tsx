import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Appbar } from 'src/components/atoms'

const Contributions: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Appbar.Content title="Contribuições" />
      </Appbar.Header>
      <View>
        <Text>Contributions</Text>
      </View>
    </>
  )
}

export default Contributions
