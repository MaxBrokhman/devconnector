import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import { loginUser } from '../../actions/auth'

export const LoginComponent = ({ loginUser, isAuthanticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const {
    email,
    password,
  } = formData
  const onChange = (evt) => setFormData({
    ...formData,
    [evt.target.name]: evt.target.value,
  })
  const onSubmit = async (evt) => {
    evt.preventDefault()
    const user = {
      email,
      password,
    }

    loginUser(user)
  }

  if (isAuthanticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <Fragment>
      <div className="alert alert-danger">
        Invalid credentials
      </div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  isAuthanticated: state.auth.isAuthanticated,
})

export const Login = connect(mapStateToProps, { loginUser })(LoginComponent)
