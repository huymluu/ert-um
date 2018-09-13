import React from 'react'
import axios from 'axios'
import UserRow from './UserRow'
import UserDetail from './UserDetail'

export default class UsersView extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      users: [],
      selectedRowIndex: 0
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

  onRowSelected (index) {
    this.setState({selectedRowIndex: index})
  }

  renderUsers () {
    const rows = []
    for (let i = 0; i < this.state.users.length; i++) {
      const user = this.state.users[i]

      rows.push(<UserRow key={i} user={user} isSelected={ i === this.state.selectedRowIndex }
                         onClick={() => this.onRowSelected(i)}/>)
    }
    return rows
  }

  renderUserDetail () {
    let user = this.state.users[this.state.selectedRowIndex]
    if (user) {
      return <UserDetail user={user}/>
    }
  }

  render () {
    return (
      <div className="container" style={{marginTop: '40px'}}>
        <div className="row">
          <div className="col-md-3">
            <ul className="list-group">
              {
                this.renderUsers()
              }
            </ul>
          </div>
          <div className="col-md-9 card">
            { this.renderUserDetail() }
          </div>
        </div>
      </div>
    )
  }
}