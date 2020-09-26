import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

type UseLocation = [
  string | string[],
  Dispatch<SetStateAction<string | string[]>>
]

const useLocation = (
  callback: (location: Geolocation.GeoPosition) => void
): UseLocation => {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const watchId = useRef<number>()

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
          callback(position)
        },
        (error) => {
          console.log(error.code, error.message)
        },
        {
          enableHighAccuracy: true,
          interval: 1000,
          fastestInterval: 1000,
          distanceFilter: 10
        }
      )
    } else {
      setErrorMessage('Por favor, habilite o serviço de localização.')
    }
  }

  useEffect(() => {
    const asyncEffect = async () => {
      if (watchId.current !== undefined) {
        Geolocation.clearWatch(watchId.current)
      }

      await startWatch()
    }

    asyncEffect()

    return () => {
      if (watchId.current !== undefined) {
        Geolocation.clearWatch(watchId.current)
      }
    }
  }, [callback])

  return [errorMessage, setErrorMessage]
}

export default useLocation
