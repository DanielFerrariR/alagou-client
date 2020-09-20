import React from 'react'
import { Box, Typography, TouchableRipple } from 'src/components/atoms'
import { useTheme, Colors } from 'react-native-paper'
import color from 'color'
import { Dimensions, StyleSheet } from 'react-native'
import {
  BottomTabBarProps,
  BottomTabBarOptions
} from '@react-navigation/bottom-tabs'

const CustomTabBar: React.FC<BottomTabBarProps<BottomTabBarOptions>> = ({
  state,
  descriptors,
  navigation
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options
  const theme = useTheme()

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      height={56}
      overflow="hidden"
      borderTopWidth={StyleSheet.hairlineWidth}
      bgColor="custom.white"
    >
      {state.routes.map((route: any, index: any) => {
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
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            width={Dimensions.get('window').width / state.routes.length + 16}
            height={Dimensions.get('window').width / state.routes.length + 16}
            borderRadius={
              Dimensions.get('window').width / state.routes.length / 2 + 16
            }
            position="absolute"
            left={`${
              (index * Dimensions.get('window').width) / state.routes.length - 8
            }px`}
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
                height={
                  Dimensions.get('window').width / state.routes.length + 16
                }
                width={
                  Dimensions.get('window').width / state.routes.length + 16
                }
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="h4"
                  style={{
                    color: isFocused ? theme.colors.accent : Colors.grey600
                  }}
                >
                  {options.tabBarLabel}
                </Typography>
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    size: 24,
                    color: isFocused ? theme.colors.accent : Colors.grey600
                  })}
              </Box>
            </TouchableRipple>
          </Box>
        )
      })}
    </Box>
  )
}

export default CustomTabBar
