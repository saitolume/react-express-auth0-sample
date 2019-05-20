import React, { useContext } from 'react'
import { authorizeWithTwitter } from '../auth0'
import { RootContext } from '../context'

const Home = () => {
  const { state } = useContext(RootContext)
  const { isLoggedIn, name, picture } = state

  return (
    <div style={{ textAlign: 'center', marginTop: '5vh' }}>
      <button onClick={authorizeWithTwitter}>Login with Twitter</button>
      <p>Login : {String(isLoggedIn)}</p>
      <p>Name: {name}</p>
      <div>
        <img src={picture} height="200" alt="user" />
      </div>
    </div>
  )
}

export default Home
