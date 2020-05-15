import React from 'react'

export const ProfileTop = ({ profile: {
  status,
  company,
  location,
  website,
  social,
  user: {
    name,
    avatar,
  },
} }) => (
  <div className="profile-top bg-primary p-2">
    <img
      className="round-img my-1"
      src={avatar}
      alt="user avatar"
    />
    <h1 className="large">{name}</h1>
    <p className="lead">{status} {company && <span> at {company}</span>}</p>
    <p>{location}</p>
    <div className="icons my-1">
      {
        website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )
      }
      {
        social && Object.keys(social).map(network => social[network] && (
          <a href={social[network]} target="_blank" rel="noopener noreferrer" key={network}>
            <i className={`fab fa-${network} fa-2x`}></i>
          </a>
        ))
      }
    </div>
  </div>
)
