/* eslint-disable react/prefer-stateless-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/static-property-placement */
import color from 'color'
import * as React from 'react'
import { View, StyleSheet, TextStyle, ViewStyle, StyleProp } from 'react-native'
import { Text, TouchableRipple, withTheme } from 'react-native-paper'
import Icon, { IconSource } from 'react-native-paper/src/components/Icon'
import ActivityIndicator from './activity_indicator'

type Props = {
  /**
   * Title text for the `MenuItem`.
   */
  title: React.ReactNode
  /**
   * Icon to display for the `MenuItem`.
   */
  icon?: IconSource
  /**
   * Whether the 'item' is disabled. A disabled 'item' is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean
  /**
   * Function to execute on press.
   */
  onPress?: () => void
  /**
   * @optional
   */
  theme: ReactNativePaper.Theme
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  contentStyleWithIcon?: StyleProp<ViewStyle>
  /**
   * TestID used for testing purposes
   */
  testID?: string
  loading?: boolean
}

/**
 * A component to show a single list item inside a Menu.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/menu-item.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Menu } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View style={{ flex: 1 }}>
 *     <Menu.Item icon="redo" onPress={() => {}} title="Redo" />
 *     <Menu.Item icon="undo" onPress={() => {}} title="Undo" />
 *     <Menu.Item icon="content-cut" onPress={() => {}} title="Cut" disabled />
 *     <Menu.Item icon="content-copy" onPress={() => {}} title="Copy" disabled />
 *     <Menu.Item icon="content-paste" onPress={() => {}} title="Paste" />
 *   </View>
 * );
 *
 * export default MyComponent;
 * ```
 */

const minWidth = 112
const maxWidth = 280
const iconWidth = 40

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    minWidth,
    maxWidth,
    height: 48,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  icon: {
    width: iconWidth
  },
  title: {
    fontSize: 16
  },
  item: {
    marginHorizontal: 8
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: minWidth - 16,
    maxWidth: maxWidth - 16
  },
  widthWithIcon: {
    maxWidth: maxWidth - (iconWidth + 48)
  }
})

class MenuItem extends React.Component<Props> {
  static displayName = 'Menu.Item'

  render() {
    const {
      icon,
      title,
      disabled,
      onPress,
      theme,
      style,
      testID,
      titleStyle,
      contentStyle,
      contentStyleWithIcon,
      loading
    } = this.props

    const disabledColor = color(
      theme.dark ? theme.colors.custom.white : theme.colors.custom.white
    )
      .alpha(0.32)
      .rgb()
      .string()

    const titleColor = disabled
      ? disabledColor
      : color(theme.colors.text).alpha(0.87).rgb().string()

    const iconColor = disabled
      ? disabledColor
      : color(theme.colors.text).alpha(0.54).rgb().string()

    return (
      <TouchableRipple
        style={[styles.container, style]}
        onPress={onPress}
        disabled={disabled}
        testID={testID}
      >
        <View style={styles.row}>
          {icon ? (
            <View style={[styles.item, styles.icon]} pointerEvents="box-none">
              <Icon source={icon} size={24} color={iconColor} />
            </View>
          ) : null}
          <View
            style={[
              styles.item,
              styles.content,
              contentStyle,
              icon ? styles.widthWithIcon : null,
              icon ? contentStyleWithIcon : null
            ]}
            pointerEvents="none"
          >
            <Text
              numberOfLines={1}
              style={[styles.title, { color: titleColor }, titleStyle]}
            >
              {title}
            </Text>
            {loading ? (
              <ActivityIndicator animating size={24} color="accent" ml={2} />
            ) : null}
          </View>
        </View>
      </TouchableRipple>
    )
  }
}

export default withTheme(MenuItem)

export { MenuItem }
