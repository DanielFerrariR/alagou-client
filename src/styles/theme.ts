import color from 'color'
import { configureFonts, Colors } from 'react-native-paper'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    interface ThemeColors {
      custom: {
        userLocationStroke: string
        userLocationFill: string
        black: string
        white: string
        star: string
        starOff: string
        alert: string
        water: string
        danger: string
        moderate: string
        light: string
        seal: string
      }
    }
  }
}

const fontConfig = {}

const custom = {
  userLocationStroke: 'rgba(158, 158, 255, 1.0)',
  userLocationFill: 'rgba(158,158, 255, 0.3)',
  black: '#000000',
  white: '#ffffff',
  star: '#D7CD38',
  starOff: '#d7d7d7',
  alert: '#F9862C',
  water: '#369AEB',
  danger: '#ff0000',
  moderate: '#eaf300',
  light: '#00c239',
  seal: '#d6cc11'
}

const theme = {
  dark: false,
  roundness: 4,
  colors: {
    custom,
    primary: '#1E5C5C',
    accent: '#3DBABA',
    background: '#FAFAFA',
    surface: Colors.white,
    error: '#b00020',
    text: Colors.black,
    onBackground: '#000000',
    onSurface: '#000000',
    disabled: color(Colors.black).alpha(0.26).rgb().string(),
    placeholder: color(Colors.black).alpha(0.54).rgb().string(),
    backdrop: color(Colors.black).alpha(0.5).rgb().string(),
    notification: Colors.pinkA400
  },
  fonts: configureFonts(fontConfig),
  animation: {
    scale: 1.0
  }
}

export default theme
