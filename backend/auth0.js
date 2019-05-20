'use strict'

const axios = require('axios')
require('dotenv').config()

const getAccessToken = async () => {
  const { data } = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    grant_type: 'client_credentials'
  })
  return data.access_token
}

exports.getAccessToken = getAccessToken
