import React from 'react'
import axios from 'axios'
import UserRow from './UserRow'

export default class UsersView extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      users: []
    }
  }

  componentDidMount () {
    let that = this
    axios.get(API_URL + '/users')
      .then(function (response) {
        that.setState({users: response.data})
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  renderUsers () {
    const rows = []
    for (let i = 0; i < this.state.users.length; i++) {
      const user = this.state.users[i]

      rows.push(<UserRow key={i} user={user}/>)
    }
    return rows
  }

  render () {
    return (
      <div className="container">
        <ul className="list-group">
          {
            this.renderUsers()
          }
        </ul>
      </div>
    )
  }
}