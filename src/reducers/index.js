import { combineReducers } from 'redux'
import users from './users'
import authedUser from './authUser'
import questions from './questions'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    users,
    authedUser,
    questions,
    loadingBar: loadingBarReducer
  })