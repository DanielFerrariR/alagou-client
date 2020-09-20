import React, { useEffect } from 'react'
import { Map } from 'src/components/organisms'
import { Header } from 'src/components/molecules'
import { fetchFloodings } from 'src/store/floodings'
import { useDispatch } from 'src/store'

const Home: React.FC = () => {
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
      <Map />
    </>
  )
}

export default Home
