import {
  FloodingsState,
  FloodingActionsTypes,
  FETCH_FLOODINGS,
  CREATE_FLOODING,
  EDIT_FLOODING,
  DELETE_FLOODING,
  UPDATE_FLOODINGS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_COMMENT,
  UPLOAD_FLOODINGS_CSV
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
    case DELETE_FLOODING:
      return action.payload
    case UPDATE_FLOODINGS:
      return action.payload
    case ADD_FAVORITE:
      return action.payload
    case REMOVE_FAVORITE:
      return action.payload
    case ADD_COMMENT:
      return action.payload
    case UPLOAD_FLOODINGS_CSV:
      return action.payload
    default:
      return state
  }
}

export default FloodingReducer
