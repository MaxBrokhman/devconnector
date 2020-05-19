import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addPost } from '../../actions/post'

const PostFormComponent = ({ addPost }) => {
  const [text, setText] = useState('')
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={(evt) => {
        evt.preventDefault()
        addPost({ text })
        setText('')
      }}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value={text}
          onChange={(evt) => setText(evt.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
}

export const PostForm = connect(null, { addPost })(PostFormComponent)
