import React, { useCallback } from 'react'
import { Box, FlatList, Container, Appbar } from 'src/components/atoms'
import { FloodingCard } from 'src/components/molecules'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Shimmer from 'react-native-shimmer'
import { fetchFloodings } from 'src/store/floodings'
import { useDispatch, useSelector } from 'src/store'
import { ensure } from 'src/utils'

const Favorites: React.FC = () => {
  const navigation = useNavigation()
  const userSession = ensure(useSelector((state) => state.user))
  const floodings = useSelector((state) => state.floodings)
  const filteredFloodings = floodings?.filter((each) =>
    each.favorites.includes(userSession._id)
  )
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
    }, [])
  )

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Appbar.Content title="Favoritos" />
      </Appbar.Header>
      <Container>
        {filteredFloodings ? (
          <Box>
            <FlatList
              data={filteredFloodings}
              keyExtractor={(item) => String(item._id)}
              renderItem={({ item, index }) => (
                <Box
                  px={2}
                  pt={index === 0 ? 2 : 0}
                  mb={filteredFloodings.length - 1 > index ? 3 : 2}
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

export default Favorites
