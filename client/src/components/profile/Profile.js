import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { Spinner } from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import { ProfileTop } from './ProfileTop'
import { ProfileAbout } from './ProfileAbout'

const ProfileComponent = ({
  authLoading,
  getProfileById,
  loading,
  profile,
  isAuthanticated,
  user,
}) => {
  const { id } = useParams()
  useEffect(() => {
    getProfileById(id)
  }, [id])
  return (
    <Fragment>
      {
        loading && <Spinner />
      }
      {
        !loading && profile && (
          <Fragment>
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
            {
              isAuthanticated && !authLoading && user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>
              )
            }
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
            </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  isAuthanticated: state.auth.isAuthanticated,
  authLoading: state.auth.loading,
  user: state.auth.user,
})

export const Profile = connect(mapStateToProps, { getProfileById })(ProfileComponent)
