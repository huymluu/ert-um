import React from 'react'

export default class UserRow extends React.Component {

  render () {
    return (
      <li className={this.props.isSelected ? 'list-group-item active' : 'list-group-item'} onClick={this.props.onClick}>
        { this.props.user.full_name }
      </li>
    )
  }
}