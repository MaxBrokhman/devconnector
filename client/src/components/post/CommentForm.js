import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addComment } from '../../actions/post'

const CommentFormComponent = ({ addComment, postId }) => {
  const [text, setText] = useState('')
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={(evt) => {
        evt.preventDefault()
        addComment(postId, { text })
        setText('')
      }}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
          onChange={(evt) => setText(evt.target.value)}
          value={text}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
}

export const CommentForm = connect(null, { addComment })(CommentFormComponent)
