import auth0 from 'auth0-js'
import axios from './axios'

const webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: 'http://localhost:3000/callback',
  responseType: 'token',
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  scope: 'openid profile'
})

export const authorizeWithTwitter = async () => {
  webAuth.authorize({ connection: 'twitter' })
}

export const getUserId = async () => {
  try {
    const { data } = await axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`)
    return data.sub
  } catch (err) {
    console.error(err)
  }
}

export const parseHash = () =>
  webAuth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken) {
      localStorage.setItem('accessToken', authResult.accessToken)
    } else if (err) {
      console.error(err)
    }
  })
