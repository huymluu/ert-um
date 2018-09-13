import React from 'react'
import Authenticator from './Authenticator'

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
        <div className="container">
          <ul className="nav nav-pills">
            <li className="navbar-left"><p className="navbar-text">
              Hello, {this.state.account.username}</p>
            </li>
            <li className="navbar-right"><a href="/" onClick={Authenticator.logout}>Logout</a></li>
          </ul>
        </div>
        }
      </div>
    )
  }
}