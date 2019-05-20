import React, { useEffect } from 'react'
import { parseHash } from '../auth0'

const Callback = ({ history }) => {
  useEffect(() => {
    parseHash()
    history.replace('/')
    window.location.reload()
  }, [history])
  return <div>loading...</div>
}

export default Callback
