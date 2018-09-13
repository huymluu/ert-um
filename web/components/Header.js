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
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <span className="navbar-brand">Hello, {this.state.account.username}</span>
            <a className="btn btn-danger ml-auto" href="/" onClick={Authenticator.logout}>Logout</a>
          </div>
        </nav>
        }
      </div>
    )
  }
}