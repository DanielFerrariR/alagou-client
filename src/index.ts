import { AppRegistry } from 'react-native'
import { startEventEmitter } from 'src/utils'
import App from './routes'
import { name as appName } from '../app.json'

startEventEmitter()

AppRegistry.registerComponent(appName, () => App)
