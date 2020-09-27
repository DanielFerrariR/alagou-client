import React, { useState, useEffect } from 'react'
import { Box, FlatList, Container, TextInput } from 'src/components/atoms'
import { FloodingCard } from 'src/components/organisms'
import Shimmer from 'react-native-shimmer'
import { FloodingsState, fetchFloodings } from 'src/store/floodings'
import { useDispatch, useSelector } from 'src/store'
import { formatDate } from 'src/utils'
import { BackHeader } from 'src/components/molecules'
import matchSorter from 'match-sorter'
import { useTheme, TextInput as OldTextInput } from 'react-native-paper'

const Contributions: React.FC = () => {
  const userSession = useSelector((state) => state.user)
  const floodings = useSelector((state) => state.floodings)
  const [
    filteredFloodings,
    setFilteredFloodings
  ] = useState<FloodingsState | null>(null)
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()
  const theme = useTheme()

  useEffect(() => {
    if (!floodings) {
      return
    }

    if (!userSession) {
      return
    }

    const newFilteredFloodings = floodings.filter(
      (each) => each.userId === userSession._id
    )

    setFilteredFloodings(newFilteredFloodings)
  }, [floodings, userSession])

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

  return (
    <>
      <BackHeader title="Contribuições" />
      <Container>
        <TextInput
          mx={2}
          mt={1}
          mb={3}
          label="Filtro"
          placeholder="Digite sua busca"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
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

export default Contributions
