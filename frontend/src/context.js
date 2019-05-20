import React, { createContext, useReducer } from 'react'
import axios from './axios'
import { getUserId } from './auth0'

const initialState = {
  isLoggedIn: false,
  name: '',
  picture: ''
}

const SET_USER = 'SET_USER'

export const setUser = async dispatch => {
  try {
    const userId = await getUserId()
    const { data } = await await axios.get(`/api/users/${userId}`)
    dispatch({
      type: SET_USER,
      payload: {
        name: data.name,
        picture: data.picture
      }
    })
  } catch (err) {
    console.error(err)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        isLoggedIn: true,
        name: action.payload.name,
        picture: action.payload.picture
      }
    default:
      return state
  }
}

export const RootContext = createContext(null)

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <RootContext.Provider value={{ state, dispatch }}>{children}</RootContext.Provider>
}

export default Provider
