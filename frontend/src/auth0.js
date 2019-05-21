import auth0 from 'auth0-js'
import jwtDecode from 'jwt-decode'

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

export const getUserId = () => {
  const { sub } = jwtDecode(localStorage.getItem('accessToken'))
  return sub
}

export const parseHash = () =>
  webAuth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken) {
      localStorage.setItem('accessToken', authResult.accessToken)
    } else if (err) {
      console.error(err)
    }
  })
