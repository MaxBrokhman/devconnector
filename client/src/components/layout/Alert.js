import React from 'react'
import { connect } from 'react-redux'

export const AlertComponent = ({ alerts }) => (
  Boolean(alerts) && Boolean(alerts.length) && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.message}
    </div>
  ))
)

const mapStateToProps = (state) => ({
  alerts: state.alert,
})

export const Alert = connect(mapStateToProps)(AlertComponent)
