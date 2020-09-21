import * as React from 'react'
import { ScaledSize, Dimensions } from 'react-native'

const useWindowDimensions = (): { height: number; width: number } => {
  const [dimensions, setDimensions] = React.useState(() => {
    const { height = 0, width = 0 } = Dimensions.get('window')

    return { height, width }
  })

  React.useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      const { width, height } = window

      setDimensions((d) => {
        if (width === d.width && height === d.height) {
          return d
        }

        return { width, height }
      })
    }

    onChange({ window: Dimensions.get('window') })

    Dimensions.addEventListener('change', onChange)

    return () => Dimensions.addEventListener('change', onChange)
  }, [])

  return dimensions
}

export default useWindowDimensions
