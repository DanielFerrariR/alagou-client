import React, { useEffect } from 'react'
import { BackHeader } from 'src/components/molecules'
import { Map } from 'src/components/organisms'
import { useDispatch } from 'src/store'
import { fetchFloodings } from 'src/store/floodings'

const Consult: React.FC = () => {
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
      <BackHeader title="Consultar" />
      <Map />
    </>
  )
}

export default Consult
