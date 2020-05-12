import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutUser } from '../../actions/auth'

export const NavbarComponent = ({ 
  isAuthanticated, 
  logoutUser,
  loading,
}) => {

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      <ul>
        {
          !loading && isAuthanticated && (
            <Fragment>
              <li>
                <Link to="/dashboard">
                <i className=" fas fa-user" />{'  '}
                  <span className="hide-sm">Dashboard</span>
                </Link>
              </li>
              <li>
                <a 
                  onClick={(evt) => {
                    evt.preventDefault()
                    logoutUser()
                  }}
                >
                  <i className=" fas fa-sign-out-alt" />{'  '}
                  <span className="hide-sm">Logout</span>
                </a>
              </li>
            </Fragment>
          )
        }
        {
          !loading && !isAuthanticated && (
            <Fragment>
              <li><Link to="profiles.html">Developers</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </Fragment>
          )
        }
        
      </ul>
    </nav>
)}

const mapStateToProps = (state) => ({
  isAuthanticated: state.auth.isAuthanticated,
  loading: state.auth.loading,
})

export const Navbar = connect(mapStateToProps, { logoutUser })(NavbarComponent)
