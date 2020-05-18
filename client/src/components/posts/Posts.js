import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { getPosts } from '../../actions/post'
import { Spinner } from '../../components/layout/Spinner'

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
      
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  posts: state.post.posts,
})

export const Posts = connect(mapStateToProps, { getPosts })(PostsComponent) 
