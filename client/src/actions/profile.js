import axios from 'axios'

import { setAlert } from './alert'
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILES,
  GET_REPOS,
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

export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('/api/v1/profile')
    dispatch({
      type: GET_PROFILES,
      payload: res.data.profiles,
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

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profile/user/${userId}`)
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

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profile/github/${username}`)
    dispatch({
      type: GET_REPOS,
      payload: JSON.parse(res.data.repos),
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

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profile/experience/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    })
    dispatch(setAlert('Experience removed', 'success'))
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

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profile/education/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    })
    dispatch(setAlert('Education removed', 'success'))
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

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete(`/api/v1/profile`)
      if (res.status === 200) {
        dispatch({ type: CLEAR_PROFILE })
        dispatch({ type: DELETE_ACCOUNT })
        dispatch(setAlert('Account deleted', 'success'))
      } 
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
}
