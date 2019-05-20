'use strict'

const axios = require('axios')
const express = require('express')
const jwt = require('express-jwt')
const errors = require('http-errors')
const jwks = require('jwks-rsa')
const logger = require('morgan')
const wrap = require('./wrap')
const { getAccessToken } = require('./auth0')
require('dotenv').config()

const app = express()

app.use(logger('dev'))

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENC,
  algorithms: ['RS256']
})

const users = async req => {
  const { userId } = req.params
  const accessToken = await getAccessToken()
  const { data } = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return {
    name: data.name,
    picture: data.picture.replace('_normal', '')
  }
}

app.get('/users/:userId', authCheck, wrap(users))

app.use((req, res, next) => {
  next(new errors.NotFound())
})

app.use((err, req, res) => {
  const code = err.statusCode || 500
  res.status(code).json({
    code: code,
    error: err.message
  })
})

app.listen(8080)
