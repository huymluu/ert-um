import React from 'react'
import axios from 'axios'

export default class UserDetail extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      full_name: undefined,
      dob: undefined,
      error: undefined
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({isEditing: false, error: undefined})
  }

  saveUserDetail () {
    let that = this
    axios.patch(API_URL + '/user/' + this.props.user.id, {
      full_name: this.state.full_name,
      dob: this.state.dob
    })
      .then(function (response) {
        that.setState({isEditing: false, error: undefined})
        that.props.onEditSuccess()
      })
      .catch(function (error) {
        console.log(error.response.statusText)
        that.setState({error: error.response.status + ' - ' + error.response.data})
      })
  }

  toggleEdit () {
    if (!this.state.isEditing) {
      // Begin editing: Collect info from props
      this.setState({
        full_name: this.props.user.full_name,
        dob: this.getSimpleDate(this.props.user.dob)
      })
    } else {
      // Cancel editing
      this.setState({
        error: ''
      })
    }

    this.setState({isEditing: !this.state.isEditing})
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  getSimpleDate (dateString) {
    let date = new Date(dateString)

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }

  render () {
    return (
      <div style={{margin: '30px'}}>
        { this.props.user &&
        <div >
          <div className="form-group row">
            <label className="col-md-3">ID</label>
            {this.props.user.id}
          </div>
          <div className="form-group row">
            <label className="col-md-3">Username</label>
            {this.props.user.username}
          </div>
          <div className="form-group row">
            <label className="col-md-3">Fullname</label>
            { this.state.isEditing
              ? <input type="text" className="form-control col-md-9"
                       name="full_name"
                       value={this.state.full_name}
                       onChange={this.handleChange.bind(this)}/>
              : this.props.user.full_name}
          </div>
          <div className="form-group row">
            <label className="col-md-3">DoB</label>
            { this.state.isEditing
              ? <input type="text" className="form-control col-md-9"
                       name="dob"
                       value={this.state.dob}
                       onChange={this.handleChange.bind(this)}/>
              : new Date(this.props.user.dob).toDateString()}
          </div>
          { this.state.error &&
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>}

          { this.state.isEditing
            ? <div>
              <button className="btn btn-primary" onClick={() => this.saveUserDetail()}>Save</button>
              <button className="btn btn-link" onClick={() => this.toggleEdit()}>Cancel</button>
            </div>
            : <button className="btn btn-primary" onClick={() => this.toggleEdit()}>Edit</button> }
        </div>
        }
      </div>
    )
  }
}