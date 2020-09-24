import { combineReducers, CombinedState } from 'redux'
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from 'react-redux'
import { userReducer } from './user'
import { floodingsReducer } from './floodings'
import { alertsReducer } from './alerts'
import { notificationReducer } from './notification'
import { DestroySessionActionTypes } from './destroy_session'

const appReducer = combineReducers({
  user: userReducer,
  floodings: floodingsReducer,
  alerts: alertsReducer,
  notification: notificationReducer
})

export const rootReducer: typeof appReducer = (state, action) => {
  let newState = {
    ...state
  } as CombinedState<RootState> | undefined

  if (action.type === 'DESTROY_SESSION') {
    newState = undefined
  }

  return appReducer(newState, action)
}

type RootState = ReturnType<typeof appReducer>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

type ExtractedActions = typeof appReducer extends (
  state: CombinedState<RootState>,
  action: infer T
) => RootState
  ? T
  : never

type ActionTypes = ExtractedActions | DestroySessionActionTypes

type RootDispatch = <T extends ActionTypes>(action: T) => T

export const useDispatch = (): RootDispatch => useReduxDispatch()

export { destroySession } from './destroy_session'
