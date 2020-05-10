import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {
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
    const newUser = {
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
      const res = await axios.post('/api/v1/auth', body, config)
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
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
