import axios from 'axios'

import { setAlert } from './alert'
import {
  GET_PROFILE,
  PROFILE_ERROR,
} from './types'

export const getProfile = () => async (dispatch) => {
  try {
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
      }
    })
  }
}
