import React from 'react'
import { connect } from 'react-redux'

export const DashboardComponent = () => {
  return (
    <div>
      Dashboard
    </div>
  )
}

export const Dashboard = connect()(DashboardComponent)
