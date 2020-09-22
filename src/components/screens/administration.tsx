import React from 'react'
import { Container, MenuItem, Divider } from 'src/components/atoms'
import { Water, Alert } from 'src/images'
import { BackHeader } from 'src/components/molecules'
import { useWindowDimensions } from 'src/hooks'
import DocumentPicker from 'react-native-document-picker'
import Papa from 'papaparse'
import fs from 'react-native-fs'
import { structuredArray } from 'src/utils'
import { useDispatch } from 'src/store'
import { uploadFloodingsCSV } from 'src/store/floodings'
import GeocoderLibrary from 'react-native-geocoding'
import { GOOGLE_MAPS_API_KEY } from '@env'

type CSVData = string[][]

type DataStructure = {
  id: string
  latitude: string
  longitude: string
  date: string
  title: string
}[]

const Administration: React.FC = () => {
  const dimensions = useWindowDimensions()
  const dispatch = useDispatch()
  const Geocoder = GeocoderLibrary as any

  Geocoder.init(GOOGLE_MAPS_API_KEY)

  const pickCSV = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.csv]
      })

      const csvText = await fs.readFile(response.uri, 'utf8')

      Papa.parse(csvText, {
        complete: async (results) => {
          const newResults = (results.data as unknown) as CSVData

          const dataStructure = {
            id: '',
            latitude: '',
            longitude: '',
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
            // const address = await Geocoder.from(each.latitude, each.longitude)

            return {
              title: each.title,
              longitude: each.longitude,
              latitude: each.latitude,
              // address,
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

          console.log(newFloodings)
          // dispatch(await uploadFloodingsCSV(newFloodings))
        }
      })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err)
      } else {
        throw err
      }
    }
  }

  return (
    <>
      <BackHeader title="Administração" />
      <Container>
        <MenuItem
          icon={() => <Water />}
          onPress={() => pickCSV()}
          title="Importar CSV com alagamentos"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: dimensions.width - 88
          }}
        />
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
    </>
  )
}

export default Administration
