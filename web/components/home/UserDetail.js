import React from 'react'

export default class UserDetail extends React.Component {

  render () {
    return (
      <div >
        { this.props.user && this.props.user.full_name }
      </div>
    )
  }
}