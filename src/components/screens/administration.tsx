import React, { useState } from 'react'
import { Container, MenuItem, Divider, Box } from 'src/components/atoms'
import { Water, Alert } from 'src/images'
import { BackHeader, MessageModal } from 'src/components/molecules'
import { useWindowDimensions } from 'src/hooks'
import DocumentPicker from 'react-native-document-picker'
import Papa from 'papaparse'
import fs from 'react-native-fs'
import { structuredArray } from 'src/utils'
import { useDispatch } from 'src/store'
import { uploadFloodingsCSV } from 'src/store/floodings'
import GeocoderLibrary from 'react-native-geocoding'
import { GOOGLE_MAPS_API_KEY } from '@env'
import { toLatLon } from 'utm'

type CSVData = string[][]

type DataStructure = {
  id: string
  coordinateX: string
  coordinateY: string
  date: string
  title: string
}[]

const Administration: React.FC = () => {
  const dimensions = useWindowDimensions()
  const dispatch = useDispatch()
  const Geocoder = GeocoderLibrary as any
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | string[]>('')

  Geocoder.init(GOOGLE_MAPS_API_KEY)

  const pickCSV = async () => {
    try {
      if (loading) {
        return
      }

      setLoading(true)

      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.csv]
      })

      const csvText = await fs.readFile(response.uri, 'utf8')

      Papa.parse(csvText, {
        complete: async (results) => {
          const newResults = (results.data as unknown) as CSVData

          const dataStructure = {
            id: '',
            coordinateX: '',
            coordinateY: '',
            date: '',
            title: ''
          }

          let newFloodings = []

          for (const [index, each] of newResults.entries()) {
            if (index !== 0) {
              newFloodings.push(structuredArray(dataStructure, each))
            }
          }

          newFloodings = [].concat(...(newFloodings as any)) as DataStructure

          newFloodings = newFloodings.map(async (each) => {
            const dateArray = each.date.split('/')
            const { latitude, longitude } = toLatLon(
              Number(each.coordinateX.replace(',', '.')),
              Number(each.coordinateY.replace(',', '.')),
              23,
              'L'
            )

            const addressResponse = await Geocoder.from(latitude, longitude)

            const address = addressResponse.results[0].formatted_address

            return {
              title: each.title,
              longitude,
              latitude,
              address,
              severity: 0,
              date: new Date(
                `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`
              ).getTime(),
              picture: '',
              omitHours: true,
              isVerified: true
            }
          })

          newFloodings = await Promise.all(newFloodings)

          dispatch(await uploadFloodingsCSV(newFloodings))

          setLoading(false)
          setSuccessMessage('Alagamentos importados com sucesso!')
        }
      })
    } catch (error) {
      setLoading(false)
      if (DocumentPicker.isCancel(error)) {
        console.log(error)
      } else {
        throw error
      }
    }
  }

  return (
    <>
      <BackHeader title="Administração" />
      <Container>
        <Box>
          <MenuItem
            icon={() => <Water />}
            onPress={() => pickCSV()}
            title="Importar CSV com alagamentos"
            style={{ maxWidth: '100%' }}
            contentStyle={{ maxWidth: '100%' }}
            contentStyleWithIcon={{
              maxWidth: dimensions.width - 88
            }}
            loading={loading}
          />
        </Box>
        <Divider />
        <MenuItem
          icon={() => <Alert />}
          onPress={() => {}}
          title="Gerenciar alertas"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: dimensions.width - 88
          }}
        />
        <Divider />
      </Container>
      <MessageModal
        message={successMessage}
        setMessage={setSuccessMessage}
        success
      />
    </>
  )
}

export default Administration
