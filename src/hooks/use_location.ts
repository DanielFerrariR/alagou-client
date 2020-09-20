import { useState, useRef, useCallback, Dispatch, SetStateAction } from 'react'
import { PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { useFocusEffect } from '@react-navigation/native'

type UseLocation = [
  Geolocation.GeoPosition | null,
  string,
  Dispatch<SetStateAction<string>>
]

const useLocation = (): UseLocation => {
  const [errorMessage, setErrorMessage] = useState('')
  const watchId = useRef<number>()
  const [location, setLocation] = useState<Geolocation.GeoPosition | null>(null)

  const verifyLocationPermission = async () => {
    try {
      const accessFineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (accessFineLocation === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const startWatch = async () => {
    const hasLocationPermission = await verifyLocationPermission()

    if (hasLocationPermission) {
      watchId.current = Geolocation.watchPosition(
        (position) => {
          setLocation(position)
        },
        (error) => {
          console.log(error.code, error.message)
        },
        {
          enableHighAccuracy: true,
          interval: 1000,
          fastestInterval: 1000,
          distanceFilter: 0
        }
      )
    } else {
      setErrorMessage('Por favor, habilite o serviço de localização.')
    }
  }

  useFocusEffect(
    useCallback(() => {
      const asyncCallback = async () => {
        if (watchId.current !== undefined) {
          Geolocation.clearWatch(watchId.current)
        }

        await startWatch()
      }

      asyncCallback()

      return () => {
        if (watchId.current !== undefined) {
          Geolocation.clearWatch(watchId.current)
        }
      }
    }, [])
  )

  return [location, errorMessage, setErrorMessage]
}

export default useLocation
