import React, { Fragment } from 'react'

export const ProfileAbout = ({ profile: {
  bio,
  skills,
  user: {
    name,
  },
} }) => (
  <div className="profile-about bg-light p-2">
    {
      bio && (
        <Fragment>
          <h2 className="text-primary">{name}'s Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )
    }
    <div className="line"></div>
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {
        skills.map(skill => (
          <div className="p-1" key={skill}><i className="fa fa-check"></i> {skill}</div>
        ))
      }
    </div>
  </div>
)
