import axios from 'axios'

import { setAlert } from './alert'
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from './types'
import { setAuthToken } from '../utils/setAuthToken'

export const getProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('devconnectorToken')
    token && setAuthToken(token)
    const res = await axios.get('/api/v1/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}

export const createProfile = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const res = await axios.post('/api/v1/profile', formData, config)
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    })
    dispatch(setAlert('Profile created', 'success'))
    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}

export const editProfile = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const res = await axios.post('/api/v1/profile', formData, config)
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    })
    dispatch(setAlert('Profile updated', 'success'))
    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const res = await axios.put('/api/v1/profile/experience', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    })
    dispatch(setAlert('Experience added', 'success'))
    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    } else {
      dispatch(setAlert(err.response.data.message, 'danger'))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const res = await axios.put('/api/v1/profile/education', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    })
    dispatch(setAlert('Education added', 'success'))
    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}
