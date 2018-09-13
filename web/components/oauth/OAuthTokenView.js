import React from 'react'
import queryString from 'query-string'
import Authenticator from '../Authenticator'

export default class OAuthTokenView extends React.Component {

  constructor (props) {
    super(props)
    const queries = queryString.parse(props.location.search)
    const token = queries.token

    if (token) {
      Authenticator.setToken(token)
      Authenticator.fetchMe()
      props.history.push('/')
    }

    this.state = {
      token: token,
    }
  }

  render () {
    if (this.state.token) {
      return (
        <div>
          {this.state.token}
        </div>
      )
    } else {
      return (
        <div>
          Invalid token
        </div>
      )
    }
  }
}