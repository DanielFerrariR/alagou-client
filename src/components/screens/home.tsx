import React, { useEffect } from 'react'
import { Map } from 'src/components/organisms'
import { Header } from 'src/components/molecules'
import { useDispatch } from 'src/store'
import { fetchFloodings, FloodingsState } from 'src/store/floodings'

interface Props {
  route: {
    key: string
    name: string
    params: {
      data: FloodingsState[0]
    } | null
  }
}

const Home: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch()

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
      <Header />
      <Map route={route} />
    </>
  )
}

export default Home
