import { combineReducers } from 'redux'

import { alertReducer } from './alert'
import { authReducer } from './auth'
import { profileReducer } from './profile'
import { postReducer } from './post'

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
})
