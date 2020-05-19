import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { Spinner } from '../layout/Spinner'
import { getPost } from '../../actions/post'

const PostComponent = ({ 
  getPost,
  post,
  loading,
}) => {
  const { id } = useParams()
  useEffect(() => {
    getPost(id)
  }, [id])
  return (
    <Fragment>
      {
        loading && <Spinner />
      }
      {
        !loading && post && (
          <Fragment>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <div className="post bg-white p-1 my-1">
              <div>
                <Link to={`/profile/${post.user}`}>
                  <img
                    className="round-img"
                    src={post.avatar}
                    alt="profile picture"
                  />
                  <h4>{post.name}</h4>
                </Link>
              </div>
              <div>
                <p className="my-1">{post.text}</p>
              </div>
            </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  post: state.post.post,
  loading: state.post.loading,
})

export const Post = connect(mapStateToProps, { getPost })(PostComponent)
