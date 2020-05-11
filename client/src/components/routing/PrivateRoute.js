import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouteComponent = ({ 
  Component, 
  isAuthanticated,
  loading,
  ...props
}) => (
  <Route 
    {...props} 
    render={(innerProps) => (
      !isAuthanticated && !loading 
        ? <Redirect to="/login" {...innerProps} /> 
        : <Component />)
    } 
  />
)

const mapStateToProps = (state) => ({
  isAuthanticated: state.auth.isAuthanticated,
  loading: state.auth.loading,
})

export const PrivateRoute = connect(mapStateToProps)(PrivateRouteComponent)
