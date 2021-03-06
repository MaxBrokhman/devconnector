import React from 'react'
import { Link } from 'react-router-dom'

export const ProfileItem = ({ profile }) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={profile.user.avatar} />
      <div>
        <h2>{profile.user.name}</h2>
        <p>{profile.status} {profile.company && <span>at {profile.company}</span>}</p>
        <p className="my-1">{profile.location && <span>{profile.location}</span>}</p>
        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {
          profile.skills.map(skill => (
            <li key={skill} className="text-primary">
              <i className="fas fa-check" /> {skill}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
