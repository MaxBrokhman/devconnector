import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { Spinner } from '../layout/Spinner'
import { getAllProfiles } from '../../actions/profile'
import { ProfileItem } from './ProfileItem'

const ProfilesComponent = ({
  profiles,
  loading,
  getAllProfiles,
}) => {
  useEffect(() => {
    getAllProfiles()
  }, [])
  return (
    <Fragment>
      {
        loading && <Spinner />
      }
      {
        !loading && (
          <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop"></i> Browse and connect with developers
            </p>
            <div className="profiles">
              {
                Boolean(profiles.length) &&
                  profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
              }
            </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  loading: state.profile.loading,
})

export const Profiles = connect(mapStateToProps, { getAllProfiles })(ProfilesComponent)
