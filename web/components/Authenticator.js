import axios from 'axios'

function logout () {
  axios.defaults.headers.common['Authorization'] = undefined
  window.sessionStorage.removeItem('token')
  window.sessionStorage.removeItem('me')
  // window.location.href = '/'
}

const Authenticator = {
  setToken: function (token) {
    if (token) {
      window.sessionStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
  },
  syncAuthenticationStatus: function (callback) {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }

    axios.get(API_URL + '/check_token')
      .then(function (response) {
        if (response.status === 200) {
          callback(true)
        } else {
          logout()
          callback(false)
        }
      })
      .catch(function (error) {
        logout()
        callback(false)
      })
  },
  logout: logout,
  isLoggedIn: function () {
    try {
      return !!window.sessionStorage.getItem('token')
    } catch (e) {
      console.error(e)
      return false
    }
  },
  fetchMe: function () {
    return axios.get(API_URL + '/me')
      .then(function (response) {
        if (response.status === 200) {
          window.sessionStorage.setItem('me', JSON.stringify(response.data))
          return response.data
        } else {
          logout()
          throw ('Error: ' + response.status)
        }
      })
      .catch(function (error) {
        logout()
        throw ('Error: ' + error)
      })
  },
  getAccount: function () {
    try {
      return JSON.parse(window.sessionStorage.getItem('me'))
    } catch (e) {
      console.error(e)
      return undefined
    }
  }
}

export default Authenticator