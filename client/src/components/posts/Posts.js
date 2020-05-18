import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { getPosts } from '../../actions/post'
import { Spinner } from '../../components/layout/Spinner'
import { PostItem } from './PostItem'

const PostsComponent = ({
  getPosts,
  posts,
  loading,
}) => {
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <Fragment>
      {
        loading && <Spinner />
      }
      {
        !loading && (
          <Fragment>
            <h1 className="large text-primary">
              Posts
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
            {
              posts.map(post => <PostItem post={post} key={post._id} />)
            }
          </Fragment>
        )
      }

    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  posts: state.post.posts,
})

export const Posts = connect(mapStateToProps, { getPosts })(PostsComponent) 
