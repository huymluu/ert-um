import React from 'react'
import Authenticator from '../Authenticator'

export default class HomeView extends React.Component {

  constructor (props) {
    super(props)
    if (Authenticator.isLoggedIn()) {
      props.history.push('/users')
    }
  }

  render () {
    if (Authenticator.isLoggedIn()) {
      return (
        <div>
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