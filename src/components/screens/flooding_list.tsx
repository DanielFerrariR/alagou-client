import React, { useCallback, useState, useEffect } from 'react'
import {
  Box,
  FlatList,
  Container,
  TextInput,
  Button
} from 'src/components/atoms'
import { FloodingCard } from 'src/components/organisms'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Shimmer from 'react-native-shimmer'
import { FloodingsState, fetchFloodings } from 'src/store/floodings'
import { useDispatch, useSelector } from 'src/store'
import { Header } from 'src/components/molecules'
import matchSorter from 'match-sorter'
import { formatDate } from 'src/utils'
import { useTheme, TextInput as OldTextInput } from 'react-native-paper'

interface Props {
  route: {
    key: string
    name: string
    params: {
      _id: string
    }
  }
}

const FloadingList: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation() as any
  const floodings = useSelector((state) => state.floodings)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [
    filteredFloodings,
    setFilteredFloodings
  ] = useState<FloodingsState | null>(null)
  const theme = useTheme()
  const [isRouteFiltered, setIsRouteFiltered] = useState(false)

  useEffect(() => {
    console.log('hello')
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (floodings && route?.params) {
        setFilteredFloodings(
          floodings.filter((each) => each._id === route?.params?._id)
        )
        setIsRouteFiltered(true)

        return
      }

      setFilteredFloodings(floodings)
    }, [route, floodings])
  )

  useEffect(() => {
    if (!floodings || !filteredFloodings) {
      return
    }

    const newFilteredFloodings = matchSorter(floodings, searchText, {
      keys: [
        'userName',
        'title',
        'address',
        (item) => formatDate(new Date(item.date))
      ]
    })

    setFilteredFloodings(newFilteredFloodings)
  }, [searchText])

  const cleanFilter = () => {
    setFilteredFloodings(floodings)
    setIsRouteFiltered(false)
  }

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
        setSearchText('')
        cleanFilter()
      }
    }, [])
  )

  return (
    <>
      <Header />
      <Container>
        {isRouteFiltered ? (
          <Button
            mx={2}
            mt={2}
            mb={3}
            color="accent"
            labelStyle={{ color: theme.colors.custom.white }}
            onPress={cleanFilter}
          >
            Limpar Filtro
          </Button>
        ) : (
          <TextInput
            mx={2}
            mt={1}
            mb={3}
            label="Filtro"
            placeholder="Digite sua busca"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            right={
              searchText ? (
                <OldTextInput.Icon
                  color={theme.colors.placeholder}
                  onPress={() => setSearchText('')}
                  name="close"
                />
              ) : null
            }
          />
        )}
        {filteredFloodings ? (
          <Box>
            <FlatList
              data={filteredFloodings}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <Box px={2} mb={filteredFloodings.length - 1 > index ? 3 : 14}>
                  <FloodingCard data={item} />
                </Box>
              )}
            />
          </Box>
        ) : (
          <Box px={2}>
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
