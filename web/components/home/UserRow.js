import React from 'react'

export default class UserRow extends React.Component {

  render () {
    return (
      <li className="list-group-item">
        { this.props.user.full_name }
      </li>
    )
  }
}