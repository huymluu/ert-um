import React from 'react'
import Header from '../Header'
import UsersView from './UsersView'
import Authenticator from '../Authenticator'

export default class HomeView extends React.Component {

  render () {
    if (Authenticator.isLoggedIn()) {
      return (
        <div>
          <Header/>
          <UsersView/>
        </div>
      )
    } else {
      return (
        <div>
          Please <a href="/oauth/login">login via OAuth server</a> first.
        </div>
      )
    }
  }
}