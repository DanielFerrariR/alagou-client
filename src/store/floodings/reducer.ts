import {
  FloodingsState,
  FloodingActionsTypes,
  FETCH_FLOODINGS,
  CREATE_FLOODING,
  EDIT_FLOODING,
  REMOVE_FLOODING,
  UPDATE_FLOODINGS
} from './types'

const initialState = null

const FloodingReducer = (
  state: FloodingsState | null = initialState,
  action: FloodingActionsTypes
): FloodingsState | null => {
  switch (action.type) {
    case FETCH_FLOODINGS:
      return action.payload
    case CREATE_FLOODING:
      return action.payload
    case EDIT_FLOODING:
      return action.payload
    case REMOVE_FLOODING:
      return action.payload
    case UPDATE_FLOODINGS:
      return action.payload
    default:
      return state
  }
}

export default FloodingReducer
