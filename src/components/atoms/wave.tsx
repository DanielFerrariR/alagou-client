import React, { useState } from 'react'
import { View } from 'react-native'
import { Path, Shape, Surface } from '@react-native-community/art'
import { useInterval } from 'src/hooks'

const Wave: React.FC = () => {
  const powerPorcentage = 50
  const surfaceWidth = 500
  const surfaceHeigth = 500
  const radius = surfaceWidth / 2.0
  const [state, setState] = useState({
    a: 1.5,
    b: 0,
    increase: false
  })

  useInterval(() => {
    let { a, b, increase } = state

    if (increase) {
      a += 0.5
    } else {
      a -= 0.5
    }
    if (a <= 1) {
      increase = true
    }
    if (a >= 1.5) {
      increase = false
    }
    b += 0.5

    setState({
      a,
      b,
      increase
    })
  }, 20)

  const artDrawWave = () => {
    const newRadius = surfaceWidth / 2 - 30

    const centerX = surfaceWidth / 2
    const centerY = surfaceHeigth / 2

    const { a, b } = state
    const amplitude = 10

    const currentLinePointY =
      newRadius * 2 + 30 - newRadius * 2 * (powerPorcentage / 100.0)
    const startX = 30
    const endX = surfaceWidth - startX

    let endPoint

    const linePath = Path()
    for (let x = startX; x <= endX; x += 1) {
      let y =
        a * Math.sin((x / 180) * Math.PI + (4 * b) / Math.PI) * amplitude +
        currentLinePointY
      if (y < centerY) {
        const circleY = centerY - Math.sqrt(newRadius ** 2 - (centerX - x) ** 2)
        if (y < circleY) {
          y = circleY
        }
      } else if (y > centerY) {
        const circleY = centerY + Math.sqrt(newRadius ** 2 - (centerX - x) ** 2)
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
    linePath.moveTo(endPoint[0], endPoint[1])
    linePath.arc(-2 * newRadius, 0, newRadius)
    linePath.close()

    return <Shape d={linePath} strokeWidth={0} fill="#b7e3fb" />
  }

  const artDrawDCChargeWaveView = () => {
    const leftLinePath = new Path()

    for (
      let i = 0, angle = Math.PI * 0.5, tmp, len;
      i <= (30 * powerPorcentage) / 100;
      i += 1
    ) {
      len = 12
      tmp = radius - 5
      leftLinePath.moveTo(
        radius + tmp * Math.cos(angle),
        radius + tmp * Math.sin(angle)
      )
      tmp -= len
      leftLinePath.lineTo(
        radius + tmp * Math.cos(angle),
        radius + tmp * Math.sin(angle)
      )
      leftLinePath.close()
      angle += Math.PI / 30
    }

    const rightLinePath = new Path()

    for (
      let i = 0, angle = Math.PI * 0.5, tmp, len;
      i <= (30 * powerPorcentage) / 100;
      i += 1
    ) {
      len = 12
      tmp = radius - 5
      rightLinePath.moveTo(
        radius + tmp * Math.cos(angle),
        radius + tmp * Math.sin(angle)
      )
      tmp -= len
      rightLinePath.lineTo(
        radius + tmp * Math.cos(angle),
        radius + tmp * Math.sin(angle)
      )
      rightLinePath.close()
      angle -= Math.PI / 30
    }

    return (
      <Surface width={surfaceWidth} height={surfaceHeigth}>
        {artDrawWave()}
      </Surface>
    )
  }

  return <View>{artDrawDCChargeWaveView()}</View>
}

export default Wave
