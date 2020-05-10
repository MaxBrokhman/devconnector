import { combineReducers } from 'redux'

import { alertReducer } from './alert'

export const rootReducer = combineReducers({
  alert: alertReducer,
})
