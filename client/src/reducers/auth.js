import {
  REGISTER_FAIL,
  REGISTER_SUCCSESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('devconnectorToken'),
  isAuthanticated: false,
  loading: true,
  user: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthanticated: true,
        loading: false,
        user: action.payload,
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem('devconnectorToken')
      return {
        ...state,
        isAuthanticated: false,
        loading: false,
        user: null,
        token: null,
      }
    case REGISTER_SUCCSESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('devconnectorToken', action.payload)
      return {
        ...state,
        isAuthanticated: true,
        loading: false,
        token: action.payload,
      }
    default:
      return state
  }
}
