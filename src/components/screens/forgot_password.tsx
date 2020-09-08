import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Appbar } from 'src/components/atoms'

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Login')} />
        <Appbar.Content title="Alterar senha" />
      </Appbar.Header>
      <View>
        <Text>ForgotPassword</Text>
      </View>
    </>
  )
}

export default ForgotPassword
