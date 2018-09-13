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
        <div className="container" style={{padding: '40px'}}>
          <h1 className="text-center">Welcome to ERT User Management app</h1>
          <p className="text-center" style={{marginTop: '40px'}}>
            Please <a href="/oauth/login">login via OAuth server</a> first.</p>
        </div>
      )
    }
  }
}