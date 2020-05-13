import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { addEducation } from '../../actions/profile'

const AddEducationComponent = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  })
  const [toDateDisabled, toggleDisabled] = useState(false)
  const history = useHistory()
  const {
    school,
    current,
    description,
    from,
    fieldOfStudy,
    degree,
    to,
  } = formData

  const onChange = (evt) => setFormData({
    ...formData,
    [evt.target.name]: evt.target.value,
  })
  const onCurrentToggle = () => {
    setFormData({
      ...formData,
      current: !current,
    })
    toggleDisabled(!toDateDisabled)
  }
  const onSubmit = (evt) => {
    evt.preventDefault()
    addEducation(formData, history)
  }
  return (
    <Fragment>
      <h1 className="large text-primary">
        Add your education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="* School or bootcamp" 
            name="school" 
            required 
            value={school}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="* Degree or Certificate" 
            name="degree" 
            required 
            value={degree}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Field of study" 
            name="fieldOfStudy" 
            value={fieldOfStudy}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input 
            type="date" 
            name="from"
            value={from}
            onChange={onChange}
          />
        </div>
         <div className="form-group">
          <p>
            <input 
              type="checkbox" 
              name="current" 
              value={current}
              checked={current}
              onChange={onCurrentToggle}
            /> 
            {'  '}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input 
            type="date" 
            name="to" 
            value={to}
            onChange={onChange}
            disabled={toDateDisabled}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

export const AddEducation = connect(null, { addEducation })(AddEducationComponent)
