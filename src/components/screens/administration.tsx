import React, { useState } from 'react'
import { Container, MenuItem, Divider } from 'src/components/atoms'
import { Water, Excel } from 'src/images'
import { BackHeader, MessageModal } from 'src/components/molecules'
import { useWindowDimensions } from 'src/hooks'
import DocumentPicker from 'react-native-document-picker'
import Papa from 'papaparse'
import fs from 'react-native-fs'
import { structuredArray } from 'src/utils'
import { useDispatch } from 'src/store'
import { uploadFloodingsCSV } from 'src/store/floodings'
import GeocoderLibrary from 'react-native-geocoding'
import { API_ADDRESS, GOOGLE_MAPS_APIKEY } from '@env'
import { toLatLon } from 'utm'
import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage'

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
  const [loadingImport, setLoadingImport] = useState(false)
  const [loadingExport, setLoadingExport] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | string[]>('')
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const Geocoder = GeocoderLibrary as any
  Geocoder.init(GOOGLE_MAPS_APIKEY)

  const pickCSV = async () => {
    try {
      if (loadingImport) {
        return
      }

      setLoadingImport(true)

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

          const fetchedFloodings = []

          for (const newFlooding of newFloodings) {
            const dateArray = newFlooding.date.split('/')
            const { latitude, longitude } = toLatLon(
              Number(newFlooding.coordinateX.replace(',', '.')),
              Number(newFlooding.coordinateY.replace(',', '.')),
              23,
              'L'
            )

            const addressResponse = await Geocoder.from(latitude, longitude)

            const address = addressResponse.results[0].formatted_address

            fetchedFloodings.push({
              title: newFlooding.title,
              longitude,
              latitude,
              address,
              severity: 0,
              date: new Date(
                `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`
              ).getTime(),
              picture: '',
              omitHours: true,
              isVerified: true,
              precipitationAmount: -1
            })
          }

          dispatch(await uploadFloodingsCSV(fetchedFloodings))

          setLoadingImport(false)
          setSuccessMessage('Alagamentos importados com sucesso!')
        }
      })
    } catch (error) {
      setLoadingImport(false)

      if (DocumentPicker.isCancel(error)) {
        console.log(error)
      } else {
        console.log(error)
      }
    }
  }

  const exportCSV = async () => {
    try {
      if (loadingExport) {
        return
      }

      setLoadingExport(true)

      const userData = await AsyncStorage.getItem('@user')

      if (!userData) {
        return
      }

      const newUserData = JSON.parse(userData)

      const headers = { Authorization: `Bearer ${newUserData.token}` }

      const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/data.csv`

      await RNFetchBlob.config({
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mime: 'text/plain',
          description: 'File downloaded by download manager.',
          path: pathToWrite
        }
      }).fetch('GET', `${API_ADDRESS}/floodings-csv`, headers)

      setSuccessMessage('CSV exportado para a pasta Downloads com sucesso!')

      setLoadingExport(false)
    } catch (error) {
      setLoadingExport(false)
      console.log(error)
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
          loading={loadingImport}
        />
        <Divider />
        <MenuItem
          icon={() => <Excel />}
          onPress={() => exportCSV()}
          title="Exportar CSV com alagamentos"
          style={{ maxWidth: '100%' }}
          contentStyle={{ maxWidth: '100%' }}
          contentStyleWithIcon={{
            maxWidth: dimensions.width - 88
          }}
          loading={loadingExport}
        />
        <Divider />
      </Container>
      <MessageModal
        message={successMessage}
        setMessage={setSuccessMessage}
        success
      />
      <MessageModal message={errorMessage} setMessage={setErrorMessage} error />
    </>
  )
}

export default Administration
