import axios from 'axios'

import { setAlert } from './alert'
import { GET_POSTS, POST_ERROR } from './types'

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('api/v1/posts')
    dispatch({
      type: GET_POSTS,
      payload: res.data.posts,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}
