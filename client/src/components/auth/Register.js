import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { setAlert } from '../../actions/alert'
import { registerUser } from '../../actions/auth'

const RegisterComponent = ({ 
  setAlert, 
  registerUser, 
  isAuthanticated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const {
    name,
    email,
    password,
    passwordConfirm,
  } = formData
  const onChange = (evt) => setFormData({
    ...formData,
    [evt.target.name]: evt.target.value,
  })
  const onSubmit = (evt) => {
    evt.preventDefault()
    if (password !== passwordConfirm) return setAlert('Passwords do not match', 'danger')
    const newUser = {
      name,
      email,
      password,
    }
    registerUser(newUser)
  }

  if (isAuthanticated) {
    return <Redirect to="/dashboard" />
  }
  
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Name" 
            name="name" 
            required 
            value={name} 
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email}
            onChange={onChange}
            required
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            minLength="6"
            required
            value={password}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            onChange={onChange}
            minLength="6"
            required
            value={passwordConfirm}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  isAuthanticated: state.auth.isAuthanticated,
})

export const Register = connect(mapStateToProps, { setAlert, registerUser })(RegisterComponent)
