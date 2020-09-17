import { useEffect, useRef } from 'react'

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

  useEffect((): any => {
    const tick = () => {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
