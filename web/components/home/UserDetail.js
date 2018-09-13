import React from 'react'

export default class UserDetail extends React.Component {

  render () {
    return (
      <div style={{margin: '30px'}}>
        { this.props.user &&
        <div>
          <div className="row">
            <label className="col-md-3">ID</label>
            {this.props.user.id}
          </div>
          <div className="row">
            <label className="col-md-3">Username</label>
            {this.props.user.username}
          </div>
          <div className="row">
            <label className="col-md-3">Fullname</label>
            {this.props.user.full_name}
          </div>
          <div className="row">
            <label className="col-md-3">DoB</label>
            {this.props.user.dob}
          </div>
          <button className="btn btn-primary" href="#">Edit</button>
        </div>
        }
      </div>
    )
  }
}