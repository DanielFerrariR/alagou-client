import React, { useState } from 'react'
import { Path, Shape, Surface } from '@react-native-community/art'
import { useInterval } from 'src/hooks'
import { useTheme } from 'react-native-paper'
import { Box } from 'src/components/atoms'

const Wave: React.FC = () => {
  const theme = useTheme()
  const surfaceWidth = 1200
  const surfaceHeigth = 1200
  const [state, setState] = useState({
    a: 1.5,
    b: 0,
    increase: false
  })

  useInterval(() => {
    let { a, b, increase } = state

    if (increase) {
      a += 0.3
    } else {
      a -= 0.3
    }
    if (a <= 1) {
      increase = true
    }
    if (a >= 3) {
      increase = false
    }
    b += 0.3

    setState({
      a,
      b,
      increase
    })
  }, 20)

  const artDrawWave = () => {
    const radius = surfaceWidth / 2 - 30
    const centerX = surfaceWidth / 2
    const centerY = surfaceHeigth / 2
    const amplitude = 10
    const currentLinePointY =
      radius * 2 + 30 - radius 
    const startX = 30
    const endX = surfaceWidth - startX
    let endPoint

    const linePath = Path()

    for (let x = startX; x <= endX; x += 1) {
      let y =
        state.a *
          Math.sin((x / 180) * Math.PI + (4 * state.b) / Math.PI) *
          amplitude +
        currentLinePointY

      if (y < centerY) {
        const circleY = centerY - Math.sqrt(radius ** 2 - (centerX - x) ** 2)

        if (y < circleY) {
          y = circleY
        }
      } else if (y > centerY) {
        const circleY = centerY + Math.sqrt(radius ** 2 - (centerX - x) ** 2)

        if (y > circleY) {
          y = circleY
        }
      }

      if (x === startX) {
        linePath.moveTo(x, y)
      } else if (x === endX) {
        endPoint = [x, y]
      }

      linePath.lineTo(x, y)
    }

    if (!endPoint) {
      return null
    }

    linePath.moveTo(endPoint[0], endPoint[1])
    linePath.arc(-2 * radius, 0, radius)
    linePath.close()

    return <Shape d={linePath} fill={theme.colors.primary} />
  }

  return (
    <Box position="absolute" alignItems="center" width={1} top="-640px">
      <Surface width={surfaceWidth} height={surfaceHeigth}>
        {artDrawWave()}
      </Surface>
    </Box>
  )
}

export default Wave
