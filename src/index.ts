import { AppRegistry } from 'react-native'
import { startEventEmitter } from 'src/utils'
import App from './routes'
import { name as appName } from '../app.json'

// on top of your index.js file
const isAndroid = require('react-native').Platform.OS === 'android'

const isHermesEnabled = !!global.HermesInternal

// in your index.js file
if (isHermesEnabled || isAndroid) {
  require('@formatjs/intl-getcanonicallocales/polyfill')

  require('@formatjs/intl-pluralrules/polyfill')
  require('@formatjs/intl-pluralrules/locale-data/pt-PT')

  require('@formatjs/intl-relativetimeformat/polyfill')
  require('@formatjs/intl-relativetimeformat/locale-data/pt-PT')

  require('@formatjs/intl-listformat/polyfill')
  require('@formatjs/intl-listformat/locale-data/pt-PT')

  require('@formatjs/intl-displaynames/polyfill')
  require('@formatjs/intl-displaynames/locale-data/pt-PT')

  require('@formatjs/intl-numberformat/polyfill')
  require('@formatjs/intl-numberformat/locale-data/pt-PT')

  require('@formatjs/intl-datetimeformat/polyfill')
  require('@formatjs/intl-datetimeformat/locale-data/pt-PT')

  require('@formatjs/intl-datetimeformat/add-all-tz.js')

  require('@formatjs/intl-locale/polyfill')

  const RNLocalize = require('react-native-localize')

  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
    Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone())
  }
}

startEventEmitter()

AppRegistry.registerComponent(appName, () => App)
