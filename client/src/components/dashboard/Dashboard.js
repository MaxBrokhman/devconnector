import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getProfile, deleteAccount } from '../../actions/profile'
import { Spinner } from '../layout/Spinner'
import { DashboardActions } from './DashboardActions'
import { Experience } from './Experience'
import { Education } from './Education'

export const DashboardComponent = ({
  getProfile,
  profile,
  profileLoading,
  user,
  deleteAccount,
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
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <div className="my-2">
                <button className="btn btn-danger" onClick={deleteAccount}>
                  <i className="fas fa-user-minus" /> Delete My Account
                </button>
              </div>
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

export const Dashboard = connect(mapStateToProps, { getProfile, deleteAccount })(DashboardComponent)
