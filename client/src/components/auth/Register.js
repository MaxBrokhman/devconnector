import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { setAlert } from '../../actions/alert'

const RegisterComponent = ({ setAlert }) => {
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
  const onSubmit = async (evt) => {
    evt.preventDefault()
    if (password !== passwordConfirm) return setAlert('Passwords do not match', 'danger')
    const newUser = {
      name,
      email,
      password,
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify(newUser)
      const res = await axios.post('/api/v1/users', body, config)
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
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

export const Register = connect(null, { setAlert })(RegisterComponent)
