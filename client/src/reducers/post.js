import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  UPDATE_COMMENTS,
} from '../actions/types'

const initialState = {
  loading: false,
  posts: [],
  post: null,
  error: null,
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      }
    case UPDATE_LIKES: 
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post => post._id === action.payload.id 
          ? {
            ...post,
            likes: action.payload.likes,
          }
          : post
        )
      }
    case DELETE_POST: 
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      }
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [
          action.payload,
          ...state.posts,
        ],
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      }
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case UPDATE_COMMENTS:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: action.payload,
        }
      }
    default:
      return state
  }
}
