import React from 'react'
import axios from 'axios'
import Header from '../Header'

function validateDate (dateString) {
  if (!dateString || !dateString.includes('-')) {
    return false
  }
  let date = new Date(dateString)
  return date instanceof Date && isFinite(date)
}

export default class AddUserView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      full_name: '',
      dob: '',
      error: ''
    }
  }

  addUser () {
    if (!this.state.username) {
      return this.setState({error: 'Invalid username'})
    }

    if (!this.state.password) {
      return this.setState({error: 'Invalid password'})
    }

    if (!this.state.full_name) {
      return this.setState({error: 'Invalid full name'})
    }

    if (!this.state.dob || !validateDate(this.state.dob)) {
      return this.setState({error: 'Invalid date of birth. Should be YYYY-MM-DD'})
    }

    let that = this
    axios.post(API_URL + '/user', {
      username: this.state.username,
      full_name: this.state.full_name,
      dob: this.state.dob
    })
      .then(function (response) {
      })
      .catch(function (error) {
        that.setState({error: error.response.status + ' - ' + error.response.data})
      })
  }

  resetForm () {
    this.setState({
      username: '',
      password: '',
      full_name: '',
      dob: '',
      error: ''
    })
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render () {
    return (
      <div>
        <Header/>
        <div className="container col-md-5" style={{marginTop: '40px'}}>
          <h1>Add new user</h1>
          <div className="form-group row">
            <label className="col-md-3 col-form-label">Username</label>
            <input type="text" className="form-control col-md-9"
                   placeholder="Username"
                   name="username"
                   value={this.state.username}
                   onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label">Password</label>
            <input type="password" className="form-control col-md-9"
                   placeholder="Password"
                   name="password"
                   value={this.state.password}
                   onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label">Fullname</label>
            <input type="text" className="form-control col-md-9"
                   name="full_name"
                   placeholder="Full name"
                   value={this.state.full_name}
                   onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label">DoB</label>
            <input type="text" className="form-control col-md-9"
                   name="dob"
                   placeholder="YYYY-MM-DD"
                   value={this.state.dob}
                   onChange={this.handleChange.bind(this)}/>
          </div>
          { this.state.error &&
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>}

          <div>
            <button className="btn btn-primary" onClick={() => this.addUser()}>Submit</button>
            <button className="btn btn-link" onClick={() => this.resetForm()}>Clear</button>
          </div>
        </div>
      </div>
    )
  }
}