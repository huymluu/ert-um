'use strict'

const request = require('request')
const router = require('express').Router()
const config = require('config').server.oauth

router.get('/authorized', function (req, res) {

  if (!req.query.code) {
    res.send('Error: no code')
  } else {
    let postBody = 'grant_type=authorization_code&code=' + req.query.code +
      '&client_id=' + config.client_id +
      '&client_secret=' + config.client_secret +
      '&redirect_uri=' + config.redirect_uri

    request.post({
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      url: config.token_url,
      body: postBody
    }, function (error, response, body) {
      console.log('error:', error)
      console.log('statusCode:', response && response.statusCode)
      console.log(body)
      let payload = JSON.parse(body);
      if (payload && payload.access_token) {
        res.redirect('http://localhost:8080/oauth/token?token=' + payload.access_token)
      } else {
        res.send('Error when exchange code for token')
      }
    })
  }
})

router.get('/login', function (req, res) {

  let url = config.authorize_url + '?response_type=code' +
    '&client_id=' + config.client_id +
    '&redirect_uri=' + config.redirect_uri

  res.redirect(url)
})

module.exports = router