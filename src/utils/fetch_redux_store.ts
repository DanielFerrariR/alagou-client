import { useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { setLoggedUser, setNotLoggedUser } from 'src/store/user'
import { useSelector, useDispatch } from 'src/store'

const FetchReduxStore: React.FC = () => {
  const userSession = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user').catch()

        if (userData) {
          const newUserData = JSON.parse(userData)

          setTimeout(() => {
            dispatch(setLoggedUser(newUserData))
          }, 1000)
        } else {
          setTimeout(() => {
            dispatch(setNotLoggedUser())
          }, 1000)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (userSession === null) {
      asyncEffect()
    }
  }, [userSession])

  return null
}

export default FetchReduxStore
