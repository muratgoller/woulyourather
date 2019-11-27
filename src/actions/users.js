import { _getUsers } from '../data/data'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return _getUsers()
    .then(function(users){dispatch(receiveUsers(users))})
    .then(() => dispatch(hideLoading()))
  }
}