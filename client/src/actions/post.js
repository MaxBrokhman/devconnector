import axios from 'axios'

import { setAlert } from './alert'
import { 
  GET_POSTS, 
  POST_ERROR,
  UPDATE_LIKES, 
  DELETE_POST,
  ADD_POST,
  GET_POST,
  UPDATE_COMMENTS,
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

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/posts/${id}`)
    if (res.status === 200) {
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
      dispatch(setAlert('Post has been deleted', 'success'))
    }
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

export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const res = await axios.post(`/api/v1/posts`, formData, config)
    if (res.status === 200) {
      dispatch({
        type: ADD_POST,
        payload: res.data.post,
      })
      dispatch(setAlert('Post has been added', 'success'))
    }
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

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts/${id}`)
    dispatch({
      type: GET_POST,
      payload: res.data.post,
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

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const res = await axios.post(`/api/v1/posts/comments/${postId}`, formData, config)
    if (res.status === 200) {
      dispatch({
        type: UPDATE_COMMENTS,
        payload: res.data.comments,
      })
      dispatch(setAlert('Comment has been added', 'success'))
    }
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

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/posts/comments/${postId}/${commentId}`)
    if (res.status === 200) {
      dispatch({
        type: UPDATE_COMMENTS,
        payload: res.data.comments,
      })
      dispatch(setAlert('Comment has been deleted', 'success'))
    }
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
