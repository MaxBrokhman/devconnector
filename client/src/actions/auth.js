import axios from 'axios'

import {
  REGISTER_FAIL,
  REGISTER_SUCCSESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types'
import { setAlert } from './alert'
import { setAuthToken } from '../utils/setAuthToken'

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('devconnectorToken')
  token && setAuthToken(token)
  try {
    const res = await axios.get('/api/v1/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data.user,
    })
  } catch {
    dispatch({ type: AUTH_ERROR })
  }
}

export const registerUser = ({
  name,
  email,
  password,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({
    name,
    email,
    password,
  })

  try {
    const res = await axios.post('/api/v1/users', body, config)
    dispatch({
      type: REGISTER_SUCCSESS,
      payload: res.data.token,
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => setAlert(error.message, 'danger'))
    }
    dispatch({ type: REGISTER_FAIL })
  }
}

export const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/v1/auth', body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => setAlert(error.message, 'danger'))
    }
    dispatch({ type: LOGIN_FAIL })
  }
}

export const logoutUser = () => (dispatch) => dispatch({ type: LOGOUT })
