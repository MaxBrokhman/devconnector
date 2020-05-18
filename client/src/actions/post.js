import axios from 'axios'

import { setAlert } from './alert'
import { 
  GET_POSTS, 
  POST_ERROR,
  UPDATE_LIKES, 
} from './types'

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

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/like/${id}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        likes: res.data.likes,
        id,
      },
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

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/unlike/${id}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        likes: res.data.likes,
        id,
      },
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
