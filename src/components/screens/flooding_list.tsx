import React, { useCallback } from 'react'
import { Box, FlatList } from 'src/components/atoms'
import { Header } from 'src/components/organisms'
import { FloodingCard } from 'src/components/molecules'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Shimmer from 'react-native-shimmer'
import { Colors } from 'react-native-paper'

interface Data {
  id: string
  userPicture: string
  userName: string
  description: string
  address: string
  picture: string
  severity: 1 | 2 | 3
  date: Date
}

const FloadingList: React.FC = () => {
  const navigation = useNavigation() as any
  const data: Data[] = [
    {
      id: '5f58cf915bb9fa4e2d4f27d1',
      userPicture: 'https://picsum.photos/700',
      userName: 'Daniel',
      description: 'Forte alagamento arrasta carros.',
      address: 'SQN 210 Bl. I, Asa Norte',
      picture: 'https://picsum.photos/700',
      severity: 1,
      date: new Date()
    },
    {
      id: '5f58cf915bb9fa4e2d4f27d2',
      userPicture: 'https://picsum.photos/700',
      userName: 'Daniel',
      description: 'Forte alagamento arrasta carros.',
      address: 'SQN 210 Bl. I, Asa Norte',
      picture: 'https://picsum.photos/700',
      severity: 1,
      date: new Date()
    },
    {
      id: '5f58cf915bb9fa4e2d4f27d3',
      userPicture: 'https://picsum.photos/700',
      userName: 'Daniel',
      description: 'Forte alagamento arrasta carros.',
      address: 'SQN 210 Bl. I, Asa Norte',
      picture: 'https://picsum.photos/700',
      severity: 1,
      date: new Date()
    }
  ]

  useFocusEffect(
    useCallback(() => {
      return () => {
        navigation.closeDrawer()
      }
    }, [])
  )

  return (
    <>
      <Header />
      {data.length > 0 ? (
        <Box>
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => (
              <Box
                px={2}
                pt={index === 0 ? 2 : 0}
                mb={data.length - 1 > index ? 3 : 9}
              >
                <FloodingCard data={item} />
              </Box>
            )}
          />
        </Box>
      ) : (
        <Box p={2}>
          {[...new Array(3)].map((_each, index) => (
            <Box mb={3} key={index}>
              <Shimmer>
                <Box
                  width={1}
                  height={296}
                  borderRadius={4}
                  bgColor="custom.shimmer"
                />
              </Shimmer>
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}

export default FloadingList
