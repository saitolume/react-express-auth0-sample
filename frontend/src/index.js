import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Provider, { setUser, RootContext } from './context'
import Callback from './components/Callback'
import Home from './components//Home'

const App = () => {
  const { dispatch } = useContext(RootContext)
  useEffect(() => {
    localStorage.getItem('accessToken') && setUser(dispatch)
  }, [dispatch])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/callback" component={Callback} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
