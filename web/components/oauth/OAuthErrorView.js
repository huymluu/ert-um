import React from 'react'
import queryString from 'query-string'

export default class OAuthDeniedView extends React.Component {

  constructor (props) {
    super(props)

    const queries = queryString.parse(props.location.search)

    this.state = {
      code: queries.code,
      message: queries.message,
    }
  }

  render () {
    return (
      <div className="container" style={{padding: '40px'}}>
        <h1 className="text-center">Error occurs when authorizing</h1>
        { this.state.code &&
        <p className="text-center" style={{marginTop: '40px'}}>
          Error code: {this.state.code}
        </p>
        }
        { this.state.message &&
        <p className="text-center" style={{marginTop: '40px'}}>
          Error: {this.state.message}
        </p>
        }
      </div>
    )
  }
}