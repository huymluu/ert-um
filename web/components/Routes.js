import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import OAuthTokenView from './oauth/OAuthTokenView'
import Authenticator from './Authenticator'
import HomeView from './home/HomeView'
import AddUserView from './home/AddUserView'
import AdminView from './admin/AdminView'

const PrivateRoute = ({component, ...rest}) => (
  <Route {...rest} render={ function (props) {
    if (!Authenticator.isLoggedIn()) {
      return (
        <Redirect to={{
          pathname: '/',
          state: {from: props.location}
        }}/>
      )
    }

    if (!Authenticator.isAuthorized(props.location.pathname)) {
      return (
        <div>
          <h1>Access denied</h1>
        </div>
      )
    }

    return React.createElement(component, props)
  }}/>
)

export default (
  <div>
    <Router>
      <div>
        <Route exact path="/" component={HomeView}/>
        <Route exact path="/adduser" component={AddUserView}/>
        <Route exact path="/oauth/token" component={OAuthTokenView}/>
        <PrivateRoute path="/admin" component={AdminView}/>
      </div>
    </Router>
  </div>
)