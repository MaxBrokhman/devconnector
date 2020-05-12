import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getProfile } from '../../actions/profile'
import { Spinner } from '../layout/Spinner'
import { DashboardActions } from './DashboardActions'

export const DashboardComponent = ({
  getProfile,
  profile,
  profileLoading,
  user,
}) => {
  useEffect(() => {
    getProfile()
  }, [])
  return profileLoading && !profile 
    ? (
      <Spinner />
    )
    : (
      <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i>{'  '}
          Welcome { user && user.name }
        </p>
        {
          profile && (
            <Fragment>
              <DashboardActions />
            </Fragment>
          )
        }
        {
          !profile && (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">Create profile</Link>
            </Fragment>
          )
        }
      </Fragment>
    )
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  profileLoading: state.profile.loading,
  user: state.auth.user,
})

export const Dashboard = connect(mapStateToProps, { getProfile })(DashboardComponent)
