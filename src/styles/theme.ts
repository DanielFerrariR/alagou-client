import color from 'color'
import { configureFonts, Colors } from 'react-native-paper'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    interface ThemeColors {
      custom: {
        black: string
        white: string
        star: string
        starOff: string
        alert: string
        water: string
        danger: string
        moderate: string
        light: string
        verified: string
        shimmer: string
        information: string
        trash: string
        email: string
        error: string
        success: string
        warning: string
        navigationRoute: string
      }
    }
  }
}

const fontConfig = {}

const custom = {
  black: '#000000',
  white: '#ffffff',
  star: '#D7CD38',
  starOff: '#d7d7d7',
  alert: '#F9862C',
  water: '#369AEB',
  danger: '#ff0000',
  moderate: '#eaf300',
  light: '#00c239',
  verified: '#d6cc11',
  shimmer: 'rgba(0, 0, 0, 0.11)',
  information: '#349aef',
  trash: '#e8641b',
  email: '#00b034',
  error: '#f44336',
  success: '#388e3c',
  warning: '#ff9800',
  navigationRoute: '#1E88E5'
}

const theme = {
  dark: false,
  roundness: 4,
  colors: {
    custom,
    primary: '#1E5C5C',
    accent: '#3DBABA',
    background: '#f5f5f5',
    surface: Colors.white,
    error: '#f44336',
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
