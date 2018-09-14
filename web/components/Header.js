import React from 'react'
import Authenticator from './Authenticator'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      account: Authenticator.getAccount()
    }
  }

  componentDidMount () {
    if (!this.state.account) {
      Authenticator.fetchMe().then((data) => this.setState({account: data}))
    }
  }

  render () {
    return (
      <div>
        {this.state.account &&
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <span className="navbar-brand">Hello, {this.state.account.username}</span>
            <div className="ml-auto">
              <Link className="btn btn-primary ml-auto" to="/users">User list</Link>
              <Link className="btn btn-primary ml-auto" to="/adduser">Add user</Link>
              <a className="btn btn-danger ml-auto" href="/" onClick={Authenticator.logout}>Logout</a>
            </div>
          </div>
        </nav>
        }
      </div>
    )
  }
}