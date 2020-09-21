import React from 'react'
import { Box, Typography, TouchableRipple } from 'src/components/atoms'
import { useTheme, Colors } from 'react-native-paper'
import color from 'color'
import { StyleSheet } from 'react-native'
import {
  BottomTabBarProps,
  BottomTabBarOptions
} from '@react-navigation/bottom-tabs'
import { useWindowDimensions, useIsKeyboardShown } from 'src/hooks'

const DEFAULT_TABBAR_HEIGHT = 49

const CustomTabBar: React.FC<BottomTabBarProps<BottomTabBarOptions>> = ({
  state,
  descriptors,
  navigation
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options
  const theme = useTheme()
  const isKeyboardShown = useIsKeyboardShown()
  const dimensions = useWindowDimensions()

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      height={DEFAULT_TABBAR_HEIGHT}
      overflow="hidden"
      borderTopWidth={StyleSheet.hairlineWidth}
      borderBottomWidth={StyleSheet.hairlineWidth}
      bgColor="background"
      display={isKeyboardShown ? 'none' : undefined}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <Box
            key={index}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            width={dimensions.width / state.routes.length + 16}
            height={dimensions.width / state.routes.length + 16}
            borderRadius={dimensions.width / state.routes.length / 2 + 16}
            position="absolute"
            left={`${(index * dimensions.width) / state.routes.length - 8}px`}
          >
            <TouchableRipple
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              rippleColor={color(theme.colors.accent)
                .alpha(0.32)
                .rgb()
                .string()}
            >
              <Box
                height={dimensions.width / state.routes.length + 16}
                width={dimensions.width / state.routes.length + 16}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    size: 24,
                    color: isFocused ? theme.colors.accent : Colors.grey600
                  })}
                <Typography
                  variant="h4"
                  style={{
                    color: isFocused ? theme.colors.accent : Colors.grey600
                  }}
                >
                  {options.tabBarLabel}
                </Typography>
              </Box>
            </TouchableRipple>
          </Box>
        )
      })}
    </Box>
  )
}

export default CustomTabBar
