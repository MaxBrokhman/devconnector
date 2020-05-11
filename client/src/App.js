import React, { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
} from 'react-router-dom'
import { Provider } from 'react-redux'

import { Navbar } from './components/layout/Navbar'
import { Landing } from './components/layout/Landing'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { store } from './store'
import { Alert } from './components/layout/Alert'
import { loadUser } from './actions/auth'

import './App.css'

export const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Router>
    </Provider>
)};
