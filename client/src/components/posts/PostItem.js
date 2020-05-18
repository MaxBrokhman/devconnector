import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'

import {
  addLike,
  removeLike,
} from '../../actions/post'

const PostItemComponent = ({ 
  post, 
  user, 
  authLoading, 
  addLike,
  removeLike,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img
          className="round-img"
          src={post.avatar}
          alt="Post avatar"
        />
        <h4>{post.name}</h4>
      </a>
    </div>
    <div>
      <p className="my-1">{post.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
      </p>
      <button 
        type="button" 
        className="btn btn-light"
        onClick={() => addLike(post._id)}
      >
        <i className="fas fa-thumbs-up"></i>{' '}
        {
          Boolean(post.likes.length) && (
            <span>{post.likes.length}</span>
          )
        }
      </button>
      <button 
        type="button" 
        className="btn btn-light"
        onClick={() => removeLike(post._id)}
      >
        <i className="fas fa-thumbs-down"></i>
      </button>
      <Link to={`/post/${post._id}`} className="btn btn-primary">
        Discussion {
          Boolean(post.comments.length) && (
            <span className='comment-count'>{post.comments.length}</span>
          )
        }
      </Link>
      {
        !authLoading && user._id === post.user && (
          <button      
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )
      }
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authLoading: state.auth.loading,
})

export const PostItem = connect(mapStateToProps, { addLike, removeLike })(PostItemComponent)
