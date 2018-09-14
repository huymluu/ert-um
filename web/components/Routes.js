import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import OAuthTokenView from './oauth/OAuthTokenView'
import OAuthErrorView from './oauth/OAuthErrorView'
import HomeView from './home/HomeView'
import UsersView from './user/UsersView'
import AddUserView from './user/AddUserView'

export default (
  <div>
    <Router>
      <div>
        <Route exact path="/" component={HomeView}/>
        <Route exact path="/users" component={UsersView}/>
        <Route exact path="/adduser" component={AddUserView}/>
        <Route exact path="/oauth/token" component={OAuthTokenView}/>
        <Route exact path="/oauth/error" component={OAuthErrorView}/>
      </div>
    </Router>
  </div>
)