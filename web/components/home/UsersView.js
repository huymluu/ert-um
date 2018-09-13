import React from 'react'
import axios from 'axios'
import UserRow from './UserRow'
import UserDetail from './UserDetail'

export default class UsersView extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      users: [],
      selectedRowIndex: -1,
      selectedUser: undefined
    }
  }

  componentDidMount () {
    this.refreshData()
  }

  refreshData () {
    let that = this
    axios.get(API_URL + '/users')
      .then(function (response) {
        let users = response.data
        that.setState({
          users: users
        })

        if (users.length === 0) {
          that.onRowSelected(-1)
        } else {
          if (that.state.selectedRowIndex < 0 || that.state.selectedRowIndex > users.length - 1) {
            console.log(that.state.selectedRowIndex)
            that.onRowSelected(0)
          } else {
            that.onRowSelected(that.state.selectedRowIndex)
          }
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  onRowSelected (index) {
    this.setState({
      selectedRowIndex: index,
      selectedUser: index >= 0 ? this.state.users[index] : undefined
    })
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
            <UserDetail user={this.state.selectedUser} onEditSuccess={() => this.refreshData()}/>
          </div>
        </div>
      </div>
    )
  }
}