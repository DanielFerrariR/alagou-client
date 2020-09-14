import {
  UserState,
  UserActionsTypes,
  CREATE_USER,
  EDIT_USER,
  FETCH_USER,
  SET_NOT_LOGGED_USER,
  SET_LOGGED_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from './types'

const initialState = null

const userReducer = (
  state: UserState | false | null = initialState,
  action: UserActionsTypes
): UserState | false | null => {
  switch (action.type) {
    case CREATE_USER:
      return action.payload
    case EDIT_USER:
      return action.payload
    case FETCH_USER:
      return action.payload
    case SET_LOGGED_USER:
      return action.payload
    case SET_NOT_LOGGED_USER:
      return action.payload
    case ADD_FAVORITE:
      return action.payload
    case REMOVE_FAVORITE:
      return action.payload
    default:
      return state
  }
}

export default userReducer
