import React from 'react'
import Box, { BoxProps } from './box'

const Paper: React.FC<BoxProps> = (props) => {
  return <Box borderRadius={4} elevation={2} bgColor="surface" {...props} />
}

export default Paper
