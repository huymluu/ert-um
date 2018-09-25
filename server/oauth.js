'use strict'

const axios = require('axios')
const router = require('express').Router()
const config = require('config').server.oauth

router.get('/authorized', function (req, res) {

  if (!req.query.code) {
    if (req.query.error) {
      res.redirect('/oauth/error?code=' + encodeURIComponent(req.query.error))
    } else {
      res.redirect('/oauth/error?message=' + encodeURIComponent('OAuth server return empty code'))
    }
  } else {
    let postBody = 'grant_type=authorization_code&code=' + req.query.code +
      '&client_id=' + config.client_id +
      '&client_secret=' + config.client_secret +
      '&redirect_uri=' + encodeURIComponent(config.redirect_uri)

    axios.post(config.token_url, postBody)
      .then(response => {
        if (!response) throw new Error('Error when exchange code for token. Empty response')
        if (response.status !== 200) throw new Error('Error when exchange code for token. Status ' + response.status)
        if (!response.data) throw new Error('Error when exchange code for token. Empty body')

        let payload = response.data
        if (!payload || !payload.access_token) {
          throw new Error('Error when exchange code for token. Invalid body')
        }

        res.redirect('/oauth/token?token=' + payload.access_token)
      })
      .catch(e => {
        return res.send('Error when exchange code for token: ' + e.message)
      })
  }
})

router.get('/login', function (req, res) {

  let url = config.authorize_url + '?response_type=code' +
    '&client_id=' + config.client_id +
    '&redirect_uri=' + encodeURIComponent(config.redirect_uri)

  res.redirect(url)
})

module.exports = router