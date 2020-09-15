import React from 'react'
import styled from 'styled-components/native'
import { spacing, SpacingProps, sizing, SizingProps } from 'src/styles/system'
import { IconButton } from 'react-native-paper'
import {
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
  TouchableWithoutFeedback
} from 'react-native'
import { IconSource } from 'react-native-paper/src/components/Icon'
import { theme } from 'src/styles'

interface OldIconButtonProps {
  /**
   * Icon to display.
   */
  icon: IconSource
  /**
   * Color of the icon.
   */
  color?: string
  /**
   * Size of the icon.
   */
  size?: number
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean
  /**
   * Whether an icon change is animated.
   */
  animated?: boolean
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  ref?: React.RefObject<TouchableWithoutFeedback>
  /**
   * @optional
   */
  theme?: ReactNativePaper.Theme
}

export type IconButtonProps = OldIconButtonProps & SpacingProps & SizingProps

const StyledIconButton = styled(IconButton)`
  ${spacing} ${sizing};
`

const ThemedIconButton: React.FC<IconButtonProps> = ({ color, ...rest }) => {
  const splitColor = color?.split('.')
  let finalColor

  if (splitColor) {
    finalColor = theme.colors as any

    for (const eachColor of splitColor) {
      finalColor = finalColor[eachColor]
    }
  }

  return <StyledIconButton color={finalColor} {...rest} />
}

export default ThemedIconButton
