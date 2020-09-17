import React, { useCallback } from 'react'
import { Box, FlatList, Container } from 'src/components/atoms'
import { FloodingCard } from 'src/components/organisms'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Shimmer from 'react-native-shimmer'
import { fetchFloodings } from 'src/store/floodings'
import { useDispatch, useSelector } from 'src/store'
import { Header } from 'src/components/molecules'

const FloadingList: React.FC = () => {
  const navigation = useNavigation() as any
  const floodings = useSelector((state) => state.floodings)
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      const asyncUseCallback = async () => {
        try {
          dispatch(await fetchFloodings())
        } catch (error) {
          console.log(error)
        }
      }

      asyncUseCallback()
      return () => {
        navigation.closeDrawer()
      }
    }, [])
  )

  return (
    <>
      <Header />
      <Container>
        {floodings ? (
          <Box>
            <FlatList
              data={floodings}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <Box
                  px={2}
                  pt={index === 0 ? 2 : 0}
                  mb={floodings.length - 1 > index ? 3 : 2}
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
      </Container>
    </>
  )
}

export default FloadingList
