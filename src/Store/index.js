import { combineReducers } from 'redux'
import * as reducers from './Reducers'

const appReducer = combineReducers(reducers)
const rootReducer = (state, action) => {
  console.log(action)
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
