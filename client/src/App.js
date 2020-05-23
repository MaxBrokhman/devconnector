import React, { useEffect } from 'react'
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
} from 'react-router-dom'
import { Provider } from 'react-redux'

import { Navbar } from './components/layout/Navbar'
import { Landing } from './components/layout/Landing'
import { store } from './store'
import { loadUser } from './actions/auth'
import { Container } from './components/layout/Container'

import './App.css'

export const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Container} />
        </Switch>
      </Router>
    </Provider>
)};
