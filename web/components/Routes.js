import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import OAuthTokenView from './oauth/OAuthTokenView'
import OAuthErrorView from './oauth/OAuthErrorView'
import HomeView from './home/HomeView'
import AddUserView from './home/AddUserView'

export default (
  <div>
    <Router>
      <div>
        <Route exact path="/" component={HomeView}/>
        <Route exact path="/adduser" component={AddUserView}/>
        <Route exact path="/oauth/token" component={OAuthTokenView}/>
        <Route exact path="/oauth/error" component={OAuthErrorView}/>
      </div>
    </Router>
  </div>
)