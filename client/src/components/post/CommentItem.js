import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import { deleteComment } from '../../actions/post'

const CommentItemComponent = ({ 
  postId, 
  comment,
  deleteComment,
  authLoading,
  user,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${comment.user}`}>
        <img
          className="round-img"
          src={comment.avatar}
          alt="User Avatar"
        />
        <h4>{comment.name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{comment.text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
      </p>
      {
        !authLoading && user._id === comment.user && (
          <button      
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(postId, comment._id)}
          >
            <i class="fas fa-times"></i>
          </button>
        )
      }
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  authLoading: state.auth.loading,
  user: state.auth.user,
})

export const CommentItem = connect(mapStateToProps, { deleteComment })(CommentItemComponent)
