import React, { useEffect } from 'react'
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
import { Dashboard } from './components/dashboard/Dashboard'
import { PrivateRoute } from './components/routing/PrivateRoute'
import { CreateProfile } from './components/profile-forms/CreateProfile'
import { EditProfile } from './components/profile-forms/EditProfile'
import { AddExperience } from './components/profile-forms/AddExperience'
import { AddEducation } from './components/profile-forms/AddEducation'
import { Profiles } from './components/profiles/Profiles'
import { Profile } from './components/profile/Profile'
import { Posts } from './components/posts/Posts'
import { Post } from './components/post/Post'

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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/dashboard" Component={Dashboard} />
            <PrivateRoute exact path="/create-profile" Component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" Component={EditProfile} />
            <PrivateRoute exact path="/add-experience" Component={AddExperience} />
            <PrivateRoute exact path="/add-education" Component={AddEducation} />
            <PrivateRoute exact path="/posts" Component={Posts} />
            <PrivateRoute exact path="/posts/:id" Component={Post} />
          </Switch>
        </section>
      </Router>
    </Provider>
)};
