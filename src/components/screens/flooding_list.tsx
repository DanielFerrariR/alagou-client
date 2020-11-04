import React, { useState, useEffect } from 'react'
import {
  Box,
  FlatList,
  Container,
  TextInput,
  Button
} from 'src/components/atoms'
import { FloodingCard } from 'src/components/organisms'
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
      data: FloodingsState
    } | null
  }
}

const FloadingList: React.FC<Props> = ({ route }) => {
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
    const asyncEffect = async () => {
      try {
        dispatch(await fetchFloodings())
      } catch (error) {
        console.log(error)
      }
    }

    asyncEffect()
  }, [])

  useEffect(() => {
    return () => {
      route.params = null
    }
  }, [])

  useEffect(() => {
    if (floodings && route?.params) {
      const newFloodings = floodings.filter((each) => {
        if (route.params?.data.find((element) => element._id === each._id)) {
          return true
        }

        return false
      })

      setFilteredFloodings(newFloodings)
      setIsRouteFiltered(true)

      return
    }

    setFilteredFloodings(floodings)
  }, [route, floodings])

  useEffect(() => {
    if (!floodings || !filteredFloodings) {
      return
    }

    if (searchText === '') {
      setFilteredFloodings(floodings)
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
