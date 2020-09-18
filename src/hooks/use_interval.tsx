import { useEffect, useRef, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

/**
 * A hook to update a setInterval in each run
 * @param callback - The function to be repeated
 * @param delay - The time between each run
 */
const useInterval = (callback: any, delay: number | null): void => {
  const savedCallback = useRef<any>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useFocusEffect(
    useCallback(() => {
      const tick = () => {
        savedCallback.current()
      }

      if (delay !== null) {
        const id = setInterval(tick, delay)
        return () => clearInterval(id)
      }

      return undefined
    }, [delay])
  )
}

export default useInterval
