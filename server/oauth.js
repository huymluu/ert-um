'use strict'

const request = require('request')
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

    request.post({
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      url: config.token_url,
      body: postBody
    }, function (error, response, body) {
      if (!response) return res.send('Error when exchange code for token. Empty response')
      if (response.statusCode !== 200) return res.send('Error when exchange code for token. Status ' + response.statusCode)
      if (!body) return res.send('Error when exchange code for token. Empty body')

      try {
        let payload = JSON.parse(body)
        if (!payload || !payload.access_token) {
          return res.send('Error when exchange code for token. Invalid body')
        }

        res.redirect('/oauth/token?token=' + payload.access_token)
      } catch (e) {
        return res.send(e)
      }
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